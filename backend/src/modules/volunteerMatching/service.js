const { Op } = require("sequelize");
const { Match } = require("./models");
const { Task } = require("../taskManagement/models");
const { Need } = require("../needIntelligence/models");
const { User } = require("../userRole/models");
const { ROLES } = require("../../constants/roles");
const { scoreVolunteerMatch, refineVolunteerScoreWithML } = require("../../utils/aiHooks");

const MATCH_WEIGHTS = {
  distance: 0.30,
  skillMatch: 0.25,
  availability: 0.15,
  trust: 0.10,
  experience: 0.10,
  urgency: 0.10
};

const MAX_DISTANCE_KM = 50;

async function createMatch(payload) {
  const ai = await scoreVolunteerMatch(payload.needId, payload.volunteerId);
  return Match.create({ ...payload, score: ai.score });
}

async function listMatches() {
  return Match.findAll();
}

function toLowerSafeArray(values = []) {
  return values.map((value) => String(value).toLowerCase().trim());
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDistanceScore(taskLocation, volunteerLocation) {
  if (!taskLocation || !volunteerLocation) {
    return { distanceKm: null, normalized: 0.5 };
  }

  const distanceKm = haversineKm(
    taskLocation.lat,
    taskLocation.lng,
    volunteerLocation.lat,
    volunteerLocation.lng
  );
  const normalized = Math.max(0, 1 - Math.min(distanceKm / MAX_DISTANCE_KM, 1));
  return { distanceKm, normalized };
}

function getSkillMatchScore(requiredSkills = [], volunteerSkills = []) {
  const required = toLowerSafeArray(requiredSkills);
  const skills = toLowerSafeArray(volunteerSkills);

  if (!required.length) {
    return 1;
  }

  let exactMatches = 0;
  let partialMatches = 0;

  required.forEach((reqSkill) => {
    if (skills.includes(reqSkill)) {
      exactMatches += 1;
      return;
    }
    const hasPartial = skills.some(
      (skill) => skill.includes(reqSkill) || reqSkill.includes(skill)
    );
    if (hasPartial) {
      partialMatches += 1;
    }
  });

  const exactRatio = exactMatches / required.length;
  const partialRatio = partialMatches / required.length;
  return Math.min(1, exactRatio + partialRatio * 0.5);
}

function getAvailabilityScore(status = "unavailable") {
  const normalized = String(status).toLowerCase();
  if (normalized === "available") return 1;
  if (normalized === "busy") return 0.4;
  return 0;
}

function getLanguageScore(requiredLanguage, volunteerLanguages = []) {
  if (!requiredLanguage) {
    return 1;
  }
  const lang = requiredLanguage.toLowerCase();
  const languages = toLowerSafeArray(volunteerLanguages);
  return languages.includes(lang) ? 1 : 0;
}

function getUrgencyScore(task, need) {
  if (typeof task.urgencyOverride === "number") {
    return Math.max(0, Math.min(task.urgencyOverride / 100, 1));
  }
  if (typeof need?.urgencyScore === "number") {
    return Math.max(0, Math.min(need.urgencyScore / 100, 1));
  }
  return 0.5;
}

async function getExperienceScore(volunteerId) {
  const total = await Task.count({ where: { assignedTo: volunteerId } });
  if (!total) {
    return 0.5;
  }
  const completed = await Task.count({
    where: { assignedTo: volunteerId, status: { [Op.iLike]: "completed" } }
  });
  return completed / total;
}

async function matchVolunteersForTask(taskId) {
  const task = await Task.findByPk(taskId);
  if (!task) {
    throw { statusCode: 404, message: "Task not found" };
  }

  const need = task.needId ? await Need.findByPk(task.needId) : null;

  const volunteers = await User.findAll({
    where: {
      role: ROLES.VOLUNTEER,
      isActive: true
    }
  });

  if (!volunteers.length) {
    return [];
  }

  const taskLocation = {
    lat: task.locationLat ?? need?.locationLat,
    lng: task.locationLng ?? need?.locationLng
  };

  const urgencyScore = getUrgencyScore(task, need);
  const requiredSkills = task.requiredSkills || [];
  const requiredLanguage = task.requiredLanguage || null;

  const scored = [];
  for (const volunteer of volunteers) {
    const volunteerLocation =
      volunteer.locationLat != null && volunteer.locationLng != null
        ? { lat: volunteer.locationLat, lng: volunteer.locationLng }
        : null;

    const distance = getDistanceScore(taskLocation, volunteerLocation);
    const skillMatch = getSkillMatchScore(requiredSkills, volunteer.skills || []);
    const availability = getAvailabilityScore(volunteer.availabilityStatus);
    const trust = Math.max(0, Math.min((volunteer.trustScore || 0) / 100, 1));
    const experience = await getExperienceScore(volunteer.id);
    const language = getLanguageScore(requiredLanguage, volunteer.languages || []);

    const baseScore =
      distance.normalized * MATCH_WEIGHTS.distance +
      skillMatch * MATCH_WEIGHTS.skillMatch +
      availability * MATCH_WEIGHTS.availability +
      trust * MATCH_WEIGHTS.trust +
      experience * MATCH_WEIGHTS.experience +
      urgencyScore * MATCH_WEIGHTS.urgency;

    const languageAdjustedScore = Math.max(0, Math.min(baseScore * (0.9 + 0.1 * language), 1));
    const finalScore = await refineVolunteerScoreWithML(languageAdjustedScore, {
      taskId: task.id,
      volunteerId: volunteer.id,
      distanceKm: distance.distanceKm,
      skillMatch,
      availability,
      trust,
      experience,
      urgencyScore,
      language
    });

    const scorePercent = Number((Math.max(0, Math.min(finalScore, 1)) * 100).toFixed(2));
    const scoreBreakdown = {
      distanceKm: distance.distanceKm,
      distanceScore: Number((distance.normalized * 100).toFixed(2)),
      skillMatchScore: Number((skillMatch * 100).toFixed(2)),
      availabilityScore: Number((availability * 100).toFixed(2)),
      trustScore: Number((trust * 100).toFixed(2)),
      experienceScore: Number((experience * 100).toFixed(2)),
      urgencyScore: Number((urgencyScore * 100).toFixed(2)),
      languageCompatibility: Number((language * 100).toFixed(2)),
      weights: MATCH_WEIGHTS
    };

    scored.push({
      volunteerId: volunteer.id,
      volunteerName: volunteer.fullName,
      score: scorePercent,
      breakdown: scoreBreakdown
    });
  }

  scored.sort((a, b) => b.score - a.score);
  const topFive = scored.slice(0, 5);

  await Promise.all(
    topFive.map((entry) =>
      Match.create({
        needId: task.needId || null,
        taskId: task.id,
        volunteerId: entry.volunteerId,
        score: entry.score,
        scoreBreakdown: entry.breakdown,
        status: "RANKED"
      })
    )
  );

  return topFive;
}

module.exports = { createMatch, listMatches, matchVolunteersForTask, MATCH_WEIGHTS };
