const bcrypt = require("bcryptjs");
const { PublicIntake } = require("./models");
const { User } = require("../userRole/models");
const { ROLES } = require("../../constants/roles");

const MANAGEABLE_STATUSES = ["NEW", "IN_REVIEW", "APPROVED", "REJECTED"];

function toRole(value) {
  if (!value) return ROLES.VOLUNTEER;
  const normalized = String(value).trim().toLowerCase();
  const matched = Object.values(ROLES).find((role) => role.toLowerCase() === normalized);
  return matched || ROLES.VOLUNTEER;
}

function sanitizeRecord(record) {
  const data = record.toJSON();
  return {
    ...data,
    tempPassword: undefined
  };
}

async function createPublicIntake(payload) {
  const record = await PublicIntake.create(payload);
  return record.toJSON();
}

async function listPublicIntakes(filters = {}) {
  const where = {};
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.requestType) {
    where.requestType = filters.requestType;
  }

  return PublicIntake.find(where)
    .populate("reviewedBy", "fullName email role")
    .populate("approvedUserId", "fullName email role")
    .sort({ createdAt: -1 })
    .lean()
    .then((records) =>
      records.map((record) => ({
        ...record,
        id: String(record._id),
        reviewer: record.reviewedBy
          ? {
              id: String(record.reviewedBy._id),
              fullName: record.reviewedBy.fullName,
              email: record.reviewedBy.email,
              role: record.reviewedBy.role
            }
          : null,
        approvedUser: record.approvedUserId
          ? {
              id: String(record.approvedUserId._id),
              fullName: record.approvedUserId.fullName,
              email: record.approvedUserId.email,
              role: record.approvedUserId.role
            }
          : null
      }))
    );
}

async function updatePublicIntakeStatus(id, { status, reviewNotes }, reviewerId) {
  if (!MANAGEABLE_STATUSES.includes(status)) {
    throw { statusCode: 400, message: "Invalid request status" };
  }

  const request = await PublicIntake.findById(id);
  if (!request) {
    throw { statusCode: 404, message: "Request not found" };
  }

  if (status === "APPROVED" && !request.approvedUserId) {
    throw { statusCode: 400, message: "Use approve flow to approve a request" };
  }

  request.status = status;
  request.reviewNotes = reviewNotes || null;
  request.reviewedAt = new Date();
  request.reviewedBy = reviewerId;
  await request.save();

  const updated = await PublicIntake.findById(id)
    .populate("reviewedBy", "fullName email role")
    .populate("approvedUserId", "fullName email role");
  return sanitizeRecord({
    toJSON: () => ({
      ...updated.toJSON(),
      reviewer: updated.reviewedBy
        ? {
            id: updated.reviewedBy.id,
            fullName: updated.reviewedBy.fullName,
            email: updated.reviewedBy.email,
            role: updated.reviewedBy.role
          }
        : null,
      approvedUser: updated.approvedUserId
        ? {
            id: updated.approvedUserId.id,
            fullName: updated.approvedUserId.fullName,
            email: updated.approvedUserId.email,
            role: updated.approvedUserId.role
          }
        : null
    })
  });
}

async function approvePublicIntake(id, payload, reviewer) {
  const request = await PublicIntake.findById(id);
  if (!request) {
    throw { statusCode: 404, message: "Request not found" };
  }
  if (request.status === "APPROVED" && request.approvedUserId) {
    throw { statusCode: 409, message: "Request already approved" };
  }

  const existing = await User.findOne({ email: request.email.toLowerCase() });
  if (existing) {
    throw { statusCode: 409, message: "A user with this email already exists" };
  }

  const role = toRole(payload.role || request.roleRequested);
  const passwordHash = await bcrypt.hash(payload.tempPassword, 10);
  const user = await User.create({
    fullName: payload.fullName || request.fullName,
    email: request.email,
    phone: payload.phone || request.phone,
    role,
    passwordHash,
    isActive: true
  });

  request.status = "APPROVED";
  request.reviewedAt = new Date();
  request.reviewedBy = reviewer.id;
  request.reviewNotes = payload.reviewNotes || null;
  request.approvedUserId = user.id;
  request.metadata = {
    ...(request.metadata || {}),
    approvedRole: role,
    tempPasswordIssuedAt: new Date().toISOString(),
    approvedFromRequestType: request.requestType
  };
  await request.save();

  const updatedRequest = await PublicIntake.findById(id)
    .populate("reviewedBy", "fullName email role")
    .populate("approvedUserId", "fullName email role");

  return {
    request: sanitizeRecord({
      toJSON: () => ({
        ...updatedRequest.toJSON(),
        reviewer: updatedRequest.reviewedBy
          ? {
              id: updatedRequest.reviewedBy.id,
              fullName: updatedRequest.reviewedBy.fullName,
              email: updatedRequest.reviewedBy.email,
              role: updatedRequest.reviewedBy.role
            }
          : null,
        approvedUser: updatedRequest.approvedUserId
          ? {
              id: updatedRequest.approvedUserId.id,
              fullName: updatedRequest.approvedUserId.fullName,
              email: updatedRequest.approvedUserId.email,
              role: updatedRequest.approvedUserId.role
            }
          : null
      })
    }),
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    tempPassword: payload.tempPassword
  };
}

module.exports = {
  createPublicIntake,
  listPublicIntakes,
  updatePublicIntakeStatus,
  approvePublicIntake
};
