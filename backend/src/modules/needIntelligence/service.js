const { Need } = require("./models");
const { classifyNeed } = require("../../utils/aiHooks");

async function createNeed(payload) {
  const classification = await classifyNeed(payload);
  return Need.create({
    ...payload,
    aiLabel: classification.label,
    priorityScore: classification.confidence
  });
}

async function listNeeds() {
  return Need.findAll();
}

module.exports = { createNeed, listNeeds };
