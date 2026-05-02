const express = require("express");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth");
const { ROLES } = require("../../constants/roles");
const controller = require("./controller");

const router = express.Router();

// All NGO routes require authentication and NGO_ADMIN role
router.use(authenticate, attachUser, authorize([ROLES.NGO_ADMIN, ROLES.SUPER_ADMIN]));

router.get("/stats", controller.getNGOStats);
router.get("/volunteers", controller.listVolunteers);
router.get("/field-coordinators", controller.listFieldCoordinators);

module.exports = router;
