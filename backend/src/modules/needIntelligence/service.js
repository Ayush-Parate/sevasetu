const { Need } = require("./models");
const { classifyNeed } = require("../../utils/aiHooks");

async function createNeed(payload) {
  const classification = await classifyNeed(payload);
  const need = await Need.create({
    ...payload,
    aiLabel: classification.label,
    priorityScore: classification.confidence
  });
  return need.toJSON();
}

async function listNeeds() {
  return Need.find({}).sort({ createdAt: -1 }).lean();
}

module.exports = { createNeed, listNeeds };
