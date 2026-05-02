const express = require("express");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth");
const { ROLES } = require("../../constants/roles");
const controller = require("./controller");

const router = express.Router();

router.use(authenticate, attachUser, authorize([ROLES.VOLUNTEER, ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]));

router.get("/stats", controller.getVolunteerStats);

module.exports = router;
