

import express from "express";
import {
  sendVerificationOTP,
  verifyAdminOTP,
  registerAdmin,
  loginAdmin,
  verifyAdminLoginOTP,
  resendAdminOTP,
  // New Forgot Password Controllers
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/adminController.js";

const router = express.Router();

// --- Registration Routes ---
router.post("/send-otp", sendVerificationOTP);   // Step 1: Send OTP to email
router.post("/verify-otp", verifyAdminOTP);      // Step 2: Verify OTP
router.post("/register", registerAdmin);         // Step 3: Finalize account

// --- Login Routes ---
router.post("/login", loginAdmin);                // Step 1: Check password & send 2FA
router.post("/verify-login-otp", verifyAdminLoginOTP); // Step 2: Verify 2FA and get token

// --- Forgot Password Routes ---
router.post("/forgot-password", forgotPassword);     // Step 1: Request reset OTP
router.post("/verify-reset-otp", verifyResetOTP);    // Step 2: Verify reset OTP
router.post("/reset-password", resetPassword);       // Step 3: Update new password

// --- Utility Routes ---
router.post("/resend-otp", resendAdminOTP);

export default router;