
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, Send, X, Plus, AlertCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: ''
  });
  
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
const [isOpen, setIsOpen] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // --- Helper component for Error Message ---
  const ErrorMsg = ({ msg }) => (
    <motion.p 
      initial={{ opacity: 0, y: -5 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="text-[9px] text-red-500 mt-1 font-bold flex items-center gap-1 ml-1"
    >
      <AlertCircle size={10} /> {msg}
    </motion.p>
  );

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.role) newErrors.role = "Please select a target role";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email required";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    if (skills.length === 0) newErrors.skills = "Please add at least one skill";
    if (!file) newErrors.file = "Please upload your resume";
    if (!formData.message.trim()) newErrors.message = "Brief expertise summary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSkill = (e) => {
    if (e) e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim()) && skills.length < 8) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      setSkillInput('');
      if (errors.skills) setErrors(prev => ({ ...prev, skills: null }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setErrors({ ...errors, file: "File exceeds 2MB limit" });
        setFile(null);
      } else {
        setFile(selectedFile);
        if (errors.file) setErrors(prev => ({ ...prev, file: null }));
      }
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("role", formData.role);
    data.append("message", formData.message);
    data.append("skills", JSON.stringify(skills));
    data.append("resume", file);

    const response = await axios.post(
      "http://localhost:5000/api/candidates/apply",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      // Show success button
      setIsSubmitted(true);

      // Reset all fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        message: "",
      });

      setSkills([]);
      setSkillInput("");
      setFile(null);
      setErrors({});
      setIsOpen(false);

      // Reset file input visually
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }

      // Change button back after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Application submission failed");
  }
};

  return (
    <section className="h-screen flex flex-col justify-center bg-[#F8FAFC] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          
          {/* --- LEFT CONTENT --- */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center p-6 lg:p-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#071952]/5 border border-[#071952]/10 text-[#071952] text-[9px] font-black uppercase tracking-[0.2em] mb-4 w-fit">Talent Portal</span>
            <h1 className="text-4xl lg:text-[52px] font-black text-[#071952] leading-[1.05] mb-5 tracking-tighter">Connect with Companies<br /><span className="text-[#0B57D0]"> That Value Your Skills.</span></h1>
            <p className="text-[14px] text-slate-600 mb-8 leading-relaxed font-medium max-w-md">Skip the application queues. One profile gets you noticed by 200+ high-growth companies.</p>
          </motion.div>

          {/* --- RIGHT FORM CARD --- */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 lg:p-8 rounded-[32px] shadow-[0_20px_60px_rgba(7,25,82,0.06)] border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-3">
              
              <div className="grid grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 ml-1">Full Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    placeholder="Jane Smith"
                    className={`w-full px-4 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[13px] font-medium ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-100'}`}
                  />
                  {errors.name && <ErrorMsg msg={errors.name} />}
                </div>

                {/* Target Role */}
                {/* Target Role - Custom Premium Dropdown */}
<div>
  <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 ml-1">Target Role *</label>
  <div className="relative">
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full flex items-center justify-between px-4 py-2 bg-slate-50 border rounded-xl focus:outline-none transition-all text-[13px] font-medium ${
        errors.role ? 'border-red-400 bg-red-50' : isOpen ? 'border-[#0B57D0] ring-2 ring-[#0B57D0]/10 bg-white' : 'border-slate-100'
      }`}
    >
      <span className={formData.role ? "text-[#071952]" : "text-slate-400"}>
        {formData.role || "Select Role"}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={14} className="text-slate-400" />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-20 w-full bg-white border border-slate-100 rounded-2xl shadow-[0_10px_30px_rgba(7,25,82,0.1)] overflow-hidden p-1.5"
          >
            {['Frontend Developer', 'Backend Developer', 'Full Stack Developer'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  handleInputChange('role', role);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                  formData.role === role 
                    ? 'bg-[#EEF2FF] text-[#0B57D0]' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B57D0]'
                }`}
              >
                {role}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </div>
  {errors.role && <ErrorMsg msg={errors.role} />}
</div>
                {/* Email */}
                <div>
                  <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 ml-1">Email Address *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="jane@company.com"
                    className={`w-full px-4 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[13px] font-medium ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-100'}`}
                  />
                  {errors.email && <ErrorMsg msg={errors.email} />}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 ml-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="9876543210"
                    className={`w-full px-4 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[13px] font-medium ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-100'}`}
                  />
                  {errors.phone && <ErrorMsg msg={errors.phone} />}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 ml-1">Key Skills (Max 8) *</label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  <AnimatePresence>
                    {skills.map((skill) => (
                      <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} key={skill} 
                        className="flex items-center gap-1 px-2 py-0.5 bg-[#EEF2FF] text-[#0B57D0] text-[10px] font-bold rounded-lg border border-[#0B57D0]/10"
                      >
                        {skill} <X size={10} className="cursor-pointer" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2">
                  <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()}
                    placeholder="e.g. React, Node..." className={`flex-1 px-4 py-1.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] text-[12px] ${errors.skills ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
                  <button type="button" onClick={addSkill} className="p-2 bg-slate-100 rounded-xl text-slate-500 hover:text-[#0B57D0]"><Plus size={16} /></button>
                </div>
                {errors.skills && <ErrorMsg msg={errors.skills} />}
              </div>

              {/* File Upload */}
              <div>
                <div className="flex justify-between items-center mb-1 ml-1">
                    <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest">Resume (PDF) *</label>
                    <span className="text-[8px] font-bold text-slate-400">MAX SIZE: 2MB</span>
                </div>
                <label className={`group relative flex items-center justify-center w-full h-14 border-2 border-dashed rounded-xl cursor-pointer transition-all ${errors.file ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="flex items-center gap-2">
                    {file ? (
                      <div className="flex items-center gap-2 text-[#0B57D0] font-bold text-[11px]"><CheckCircle2 size={14} /> {file.name}</div>
                    ) : (
                      <><Upload size={14} className="text-slate-400 group-hover:text-[#0B57D0]" /><span className="text-[10px] text-slate-500 font-bold">Click to upload PDF</span></>
                    )}
                  </div>
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </label>
                {errors.file && <ErrorMsg msg={errors.file} />}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 ml-1">Brief Expertise *</label>
                <textarea rows="2" value={formData.message} onChange={e => handleInputChange('message', e.target.value)}
                  placeholder="Summarize your experience..." className={`w-full px-4 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all resize-none text-[13px] font-medium ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-100'}`}
                ></textarea>
                {errors.message && <ErrorMsg msg={errors.message} />}
              </div>

             <button
  type="submit"
  disabled={isSubmitted}
  className={`w-full py-3 ${
    isSubmitted ? "bg-green-500" : "bg-[#0B57D0]"
  } text-white font-black rounded-xl shadow-lg transition-all active:scale-95 text-[13px] flex items-center justify-center gap-2 uppercase tracking-widest`}
>
  {isSubmitted ? "Profile Received" : "Send Application"}
  {!isSubmitted && <Send size={14} />}
</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CandidateForm;