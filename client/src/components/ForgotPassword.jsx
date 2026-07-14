// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { 
//   Mail, 
//   ArrowRight, 
//   ArrowLeft,
//   Sparkles,
//   AlertCircle,
//   Loader2,
//   CheckCircle2
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: 'onTouched' });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     // Simulate API request to send reset link
//     console.log("Reset Email Sent to:", data.email);
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-sans">
      
//       {/* --- COMPACT NAVBAR --- */}
//       <nav className="flex-none flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white">
//         <Link to="/" className="text-xl font-black tracking-tight text-[#071952]">Hirings</Link>
//         <Link to="/login" className="text-sm font-bold text-[#0B57D0] flex items-center gap-2 hover:underline">
//           <ArrowLeft size={16} /> Back to Login
//         </Link>
//       </nav>

//       {/* --- SPLIT CONTENT --- */}
//       <div className="flex-1 flex min-h-0">
        
//         {/* LEFT SIDE: IMAGE (Thoughtful/Problem solving theme) */}
//         <div className="hidden lg:block w-[45%] relative">
//           <img 
//             src="https://images.unsplash.com/photo-1557426272-fc759fbbad60?auto=format&fit=crop&q=80&w=1200" 
//             alt="Support"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-[#071952]/40 backdrop-blur-[1px]" />
//           <div className="absolute bottom-12 left-12 right-12 text-white">
//             <h2 className="text-3xl font-black mb-4 leading-tight">Don't worry, <br/> we've got you covered.</h2>
//             <div className="flex items-center gap-2 text-white/80 font-medium">
//                <Sparkles size={18} className="text-blue-400" />
//                <span>Secure password recovery for your account</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: FORM */}
//         <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
//           <AnimatePresence mode="wait">
//             {!isSubmitted ? (
//               // --- STATE 1: REQUEST FORM ---
//               <motion.div 
//                 key="form"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100"
//               >
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center gap-2 mb-3">
//                     <div className="w-8 h-8 bg-[#071952] rounded-lg flex items-center justify-center text-white">
//                       <Sparkles size={16} />
//                     </div>
//                     <span className="text-sm font-black tracking-widest text-[#071952] uppercase">Hirings</span>
//                   </div>
//                   <h1 className="text-2xl font-black text-[#071952] mb-1">Forgot Password?</h1>
//                   <p className="text-slate-400 text-sm font-medium">Enter your email to receive a reset link</p>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                   <div>
//                     <label className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
//                       Email Address
//                       {errors.email && <span className="text-red-500 normal-case tracking-normal font-bold flex items-center gap-1"><AlertCircle size={10}/> {errors.email.message}</span>}
//                     </label>
//                     <div className="relative">
//                       <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-400'}`} size={16} />
//                       <input 
//                         {...register("email", { 
//                             required: "Email is required",
//                             pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
//                         })}
//                         type="email" 
//                         placeholder="name@company.com"
//                         className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl outline-none transition-all text-slate-600 text-sm font-medium
//                             ${errors.email ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-[#EEF2FF] border-transparent focus:bg-white focus:border-[#0B57D0]/30'}`}
//                       />
//                     </div>
//                   </div>

