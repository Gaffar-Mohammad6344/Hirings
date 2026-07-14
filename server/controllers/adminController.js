import Admin from "../models/Admin.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// Helper to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
export const sendVerificationOTP = async (req, res) => {
  try {
    const { email, type, personalEmail } = req.body;
    
    // 1. Validation
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });
    if (type === 'company' && !personalEmail) return res.status(400).json({ success: false, message: "Personal email anchor required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expire = Date.now() + 600000; // 10 minutes

    
    const updateData = type === 'personal' 
      ? { otpPersonal: otp, otpPersonalExpire: expire } 
      : { otpCompany: otp, otpCompanyExpire: expire };

    // 2. Database Update (Search by Personal Email always)
    // If it's the personal verification, email IS the personalEmail
    const searchEmail = type === 'personal' ? email : personalEmail;

    await Admin.findOneAndUpdate(
      { personalEmail: searchEmail },
      { $set: updateData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 3. Send Mail
    await sendEmail({
      email: email,
      subject: `Hirings Portal: ${type.toUpperCase()} Verification Code`,
      html: `
        <div style="font-family: Arial; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #071952;">Verification Code</h2>
          <p>Your OTP for <b>${type}</b> verification is:</p>
          <h1 style="color: #0B57D0; letter-spacing: 5px;">${otp}</h1>
          <p>Valid for 10 minutes.</p>
        </div>
      `
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("DEBUG send-otp error:", error);

    // If it's a MongoDB Duplicate Key Error (11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Database Index Error: Please drop the old 'email' index in MongoDB Compass." 
      });
    }

    // If it's a Nodemailer/Auth error
    if (error.responseCode || error.code === 'EAUTH') {
        return res.status(500).json({ 
            success: false, 
            message: "Mail server failed. Check your App Password in .env" 
        });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};
// 2. Verify OTP
/**
 * 2. VERIFY OTP (Bypass validation to prevent 500 error)
 */
export const verifyAdminOTP = async (req, res) => {
  try {
    const { otp, type, personalEmail } = req.body;

    // 1. Find admin and include hidden OTP fields
    const admin = await Admin.findOne({ personalEmail }).select(
      "+otpPersonal +otpPersonalExpire +otpCompany +otpCompanyExpire"
    );

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin record not found." });
    }

    // 2. Check which OTP to compare
    const storedOtp = type === "personal" ? admin.otpPersonal : admin.otpCompany;
    const storedExpire = type === "personal" ? admin.otpPersonalExpire : admin.otpCompanyExpire;

    // 3. Validate OTP and Expiry
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP code." });
    }

    if (storedExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP has expired." });
    }

    // 4. Update verification status using findByIdAndUpdate 
    // This bypasses the "required" field validation for name/password/phone
    const updateField = type === "personal" 
      ? { isPersonalVerified: true, otpPersonal: null } 
      : { isCompanyVerified: true, otpCompany: null };

    await Admin.findByIdAndUpdate(admin._id, { $set: updateField });

    res.status(200).json({ success: true, message: `${type} email verified successfully!` });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: "Internal server error during verification." });
  }
};

// 3. Register
/**
 * 3. FINAL REGISTER (Corrected for Dual-Email)
 */
