
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ type: '', message: '' });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = "Work email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid work email";
//     }
//     if (!formData.message.trim()) newErrors.message = "Please tell us what you're hiring for";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear errors when user types
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    
//     // Clear status message when user starts typing a new message
//     if (status.message) setStatus({ type: '', message: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     setStatus({ type: '', message: '' });

//     try {
//       const response = await axios.post('http://localhost:5000/api/contact', formData);
//       if (response.data.success) {
//         setStatus({ type: 'success', message: 'Message sent! We will get back to you shortly.' });
        
//         // RESET FORM AND ERRORS
//         setFormData({ fullName: '', email: '', message: '' });
//         setErrors({});
        
//         // Auto-hide success message after 5s
//         setTimeout(() => setStatus({ type: '', message: '' }), 5000);
//       }
//     } catch (error) {
//       setStatus({ 
//         type: 'error', 
//         message: error.response?.data?.message || 'Failed to send message.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ErrorDisplay = ({ msg }) => (
//     <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-1.5 font-bold flex items-center gap-1 ml-1">
//       <AlertCircle size={12} /> {msg}
//     </motion.p>
//   );

//   return (
//     <section className="h-screen w-full flex flex-col bg-[#F8FAFC] overflow-hidden pt-20">
//       <div className="flex-grow flex items-center py-6">
//         <div className="container mx-auto px-8 lg:px-12 h-full max-h-[750px]">
//           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch h-full max-w-6xl mx-auto">
            
//             {/* LEFT CONTENT CARD */}
//             <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center h-full p-8 lg:p-12 rounded-[32px] bg-white/50 border border-slate-100 shadow-sm">
//               <span className="inline-block px-3 py-1 rounded-full bg-[#071952]/5 border border-[#071952]/10 text-[#071952] text-[10px] font-black uppercase tracking-[0.2em] mb-6 w-fit">Get In Touch</span>
//               <h1 className="text-4xl lg:text-[52px] font-black text-[#071952] leading-[1.1] mb-6 tracking-tighter">Looking to <br /><span className="text-[#0B57D0]">Hire?</span></h1>
//               <p className="text-[16px] text-slate-600 mb-8 leading-relaxed font-medium max-w-md">Book a free consultation with our recruitment experts.</p>
//               <ul className="space-y-4">
//                 {[" Define your hiring strategy", "Understand current talent market trends", "Reduce hiring time", "Improve candidate quality"].map((item, index) => (
//                   <li key={index} className="flex items-center gap-3 text-[15px] text-slate-700 font-bold">
//                     <div className="w-2 h-2 rounded-full bg-[#0B57D0]" /> {item}
//                   </li>
//                 ))}
//               </ul>
//               <br></br>
           
//               <p className="text-[16px] text-slate-600 mb-8 leading-relaxed font-medium max-w-md">No obligation. Just practical hiring advice.</p>
//             </motion.div>

