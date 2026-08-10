import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  Zap,
  Briefcase,
  ShieldCheck,
  Globe2,
  Check,
  CircleCheck,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const sentence = "We help startups and growing companies hire skilled professionals faster. From sourcing and screening to onboarding, we manage the entire hiring process.";
  
  const points = [
    "Pre-screened candidates",
    "Faster hiring cycles",
    "Global & India hiring support",
    "No long-term commitments",
  ];

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
        duration: 0,
      },
    }),
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + (i * 0.3),
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  const pointTextVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.6 + (i * 0.3),
        duration: 0.4
      }
    })
  };

  let charIndexCounter = 0;

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col pt-21 lg:pt-24 overflow-hidden bg-[#FDFEFE]">
      
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.2]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex-grow flex items-center pb-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start w-full">
          
          {/* --- LEFT CONTENT --- */}
          <div className="flex flex-col z-10">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-6 shadow-sm w-fit"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-50">
                <Zap size={12} className="text-[#0B57D0] fill-[#0B57D0]/20" /> 
              </div>
              Hiring made simple, fast, and human
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[42px] lg:text-[50px] font-[900] text-[#071952] leading-[1.1] mb-6 tracking-tight"
            >
              Build High-Performing Teams<br />
              <span className="text-[#0B57D0]">Without Wasting Time.</span>
            </motion.h1>

            <p className="text-[16px] text-slate-500 mb-8 max-w-[520px] leading-relaxed font-medium flex flex-wrap">
              {sentence.split(" ").map((word, wordIdx) => {
                const wordWithSpace = word + " ";
                return (
                  <span key={wordIdx} className="inline-block whitespace-nowrap">
                    {wordWithSpace.split("").map((char, charIdx) => {
                      const currentIdx = charIndexCounter++;
                      return (
                        <motion.span
                          key={charIdx}
                          custom={currentIdx}
                          variants={letterVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <motion.div 
                    custom={i}
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100"
                  >
                    <Check size={12} className="text-emerald-600" strokeWidth={3} />
                  </motion.div>
                  <motion.span 
                    custom={i}
                    variants={pointTextVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[14px] text-slate-600 font-semibold"
                  >
                    {point}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="flex flex-wrap items-center gap-4 mb-4"
            >
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#071952] text-white rounded-xl font-bold text-[15px] hover:bg-[#0B57D0] transition-all shadow-xl shadow-blue-900/10 flex items-center gap-3 group active:scale-95"
              >
                <Users size={18} />
                Hire Talent
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/submit-resume" 
                className="px-8 py-4 bg-white text-[#071952] border border-slate-200 rounded-xl font-bold text-[15px] hover:border-[#0B57D0] hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm active:scale-95 group"
              >
                 <Briefcase size={18} className="text-[#0B57D0]" /> Explore Opportunity
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="flex flex-wrap gap-x-4 gap-y-3 pt-0 border-t border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-widest pt-4"
            >
              <div className="flex items-center gap-2"><CircleCheck size={14} className="text-blue-500 stroke-[2.5]" /> No retainers</div>
              <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-blue-500 stroke-[2.5]" /> No lock-ins</div>
              <div className="flex items-center gap-2"><Globe2 size={14} className="text-blue-500" /> Global Support</div>
            </motion.div>
          </div>

          {/* --- RIGHT VISUAL --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[40px] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" alt="Modern Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071952]/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- NEW TRUST STRIP --- */}
      {/* --- REFINED TRUST STRIP --- */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 3.5, duration: 1 }}
  className="w-full py-3 mt-2"
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-center gap-6">
      {/* Left Icon & Line */}
      <div className="flex items-center gap-4">
        {/* <MapPin size={14} className="text-[#0B57D0]" /> */}
        <div className="h-[1px] w-12 lg:w-20 bg-slate-200"></div>
      </div>

      {/* Main Text - High Tracking & Specific Bolding */}
      <p className="text-slate-400 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.25em] text-center leading-loose">
        Trusted by <span className="text-[#071952] font-[900]">startups, agencies, smes, and enterprises</span> <br className="md:hidden" />
        across<span className="text-[#071952] font-[900]">India, North America, Europe, and the Middle East.</span> 
      </p>

      {/* Right Icon & Line */}
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-12 lg:w-20 bg-slate-200"></div>
        {/* <Globe2 size={14} className="text-[#0B57D0]" /> */}
      </div>
    </div>
  </div>
</motion.div>

    </section>
  );
};

export default Hero;