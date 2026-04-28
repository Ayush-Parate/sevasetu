require("dotenv").config();

const bcrypt = require("bcryptjs");
const { connectToDatabase, disconnectFromDatabase } = require("./config/database");
const logger = require("./config/logger");
const { initModels } = require("./config/initModels");
const { ROLES } = require("./constants/roles");

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

async function seed() {
  await connectToDatabase();
  const models = initModels();
  const force = String(process.env.SEED_FORCE || "false").toLowerCase() === "true";
  if (force) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Need.deleteMany({}),
      models.Task.deleteMany({}),
      models.GeoPoint.deleteMany({}),
      models.Match.deleteMany({}),
      models.ImpactMetric.deleteMany({}),
      models.ProcessedFile.deleteMany({}),
      models.PublicIntake.deleteMany({})
    ]);
  }

  const passwordHash = await bcrypt.hash(process.env.SEED_DEFAULT_PASSWORD || "Password@123", 10);

  const [superAdmin, ngoAdmin, coordinator, verifier, volunteerA, volunteerB] = await Promise.all([
    models.User.create({
      fullName: "Super Admin",
      email: "superadmin@janconnect.local",
      passwordHash,
      role: ROLES.SUPER_ADMIN,
      phone: "9999999999",
      skills: ["ops", "management"],
      languages: ["english", "hindi"],
      availabilityStatus: "available",
      trustScore: 95,
      isActive: true
    }),
    models.User.create({
      fullName: "NGO Admin",
      email: "ngoadmin@janconnect.local",
      passwordHash,
      role: ROLES.NGO_ADMIN,
      phone: "8888888888",
      skills: ["coordination", "planning"],
      languages: ["english", "hindi"],
      availabilityStatus: "available",
      trustScore: 85,
      isActive: true
    }),
    models.User.create({
      fullName: "Field Coordinator",
      email: "coordinator@janconnect.local",
      passwordHash,
      role: ROLES.FIELD_COORDINATOR,
      skills: ["field", "logistics", "first aid"],
      languages: ["hindi", "marathi"],
      availabilityStatus: "available",
      trustScore: 80,
      isActive: true,
      locationLat: 19.076,
      locationLng: 72.8777
    }),
    models.User.create({
      fullName: "Verifier",
      email: "verifier@janconnect.local",
      passwordHash,
      role: ROLES.VERIFIER,
      skills: ["validation", "audit"],
      languages: ["english", "hindi"],
      availabilityStatus: "busy",
      trustScore: 90,
      isActive: true
    }),
    models.User.create({
      fullName: "Volunteer A",
      email: "volunteer.a@janconnect.local",
      passwordHash,
      role: ROLES.VOLUNTEER,
      skills: ["first aid", "distribution", "driving"],
      languages: ["hindi"],
      availabilityStatus: "available",
      trustScore: 70,
      isActive: true,
      locationLat: 19.08,
      locationLng: 72.88
    }),
    models.User.create({
      fullName: "Volunteer B",
      email: "volunteer.b@janconnect.local",
      passwordHash,
      role: ROLES.VOLUNTEER,
      skills: ["cooking", "shelter setup"],
      languages: ["hindi", "english"],
      availabilityStatus: "available",
      trustScore: 60,
      isActive: true,
      locationLat: 19.03,
      locationLng: 72.85
    })
  ]);

  const needs = await Promise.all(
    [
      {
        title: "Food packet distribution",
        description: "Distribute food packets near the station",
        location: "Mumbai - Dadar",
        locationLat: 19.0176,
        locationLng: 72.8562,
        urgencyScore: 82
      },
      {
        title: "Temporary shelter setup",
        description: "Setup shelter tents for families",
        location: "Mumbai - Sion",
        locationLat: 19.043,
        locationLng: 72.8647,
        urgencyScore: 67
      },
      {
        title: "Medical kit delivery",
        description: "Deliver basic first-aid kits to affected area",
        location: "Mumbai - Andheri",
        locationLat: 19.1197,
        locationLng: 72.8464,
        urgencyScore: 74
      }
    ].map((payload) => models.Need.create(payload))
  );

  const tasks = await Promise.all([
    models.Task.create({
      needId: needs[0].id,
      title: "Distribute 100 food packets",
      description: "Coordinate pickup and distribute to identified families",
      assignedTo: volunteerA.id,
      requiredSkills: ["distribution"],
      requiredLanguage: "hindi",
      locationLat: needs[0].locationLat,
      locationLng: needs[0].locationLng,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      firstResponseAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "OPEN"
    }),
    models.Task.create({
      needId: needs[1].id,
      title: "Setup shelter tents",
      description: "Setup 10 tents and coordinate supplies",
      assignedTo: volunteerB.id,
      requiredSkills: ["shelter setup"],
      requiredLanguage: "hindi",
      locationLat: needs[1].locationLat,
      locationLng: needs[1].locationLng,
      dueDate: new Date(Date.now() + 36 * 60 * 60 * 1000),
      status: "OPEN"
    }),
    models.Task.create({
      needId: needs[2].id,
      title: "Deliver medical kits",
      description: "Deliver 50 first-aid kits, report completion",
      assignedTo: volunteerA.id,
      requiredSkills: ["first aid", "driving"],
      requiredLanguage: "hindi",
      locationLat: needs[2].locationLat,
      locationLng: needs[2].locationLng,
      dueDate: new Date(Date.now() + 18 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: "COMPLETED"
    })
  ]);

  // Some geo points (independent from clustered needs, but useful for the module)
  await Promise.all(
    new Array(30).fill(0).map((_v, idx) =>
      models.GeoPoint.create({
        latitude: 19.0 + randBetween(0.0, 0.15),
        longitude: 72.8 + randBetween(0.0, 0.15),
        intensity: randBetween(0.2, 1.0),
        category: idx % 2 === 0 ? "NEED" : "TASK"
      })
    )
  );

  // A couple of ranked matches for the completed task
  await Promise.all([
    models.Match.create({
      needId: tasks[2].needId,
      taskId: tasks[2].id,
      volunteerId: volunteerA.id,
      score: 92,
      scoreBreakdown: { seeded: true },
      status: "RANKED"
    }),
    models.Match.create({
      needId: tasks[2].needId,
      taskId: tasks[2].id,
      volunteerId: volunteerB.id,
      score: 74,
      scoreBreakdown: { seeded: true },
      status: "RANKED"
    })
  ]);

  // Impact metrics to power analytics
  await Promise.all([
    models.ImpactMetric.create({
      taskId: tasks[2].id,
      volunteerId: volunteerA.id,
      location: needs[2].location,
      peopleHelped: 35,
      timeTakenMinutes: 80,
      impactScore: 88,
      areaImprovement: 0.42,
      periodLabel: "This week"
    }),
    models.ImpactMetric.create({
      taskId: tasks[0].id,
      volunteerId: volunteerA.id,
      location: needs[0].location,
      peopleHelped: 60,
      timeTakenMinutes: 120,
      impactScore: 74,
      areaImprovement: 0.33,
      periodLabel: "This week"
    })
  ]);

  // Processed file sample (no actual upload needed)
  await models.ProcessedFile.create({
    originalName: "sample-report.txt",
    storedPath: "uploads/sample-report.txt",
    mimeType: "text/plain",
    extractedText: "Sample extracted text from seeded file record.",
    ocrConfidence: 0
  });

  logger.info("Seed completed", {
    users: 6,
    needs: needs.length,
    tasks: tasks.length
  });
}

seed()
  .then(async () => {
    await disconnectFromDatabase();
    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    disconnectFromDatabase().finally(() => process.exit(1));
  });

