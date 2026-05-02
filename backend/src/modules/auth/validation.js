const Joi = require("joi");
const { ROLES } = require("../../constants/roles");

/** Only Volunteer + Donor may self-register; other roles use admin creation or public intake approval. */
const SELF_SIGNUP_ROLES = [ROLES.VOLUNTEER, ROLES.DONOR];

const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(120).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid(...SELF_SIGNUP_ROLES)
    .optional(),
  phone: Joi.string().allow("", null)
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required()
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  token: Joi.string().min(16).required(),
  password: Joi.string().min(8).required()
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  token: Joi.string().min(16).required()
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

module.exports = {
  registerSchema,
  adminRegisterSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema
};
