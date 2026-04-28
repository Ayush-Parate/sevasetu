const express = require("express");
const { upload } = require("../../middlewares/upload.middleware");
const { uploadAndProcess, listFiles, processTextInput, processVoiceInput } = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.get(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  listFiles
);
router.post(
  "/upload",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VOLUNTEER]),
  upload.single("file"),
  uploadAndProcess
);
router.post(
  "/input/text",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VOLUNTEER]),
  processTextInput
);
router.post(
  "/input/voice",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VOLUNTEER]),
  upload.single("voice"),
  processVoiceInput
);

module.exports = router;