//                   <button 
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full py-4 bg-[#071952] text-white rounded-xl font-bold text-sm hover:bg-[#0B57D0] transition-all shadow-lg flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
//                   >
//                     {isSubmitting ? (
//                         <Loader2 size={18} className="animate-spin" />
//                     ) : (
//                         <>
//                             Send Reset Link 
//                             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                         </>
//                     )}
//                   </button>
//                 </form>
//               </motion.div>
//             ) : (
//               // --- STATE 2: SUCCESS MESSAGE ---
//               <motion.div 
//                 key="success"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 p-10 border border-slate-100 text-center"
//               >
//                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                    <CheckCircle2 size={32} className="text-green-500" />
//                 </div>
//                 <h1 className="text-2xl font-black text-[#071952] mb-2">Check your email</h1>
//                 <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
//                   We've sent a password reset link to your email address. Please check your inbox (and spam folder).
//                 </p>
//                 <Link 
//                   to="/login"
//                   className="inline-flex items-center gap-2 text-sm font-black text-[#0B57D0] hover:underline"
//                 >
//                   <ArrowLeft size={16} /> Return to login
//                 </Link>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;





import React, { useState } from "react";
import { Mail, ShieldCheck, Lock, Eye, EyeOff, KeyRound, ArrowRight, Sparkles, Loader2, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 1. Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!data.email) return toast.error("Please enter your email");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/forgot-password", { email: data.email });
      if (res.data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (data.otp.length !== 6) return toast.error("Enter 6-digit OTP");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/verify-reset-otp", { 
        email: data.email, 
        otp: data.otp 
      });
      if (res.data.success) {
        toast.success("OTP Verified");
        setStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 3. Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) return toast.error("Passwords do not match");
    if (data.newPassword.length < 8) return toast.error("Minimum 8 characters required");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/reset-password", {
        email: data.email,
        password: data.newPassword
      });
      if (res.data.success) {
        toast.success("Password reset successfully! Please login.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="main-content">
        {/* LEFT PANEL */}
        <div className="panel-left">
          <div className="logo">
            <div className="logo-box"><KeyRound size={20} color="white" /></div>
            <h1>Hirings</h1>
          </div>
          <div className="hero-content">
            <span className="tag">SECURITY RECOVERY</span>
            <h2>Forgot<br /><span>Password?</span></h2>
            <p>Don't worry, it happens. Follow the steps to secure your admin account.</p>
          </div>
          <div className="footer-text">Protected by end-to-end encryption</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel-right">
          <div className="form-box">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate("/login")} className="back-btn">
              <ChevronLeft size={16} /> Back
            </button>
            
            <h1 className="form-title">
              {step === 1 && "Reset Access"}
              {step === 2 && "Verification"}
              {step === 3 && "New Password"}
            </h1>
            <p className="signup-link">
              {step === 1 && "Enter your email to receive an OTP code."}
              {step === 2 && `We've sent a 6-digit code to ${data.email}`}
              {step === 3 && "Choose a strong password to protect your account."}
            </p>

            <form onSubmit={step === 1 ? handleRequestOtp : step === 2 ? handleVerifyOtp : handleResetPassword}>
              
              {step === 1 && (
                <InputField
                  label="Work Email" icon={<Mail size={16} />} type="email"
                  placeholder="name@company.com" value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                />
              )}

              {step === 2 && (
                <InputField
                  label="6-Digit Code" icon={<ShieldCheck size={16} />} type="text"
                  placeholder="000000" value={data.otp}
                  onChange={(e) => setData({...data, otp: e.target.value})}
                />
              )}

              {step === 3 && (
                <>
                  <InputField
                    label="New Password" icon={<Lock size={16} />} placeholder="••••••••"
                    type={showPassword ? "text" : "password"} value={data.newPassword}
                    onChange={(e) => setData({...data, newPassword: e.target.value})}
                    rightIcon={showPassword ? <EyeOff size={14} onClick={() => setShowPassword(false)} className="cp" /> : <Eye size={14} onClick={() => setShowPassword(true)} className="cp" />}
                  />
                  <InputField
                    label="Confirm Password" icon={<Lock size={16} />} placeholder="••••••••"
                    type="password" value={data.confirmPassword}
                    onChange={(e) => setData({...data, confirmPassword: e.target.value})}
                  />
                </>
              )}

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : (
                  step === 3 ? "Update Password" : "Continue →"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .forgot-container { display: flex; align-items: center; justify-content: center; height: 100vh; background: #f8fafc; font-family: 'Inter', sans-serif; }
        .main-content { display: flex; width: 100%; max-width: 1000px; height: 520px; background: white; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 50px rgba(7, 25, 82, 0.05); border: 1px solid #f1f5f9; }
        .panel-left { flex: 0.9; background: #071952; color: white; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-box { width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .logo h1 { font-size: 22px; font-weight: 900; }
        .hero-content h2 { font-size: 44px; line-height: 1.1; font-weight: 900; }
        .hero-content h2 span { color: #60a5fa; }
        .hero-content p { margin-top: 15px; color: rgba(255,255,255,0.7); font-size: 15px; }
        .tag { color: #60a5fa; letter-spacing: 3px; font-weight: 800; font-size: 11px; margin-bottom: 12px; display: block; }
        .footer-text { color: rgba(255,255,255,0.5); font-size: 13px; }
        .panel-right { flex: 1.1; background: white; display: flex; justify-content: center; align-items: center; padding: 20px; position: relative; }
        .form-box { width: 100%; max-width: 380px; }
        .back-btn { position: absolute; top: 30px; left: 30px; border: none; background: none; color: #64748b; font-weight: 700; font-size: 13px; display: flex; align-items: center; gap: 4px; cursor: pointer; }
        .form-title { font-size: 28px; font-weight: 900; color: #071952; margin-bottom: 4px; }
        .signup-link { color: #64748b; margin-bottom: 25px; font-size: 14px; }
        .submit-btn { width: 100%; height: 50px; border: none; border-radius: 14px; background: #071952; color: white; font-size: 15px; font-weight: 800; cursor: pointer; margin-top: 15px; transition: 0.3s; }
        .submit-btn:hover { background: #0b57d0; }
        .cp { cursor: pointer; color: #94a3b8; }
      `}</style>
    </div>
  );
};

// Reusable Input Component (Same as Login)
const InputField = ({ label, icon, rightIcon, error, disabled, ...props }) => (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <label style={{ fontSize: "9px", letterSpacing: "1px", color: "#64748b", fontWeight: "900", textTransform: "uppercase" }}>{label}</label>
      </div>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        border: "1.5px solid #f1f5f9", 
        borderRadius: "12px", 
        padding: "0 14px", 
        height: "48px", 
        background: "#fff",
      }}>
        <span style={{ color: "#94a3b8", marginRight: "10px" }}>{icon}</span>
        <input {...props} style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", fontWeight: "600", color: "#071952", background: "transparent" }} />
        {rightIcon && <div style={{ marginLeft: "10px", display: 'flex' }}>{rightIcon}</div>}
      </div>
    </div>
);

export default ForgotPassword;