export const registerAdmin = async (req, res) => {
  try {
    const { fullName, personalEmail, companyEmail, password, phone } = req.body;

    // 1. Find the anchor record
    const admin = await Admin.findOne({ personalEmail });
    if (!admin) return res.status(400).json({ success: false, message: "Verification session expired. Please verify again." });

    // 2. Check if this phone belongs to another account
    const phoneExists = await Admin.findOne({ phone, personalEmail: { $ne: personalEmail } });
    if (phoneExists) return res.status(400).json({ success: false, message: "Phone number already registered to another admin." });

    // 3. Update data
    admin.name = fullName;
    admin.companyEmail = companyEmail;
    admin.password = password;
    admin.phone = phone;
    admin.isActive = true;

    await admin.save();

    res.status(201).json({ success: true, message: "Registration Successful!" });
  } catch (error) {
    console.error("REG_ERROR:", error);
    // If MongoDB throws a duplicate error (11000)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Duplicate Data: Email or Phone already exists." });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body; // 'email' from frontend is treated as personalEmail

    // Find admin by personalEmail
    const admin = await Admin.findOne({ personalEmail: email }).select("+password");

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Updated Check: Must be dual-verified to login
    if (!admin.isPersonalVerified || !admin.isCompanyVerified) {
      return res.status(401).json({ success: false, message: "Account emails not fully verified" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ success: false, message: "Account is inactive" });
    }

    const otp = generateOTP();
    // Save to otpPersonal fields for login 2FA
    admin.otpPersonal = otp;
    admin.otpPersonalExpire = Date.now() + 10 * 60 * 1000;
    await admin.save({ validateBeforeSave: false });

    await sendEmail({
      email: admin.personalEmail,
      subject: "Your Login OTP",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #071952;">Login Security Code</h2>
          <p>Please use the following 6-digit code to complete your login:</p>
          <h1 style="color: #0B57D0; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
          <p style="font-size: 12px; color: #94a3b8;">If you did not attempt to login, please ignore this email.</p>
        </div>
      `
    });

    return res.status(200).json({ success: true, requiresOTP: true, message: "Security OTP sent to your registered personal email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 5. LOGIN STEP 2: Verify Login 2FA OTP, Calculate Rank & Issue Token
 */
export const verifyAdminLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Check personalEmail and include OTP fields
    const admin = await Admin.findOne({ personalEmail: email }).select("+otpPersonal +otpPersonalExpire");

    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });
    
    if (!admin.otpPersonal || admin.otpPersonal !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    if (admin.otpPersonalExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    admin.otpPersonal = undefined;
    admin.otpPersonalExpire = undefined;
    admin.lastLoginAt = new Date();
    await admin.save({ validateBeforeSave: false });

    const adminRank = await Admin.countDocuments({ 
        createdAt: { $lte: admin.createdAt } 
    });

    const token = jwt.sign(
        { id: admin._id, role: "admin" }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    );

    res.status(200).json({ 
        success: true, 
        message: "Login successful", 
        data: { 
            token, 
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.personalEmail,
                adminIndex: adminRank
            } 
        } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 6. RESEND OTP (Login Context)
 */
export const resendAdminOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ personalEmail: email });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const otp = generateOTP();
    admin.otpPersonal = otp;
    admin.otpPersonalExpire = Date.now() + 10 * 60 * 1000;
    await admin.save({ validateBeforeSave: false });

    await sendEmail({
      email: admin.personalEmail,
      subject: "Resend Verification OTP",
      html: `<h2 style="color: #0B57D0;">Your New OTP is: ${otp}</h2><p>This code is valid for 10 minutes.</p>`
    });

    res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 7. FORGOT PASSWORD STEP 1: Send Reset OTP
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ personalEmail: email });

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin with this email does not exist" });
    }

    const otp = generateOTP();
    admin.otpPersonal = otp;
    admin.otpPersonalExpire = Date.now() + 10 * 60 * 1000; 
    await admin.save({ validateBeforeSave: false });

    await sendEmail({
      email: admin.personalEmail,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #071952;">Password Reset Request</h2>
          <p>You requested a password reset. Use the code below to proceed:</p>
          <h1 style="color: #0B57D0; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
          <p style="font-size: 12px; color: #94a3b8;">If you did not request this, please secure your account immediately.</p>
        </div>
      `
    });

    res.status(200).json({ success: true, message: "Password reset OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 8. FORGOT PASSWORD STEP 2: Verify Reset OTP
 */
export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ personalEmail: email }).select("+otpPersonal +otpPersonalExpire");

    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });
    if (admin.otpPersonal !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (admin.otpPersonalExpire < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    res.status(200).json({ success: true, message: "OTP verified. You can now reset your password." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 9. FORGOT PASSWORD STEP 3: Update Password
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ personalEmail: email });

    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    admin.password = password;
    admin.otpPersonal = undefined;
    admin.otpPersonalExpire = undefined;
    admin.passwordChangedAt = Date.now();
    
    await admin.save();

    await sendEmail({
        email: admin.personalEmail,
        subject: "Password Changed Successfully",
        html: `<p>Hello ${admin.name}, your admin password has been successfully updated.</p>`
    });

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};