const Joi = require("joi");

const objectIdSchema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

const createTaskSchema = Joi.object({
  needId: objectIdSchema.allow(null, ""),
  title: Joi.string().min(3).max(160).required(),
  description: Joi.string().allow("", null),
  assignedTo: objectIdSchema.allow(null, ""),
  requiredSkills: Joi.array().items(Joi.string().trim().min(1)).default([]),
  requiredLanguage: Joi.string().allow("", null),
  locationLat: Joi.number().min(-90).max(90).allow(null),
  locationLng: Joi.number().min(-180).max(180).allow(null),
  urgencyOverride: Joi.number().min(0).max(100).allow(null),
  dueDate: Joi.date().iso().allow(null),
  volunteerRequirement: Joi.number().integer().min(1).default(1),
  proofRequired: Joi.array().items(Joi.string().trim().min(1)).default([]),
  status: Joi.string().default("OPEN")
});

const assignTaskSchema = Joi.object({
  volunteerId: objectIdSchema.required()
});

const updateTaskStatusSchema = Joi.object({
  status: Joi.string()
    .valid("OPEN", "ASSIGNED", "ACCEPTED", "ON_WAY", "IN_PROGRESS", "COMPLETED", "VERIFIED", "BLOCKED")
    .required()
});

module.exports = { createTaskSchema, assignTaskSchema, updateTaskStatusSchema };
