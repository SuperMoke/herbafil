const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

// Account creation routes
router.post("/create-account", authController.createAccount);
router.post("/check-username", authController.checkUsername);

// OTP routes
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);

// User profile routes
router.get("/user", authController.getUserById);

module.exports = router;
