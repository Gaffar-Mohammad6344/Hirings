


import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles, ShieldCheck, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // OTP / 2FA States
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // --- Validation Logic ---
  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Required";
      else if (!emailRegex.test(value)) error = "Invalid business mail";
    }
    if (name === "password" && !value) error = "Required";
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // --- 1. INITIAL LOGIN (Password Check) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const emailErr = validateField("email", formData.email);
    const passErr = validateField("password", formData.password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, formData);

      if (response.data.success && response.data.requiresOTP) {
        setEmailForOtp(formData.email);
        setShowOtpBox(true);
        toast.success("Security OTP sent to your email");
      } else if (response.data.success) {
        // Direct login if 2FA is disabled on backend
        saveLoginData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. VERIFY 2FA OTP ---
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter the 6-digit code");
    try {
      setVerifyingOtp(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email: emailForOtp,
        otp,
      });

      if (response.data.success) {
        saveLoginData(response.data.data);
        toast.success("Identity Verified!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Helper to store data and redirect
  const saveLoginData = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("adminName", data.user.name);
    localStorage.setItem("adminRank", data.user.adminIndex);
    handleReset();
    navigate("/dashboard");
  };

  const handleReset = () => {
    setFormData({ email: "", password: "" });
    setOtp("");
    setShowOtpBox(false);
    setErrors({});
  };

  return (
    <div className="login-container">
      <div className="main-content shadow-2xl">
        {/* LEFT PANEL */}
        <div className="panel-left">
          <div className="logo">
            <div className="logo-box"><Sparkles size={20} color="white" /></div>
            <h1>Hirings</h1>
          </div>
          <div className="hero-content">
            <span className="tag">ADMIN PORTAL</span>
            <h2>Welcome<br /><span>back home.</span></h2>
            <p>Access your hiring dashboard and manage your talent pipeline with advanced analytics.</p>
          </div>
          <div className="footer-text">Trusted by 200+ fast-growing startups</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel-right">
          <div className="form-box">
            <h1 className="form-title">Sign In</h1>
            <p className="signup-link">Don't have an account? <Link to="/register">Join Now</Link></p>

            <form onSubmit={handleLogin} noValidate>
              
              <InputField
                label="Work Email" 
                icon={<Mail size={16} />} 
                type="email" 
                name="email"
                placeholder="admin@company.com" 
                value={formData.email}
                onChange={handleChange} 
                error={errors.email}
              />

              {!showOtpBox ? (
                <>
                  {/* CUSTOM LABEL WITH FORGOT PASSWORD OPTION */}
                  <div className="label-row">
                    <label className="input-label">Password</label>
                    <Link to="/forgot-password" title="Reset your password" style={{ color: '#0B57D0', textDecoration: 'none', fontSize: '10px', fontWeight: '800' }}>
                      Forgot Password?
                    </Link>
                  </div>

                  <InputField
                    icon={<Lock size={16} />} 
                    name="password" 
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"} 
                    value={formData.password} 
                    onChange={handleChange} 
                    error={errors.password}
                    rightIcon={
                      showPassword ? 
                      <EyeOff size={14} onClick={() => setShowPassword(false)} className="cp" /> : 
                      <Eye size={14} onClick={() => setShowPassword(true)} className="cp" />
                    }
                  />

                  <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Admin Login →"}
                  </button>
                </>
              ) : (
                <div className="otp-section animate-in fade-in zoom-in duration-300">
                  <InputField
                    label="6-Digit OTP Code" 
                    icon={<ShieldCheck size={16} />} 
                    name="otp"
                    placeholder="000000" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    rightIcon={
                      <button type="button" onClick={handleVerifyOtp} className="verify-badge">
                        {verifyingOtp ? "..." : "Verify"}
                      </button>
                    }
                  />
                  <p className="back-link" onClick={() => setShowOtpBox(false)}>Back to Password login</p>
                </div>
              )}

              <p className="instruction-text">
                <AlertCircle size={11} />
                <span>Requires multi-factor email verification.</span>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .login-container { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Inter', sans-serif; background: #f8fafc; padding: 20px; }
        .main-content { display: flex; width: 100%; max-width: 1000px; height: 520px; background: white; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 50px rgba(7, 25, 82, 0.05); border: 1px solid #f1f5f9; }
        
        /* Left Side */
        .panel-left { flex: 0.9; background: #071952; color: white; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-box { width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .logo h1 { font-size: 22px; font-weight: 900; margin: 0; }
        .hero-content h2 { font-size: 44px; line-height: 1.1; font-weight: 900; }
        .hero-content h2 span { color: #60a5fa; }
        .hero-content p { margin-top: 15px; color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6; }
        .tag { color: #60a5fa; letter-spacing: 3px; font-weight: 800; font-size: 11px; margin-bottom: 12px; display: block; }
        .footer-text { color: rgba(255,255,255,0.5); font-size: 13px; }

        /* Right Side */
        .panel-right { flex: 1.1; background: white; display: flex; justify-content: center; align-items: center; padding: 20px; }
        .form-box { width: 100%; max-width: 380px; }
        .form-title { font-size: 28px; font-weight: 900; color: #071952; margin-bottom: 4px; }
        .signup-link { color: #64748b; margin-bottom: 25px; font-size: 14px; }
        .signup-link a { color: #0B57D0; font-weight: 800; text-decoration: none; margin-left: 4px; }

        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .input-label { font-size: 9px; letter-spacing: 1px; color: #64748b; font-weight: 900; text-transform: uppercase; }

        .submit-btn { width: 100%; height: 50px; border: none; border-radius: 14px; background: #071952; color: white; font-size: 15px; font-weight: 800; cursor: pointer; margin-top: 15px; transition: 0.3s; }
        .submit-btn:hover { background: #0b57d0; transform: translateY(-1px); box-shadow: 0 10px 20px rgba(11, 87, 208, 0.15); }
        .submit-btn:disabled { background: #cbd5e1; cursor: not-allowed; }

        .instruction-text { margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 11px; color: #64748b; font-weight: 600; }
        .instruction-text span { color: #071952; }
        
        .otp-section { background: #f0f7ff; padding: 15px; border-radius: 20px; border: 1.5px dashed #0B57D0; }
        .verify-badge { background: #10b981; color: white; border: none; padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: 800; cursor: pointer; }
        .back-link { font-size: 11px; color: #0B57D0; font-weight: 800; text-align: center; cursor: pointer; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cp { cursor: pointer; color: #94a3b8; }
        .cp:hover { color: #071952; }

        @media(max-width: 900px) {
          .panel-left { display: none; }
          .main-content { max-width: 450px; height: auto; padding: 40px 10px; border-radius: 24px; }
          .panel-right { padding: 0; }
          .login-container { align-items: flex-start; padding-top: 80px; }
        }

        @media(max-width: 480px) {
          .main-content { border-radius: 20px; padding: 30px 5px; }
          .form-title { font-size: 24px; text-align: center; }
          .signup-link { text-align: center; }
          .instruction-text { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, icon, rightIcon, error, disabled, ...props }) => (
  <div style={{ marginBottom: "16px" }}>
    {label && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <label style={{ fontSize: "9px", letterSpacing: "1px", color: "#64748b", fontWeight: "900", textTransform: "uppercase" }}>{label}</label>
        {error && <span style={{ color: "#ef4444", fontSize: "9px", fontWeight: "700" }}>{error}</span>}
      </div>
    )}
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      border: `1.5px solid ${error ? '#fecaca' : '#f1f5f9'}`, 
      borderRadius: "14px", 
      padding: "0 16px", 
      height: "52px", 
      background: disabled ? "#f8fafc" : "#fff",
      transition: '0.2s ease'
    }}>
      <span style={{ color: error ? "#ef4444" : "#94a3b8", marginRight: "12px" }}>{icon}</span>
      <input 
        {...props} 
        disabled={disabled} 
        style={{ 
          flex: 1, 
          border: "none", 
          outline: "none", 
          fontSize: "14px", 
          fontWeight: "600", 
          color: "#071952", 
          background: "transparent" 
        }} 
      />
      {rightIcon && <div style={{ marginLeft: "10px", display: 'flex' }}>{rightIcon}</div>}
    </div>
  </div>
);

export default Login;