const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  userUpdateSubscription,
} = require("../../controller");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), register);

// // signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, userUpdateSubscription);

module.exports = router;
