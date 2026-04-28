const Joi = require("joi");

const createPublicIntakeSchema = Joi.object({
  requestType: Joi.string()
    .valid("DEMO_REQUEST", "NGO_REGISTRATION", "VOLUNTEER_INTEREST", "DONOR_INTEREST", "ACCOUNT_REQUEST")
    .required(),
  fullName: Joi.string().min(2).max(120).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().allow("", null),
  organizationName: Joi.string().max(160).allow("", null),
  roleRequested: Joi.string().max(80).allow("", null),
  message: Joi.string().max(2000).allow("", null),
  source: Joi.string().max(80).default("web"),
  metadata: Joi.object().unknown(true).default({})
});

const listPublicIntakesQuerySchema = Joi.object({
  status: Joi.string().valid("NEW", "IN_REVIEW", "APPROVED", "REJECTED").optional(),
  requestType: Joi.string()
    .valid("DEMO_REQUEST", "NGO_REGISTRATION", "VOLUNTEER_INTEREST", "DONOR_INTEREST", "ACCOUNT_REQUEST")
    .optional()
});

const updatePublicIntakeSchema = Joi.object({
  status: Joi.string().valid("NEW", "IN_REVIEW", "REJECTED", "APPROVED").required(),
  reviewNotes: Joi.string().max(2000).allow("", null)
});

const approvePublicIntakeSchema = Joi.object({
  fullName: Joi.string().min(2).max(120).optional(),
  phone: Joi.string().allow("", null),
  role: Joi.string().required(),
  tempPassword: Joi.string().min(8).required(),
  reviewNotes: Joi.string().max(2000).allow("", null)
});

module.exports = {
  createPublicIntakeSchema,
  listPublicIntakesQuerySchema,
  updatePublicIntakeSchema,
  approvePublicIntakeSchema
};
