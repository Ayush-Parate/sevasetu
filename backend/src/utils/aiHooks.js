async function classifyNeed(input) {
  return {
    label: "UNCLASSIFIED",
    confidence: 0,
    metadata: { placeholder: true, inputPreview: JSON.stringify(input).slice(0, 120) }
  };
}

async function scoreVolunteerMatch(_need, _volunteer) {
  return { score: 0, reason: "AI scoring hook not integrated yet" };
}

async function refineVolunteerScoreWithML(baseScore, _features) {
  return baseScore;
}

module.exports = { classifyNeed, scoreVolunteerMatch, refineVolunteerScoreWithML };
