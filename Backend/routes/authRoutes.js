const express = require("express");
const {
  signup,
  login,
  refreshToken,
  getUserById,
} = require("../controllers/authController");
const {
  validateSignup,
  validateLogin,
} = require("../middlewares/validateMiddleware");
const bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");
const sendOtpMail = require("../config/emailService");
const { generateOTP, otpExpiryTime } = require("../utils/otpUtil");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.get("/user/:id", getUserById);

// Step 1: Send OTP to Email
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await Customer.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = otpExpiryTime();
  await user.save();

  await sendOtpMail(email, otp);

  res.json({ message: "OTP sent successfully" });
});

//Step 2: Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await Customer.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified, proceed to reset password" });
});

// Step 3: Reset Password
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await Customer.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

module.exports = router;