//             {/* RIGHT FORM CARD */}
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full bg-white p-8 lg:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(7,25,82,0.04)] border border-slate-100 flex flex-col">
//               <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between space-y-4">
//                 <div className="space-y-4 flex-grow flex flex-col justify-center">
//                   <div>
//                     <label className="block text-[11px] font-black text-[#071952] uppercase tracking-wider mb-2">Full Name *</label>
//                     <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Jane Smith"
//                       className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[14px] font-medium ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
//                     {errors.fullName && <ErrorDisplay msg={errors.fullName} />}
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-black text-[#071952] uppercase tracking-wider mb-2">Work Email *</label>
//                     <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com"
//                       className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[14px] font-medium ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
//                     {errors.email && <ErrorDisplay msg={errors.email} />}
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-black text-[#071952] uppercase tracking-wider mb-2">What are you hiring for? *</label>
//                     <textarea rows="3" name="message" value={formData.message} onChange={handleChange} placeholder="e.g., Senior product manager..."
//                       className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all resize-none text-[14px] font-medium ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
//                     {errors.message && <ErrorDisplay msg={errors.message} />}
//                   </div>
//                 </div>

//                 <AnimatePresence>
//                   {status.message && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`flex items-center gap-2 p-3 rounded-xl text-[13px] font-bold ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
//                       {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
//                       {status.message}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <div className="pt-2">
//                   <button disabled={loading} className="w-full py-4 bg-[#071952] text-white font-black rounded-xl shadow-lg hover:bg-[#0B57D0] transition-all active:scale-95 text-[14px] mb-4 flex items-center justify-center gap-2 uppercase tracking-widest">
//                     {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : "Book Free Consultation→"}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Work email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid work email";
    }
    if (!formData.message.trim()) newErrors.message = "Please tell us what you're hiring for";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    
    // Clear status message when user starts typing a new message
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/contact`,
  formData
);
      if (response.data.success) {
        setStatus({ type: 'success', message: 'Message sent! We will get back to you shortly.' });
        
        // RESET FORM AND ERRORS
        setFormData({ fullName: '', email: '', message: '' });
        setErrors({});
        
        // Auto-hide success message after 5s
        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const ErrorDisplay = ({ msg }) => (
    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-1.5 font-bold flex items-center gap-1 ml-1">
      <AlertCircle size={12} /> {msg}
    </motion.p>
  );

  return (
    /* MOBILE FIX: Changed h-screen to min-h-screen and removed overflow-hidden */
    <section className="min-h-screen w-full flex flex-col bg-[#F8FAFC] pt-24 lg:pt-20 pb-12">
      <div className="flex-grow flex items-center">
        {/* MOBILE FIX: Removed h-full and max-h-[750px] to allow natural height on phones */}
        <div className="container mx-auto px-6 md:px-12">
          {/* MOBILE FIX: grid-cols-1 ensures stacking on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* LEFT CONTENT CARD */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center p-8 lg:p-12 rounded-[32px] bg-white md:bg-white/50 border border-slate-100 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full bg-[#071952]/5 border border-[#071952]/10 text-[#071952] text-[10px] font-black uppercase tracking-[0.2em] mb-6 w-fit">Get In Touch</span>
              <h1 className="text-4xl lg:text-[52px] font-black text-[#071952] leading-[1.1] mb-6 tracking-tighter">Looking to <br /><span className="text-[#0B57D0]">Hire?</span></h1>
              <p className="text-[16px] text-slate-600 mb-8 leading-relaxed font-medium max-w-md">Book a free consultation with our recruitment experts.</p>
              <ul className="space-y-4">
                {["Define your hiring strategy", "Understand current talent market trends", "Reduce hiring time", "Improve candidate quality"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[15px] text-slate-700 font-bold">
                    <div className="w-2 h-2 rounded-full bg-[#0B57D0]" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-[16px] text-slate-600 leading-relaxed font-medium max-w-md">No obligation. Just practical hiring advice.</p>
              </div>
            </motion.div>

            {/* RIGHT FORM CARD */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-8 lg:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(7,25,82,0.04)] border border-slate-100 flex flex-col">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <div>
                  <label className="block text-[11px] font-black text-[#071952] uppercase tracking-wider mb-2">Full Name *</label>
                  <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Jane Smith"
                    className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[14px] font-medium ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
                  {errors.fullName && <ErrorDisplay msg={errors.fullName} />}
                </div>

                <div>
                  <label className="block text-[11px] font-black text-[#071952] uppercase tracking-wider mb-2">Work Email *</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com"
                    className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all text-[14px] font-medium ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
                  {errors.email && <ErrorDisplay msg={errors.email} />}
                </div>

                <div>
                  <label className="block text-[11px] font-black text-[#071952] uppercase tracking-wider mb-2">What are you hiring for? *</label>
                  <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="e.g., Senior product manager..."
                    className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-[#0B57D0] transition-all resize-none text-[14px] font-medium ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-100'}`} />
                  {errors.message && <ErrorDisplay msg={errors.message} />}
                </div>

                <AnimatePresence>
                  {status.message && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`flex items-center gap-2 p-3 rounded-xl text-[13px] font-bold ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2">
                  <button disabled={loading} className="w-full py-4 bg-[#071952] text-white font-black rounded-xl shadow-lg hover:bg-[#0B57D0] transition-all active:scale-95 text-[14px] flex items-center justify-center gap-2 uppercase tracking-widest">
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : "Book Free Consultation →"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}