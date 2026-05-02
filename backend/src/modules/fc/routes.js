const express = require("express");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth");
const { ROLES } = require("../../constants/roles");
const controller = require("./controller");

const router = express.Router();

// Allow FIELD_COORDINATOR and SUPER_ADMIN
router.use(authenticate, attachUser, authorize([ROLES.FIELD_COORDINATOR, ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]));

router.get("/stats", controller.getFCStats);
router.get("/volunteers", controller.listVolunteers);

module.exports = router;
