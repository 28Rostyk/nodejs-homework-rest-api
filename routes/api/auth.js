const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  userUpdateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controller");

const { validateBody } = require("../../utils");

const { authenticate, upload, resizeFile } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), register);
router.get("/verify/:verificationCode", verify);
router.post(
  "/resend-verify-email",
  validateBody(schemas.emailSchema),
  resendVerifyEmail
);

// // signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, userUpdateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeFile,
  updateAvatar
);

module.exports = router;
