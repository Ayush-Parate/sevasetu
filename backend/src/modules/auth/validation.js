const Joi = require("joi");
const { ROLES } = require("../../constants/roles");

const PUBLIC_SIGNUP_ROLES = [
  ROLES.NGO_ADMIN,
  ROLES.FIELD_COORDINATOR,
  ROLES.VOLUNTEER,
  ROLES.VERIFIER,
  ROLES.DONOR
];

const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(120).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid(...PUBLIC_SIGNUP_ROLES)
    .optional(),
  phone: Joi.string().allow("", null)
});

// Admin-only user creation (allows role assignment)
const adminRegisterSchema = Joi.object({
  fullName: Joi.string().min(2).max(120).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required(),
  phone: Joi.string().allow("", null)
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required()
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().min(20).optional()
});

module.exports = { registerSchema, adminRegisterSchema, loginSchema, refreshSchema };
