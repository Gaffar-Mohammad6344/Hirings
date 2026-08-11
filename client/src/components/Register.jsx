
import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, Sparkles, Phone, Building2, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({ p: false, c: false, submit: false });
  const [pSent, setPSent] = useState(false);
  const [cSent, setCSent] = useState(false);
  const [pVerified, setPVerified] = useState(false);
  const [cVerified, setCVerified] = useState(false);
  const [otps, setOtps] = useState({ p: "", c: "" });

  const [formData, setFormData] = useState({
    fullName: "", personalEmail: "", companyEmail: "", password: "", phone: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const triggerOtp = async (type) => {
    const email = type === 'p' ? formData.personalEmail : formData.companyEmail;
    if (!email) return toast.error("Email required");
    try {
      setLoading(prev => ({ ...prev, [type]: true }));
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/send-otp`, { 
        email, type: type === 'p' ? 'personal' : 'company', personalEmail: formData.personalEmail 
      });
      type === 'p' ? setPSent(true) : setCSent(true);
      toast.success("OTP Sent!");
    } catch (err) { toast.error("Mail server error"); }
    finally { setLoading(prev => ({ ...prev, [type]: false })); }
  };

  const verifyOtp = async (type) => {
    const otpValue = type === 'p' ? otps.p : otps.c;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/verify-otp`, { 
        otp: otpValue, type: type === 'p' ? 'personal' : 'company', personalEmail: formData.personalEmail 
      });
      type === 'p' ? setPVerified(true) : setCVerified(true);
      toast.success("Verified!");
    } catch (err) { toast.error("Invalid OTP"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(prev => ({ ...prev, submit: true }));
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      if (response.data.success) {
        toast.success("Account Created Successfully!");
        navigate("/login");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg); 
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  return (
    <div className="register-page-wrapper" >
      <div className="main-content shadow-2xl">
        {/* LEFT PANEL */}
        <div className="panel-left">
          <div className="logo">
            <div className="logo-box"><Sparkles size={20} color="white" /></div>
            <h1>Hirings</h1>
          </div>
          <div className="hero-content">
            <span className="tag">ADMIN PORTAL</span>
            <h2>Build your<br /><span>dream team.</span></h2>
            <p>Access your hiring dashboard and manage your talent pipeline with advanced analytics.</p>
          </div>
          <div className="footer-text">Trusted by 200+ fast-growing startups</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel-right">
          <div className="form-box">
            <h1 className="form-title">Join Hirings</h1>
            <p className="signin-link">Already have an account? <Link to="/login">Sign In</Link></p>

            <form onSubmit={handleSubmit}>
              <div className="input-grid">
                <InputField label="Full Name" icon={<User size={13}/>} name="fullName" placeholder="Jane Doe" onChange={handleChange} />
                <InputField label="Phone" icon={<Phone size={13}/>} name="phone" placeholder="9876543210" onChange={handleChange} />
              </div>

              {/* Personal Email */}
              <InputField 
                label="Personal Email" icon={<Mail size={13}/>} name="personalEmail" placeholder="John@gmail.com" onChange={handleChange} disabled={pVerified}
                rightIcon={pVerified ? <CheckCircle size={15} color="#10b981"/> : <button type="button" onClick={() => triggerOtp('p')} className="v-btn">{loading.p ? "..." : "Verify"}</button>}
              />
              {pSent && !pVerified && (
                <div className="otp-section">
                  <input placeholder="Personal OTP" onChange={(e) => setOtps({...otps, p: e.target.value})} className="otp-input" />
                  <button type="button" onClick={() => verifyOtp('p')} className="confirm-btn">Confirm</button>
                </div>
              )}

              {/* Company Email */}
              <InputField 
                label="Company Email" icon={<Building2 size={13}/>} name="companyEmail" placeholder="xyz@hire.in" onChange={handleChange} disabled={cVerified}
                rightIcon={cVerified ? <CheckCircle size={15} color="#10b981"/> : <button type="button" onClick={() => triggerOtp('c')} disabled={!pVerified} className="v-btn">{loading.c ? "..." : "Verify"}</button>}
              />
              {cSent && !cVerified && (
                <div className="otp-section">
                  <input placeholder="Company OTP" onChange={(e) => setOtps({...otps, c: e.target.value})} className="otp-input" />
                  <button type="button" onClick={() => verifyOtp('c')} className="confirm-btn">Confirm</button>
                </div>
              )}

              <InputField 
                label="Password" icon={<Lock size={13}/>} name="password" placeholder="••••••••" type={showPassword ? "text" : "password"} onChange={handleChange}
                rightIcon={showPassword ? <EyeOff size={14} className="cp" onClick={()=>setShowPassword(false)}/> : <Eye size={14} className="cp" onClick={()=>setShowPassword(true)}/>}
              />

              <button type="submit" disabled={!pVerified || !cVerified || loading.submit} className="submit-btn">
                {loading.submit ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Create Free Account →"}
              </button>

              <div className="instruction-box">
                <AlertCircle size={11} className="text-blue-500" />
                <span>For Admin login, you must use company mail for verification.</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .register-page-wrapper { 
          display: flex; 
          align-items: flex-start; 
          justify-content: center; 
          min-height: 100vh; 
          background: #f8fafc; 
          font-family: 'Inter', sans-serif; 
          padding-top: 120px; 
          padding-bottom: 40px;
        }
        
        .main-content { 
          display: flex; 
          width: 95%; 
          max-width: 950px; 
          min-height: 550px;
          background: white; 
          border-radius: 24px; 
          overflow: hidden; 
          border: 1px solid #f1f5f9; 
        }
        
        /* Left Panel */
        .panel-left { flex: 0.85; background: #071952; color: white; padding: 35px; display: flex; flex-direction: column; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-box { width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .logo h1 { font-size: 20px; font-weight: 900; margin: 0; }
        .hero-content h2 { font-size: 38px; line-height: 1.1; font-weight: 900; margin-top: 15px; }
        .hero-content h2 span { color: #60a5fa; }
        .hero-content p { margin-top: 12px; color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.5; }
        .tag { color: #60a5fa; letter-spacing: 2px; font-weight: 800; font-size: 10px; margin-bottom: 8px; display: block; }
        .footer-text { color: rgba(255,255,255,0.4); font-size: 12px; }

        /* Right Panel */
        .panel-right { flex: 1.15; padding: 20px 40px; display: flex; align-items: center; justify-content: center; }
        .form-box { width: 100%; max-width: 380px; }
        .form-title { font-size: 24px; font-weight: 900; color: #071952; margin: 0; }
        .signin-link { color: #64748b; font-size: 12px; margin-bottom: 12px; }
        .signin-link a { color: #0B57D0; font-weight: 800; text-decoration: none; margin-left: 4px; }

        /* Form Logic */
        .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .v-btn { background: #071952; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 8px; font-weight: 800; cursor: pointer; }
        .v-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
        .otp-section { display: flex; gap: 8px; background: #f0f7ff; padding: 5px 10px; border-radius: 10px; margin: -5px 0 8px 0; border: 1px dashed #0B57D0; }
        .otp-input { flex: 1; background: transparent; border: none; outline: none; font-size: 10px; font-weight: 600; color: #071952; }
        .confirm-btn { background: #10b981; color: white; border: none; font-size: 8px; font-weight: 800; padding: 4px 10px; border-radius: 5px; cursor: pointer; }
        .submit-btn { width: 100%; height: 42px; background: #071952; color: white; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; margin-top: 8px; font-size: 13px; transition: 0.2s; }
        .submit-btn:hover { background: #0b57d0; }
        .submit-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
        
        .instruction-box { margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 10px; color: #64748b; font-weight: 600; }
        .instruction-box span { color: #071952; }
        .cp { cursor: pointer; color: #94a3b8; }

        @media(max-width: 900px) {
          .panel-left { display: none; }
          .panel-right { padding: 40px 20px; }
          .main-content { max-width: 450px; min-height: auto; height: auto; }
          .register-page-wrapper { padding-top: 80px; }
        }

        @media(max-width: 480px) {
          .input-grid { grid-template-columns: 1fr; gap: 0; }
          .register-page-wrapper { padding-top: 60px; }
          .form-title { font-size: 22px; }
          .instruction-box { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

const InputField = ({ label, icon, rightIcon, disabled, ...props }) => (
  <div style={{ marginBottom: "8px" }}>
    <label style={{ fontSize: "8.5px", fontWeight: "900", color: "#64748b", textTransform: "uppercase", display: 'block', marginBottom: '2px' }}>{label}</label>
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      border: "1.5px solid #f1f5f9", 
      borderRadius: "10px", 
      padding: "0 10px", 
      height: "36px",
      background: disabled ? "#f8fafc" : "#fff" 
    }}>
      <span style={{ color: "#94a3b8", marginRight: "8px" }}>{icon}</span>
      <input {...props} disabled={disabled} style={{ flex: 1, border: "none", outline: "none", fontSize: "11.5px", fontWeight: "600", color: "#071952", background: 'transparent' }} />
      {rightIcon}
    </div>
  </div>
);

export default Register;