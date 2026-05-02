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

async function updateNeedStatus(id, status) {
  const need = await Need.findByIdAndUpdate(id, { status }, { new: true });
  if (!need) throw new Error("Need not found");
  return need.toJSON();
}

module.exports = { createNeed, listNeeds, updateNeedStatus };
