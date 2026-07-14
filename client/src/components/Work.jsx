

import React from 'react';
import { motion } from 'framer-motion';
import {Zap } from 'lucide-react';

const Work = () => {
  const steps = [
    {
      number: "1",
      title: "We Understand Your Requirements",
      description: "Our recruiters source qualified candidates through multiple channels and professional networks."
    },
    {
      number: "2",
      title: "We Find the Right Talent",
      description: "Our recruiters source qualified candidates through multiple channels and professional networks."
    },
    {
      number: "3",
      title: "We Screen & Shortlist",
      description: "Every candidate is evaluated for skills, experience, communication, and role fit before reaching you."
    },
    {
      number: "4",
      title: "We Support Until Hiring",
      description: "From interview coordination to offer acceptance and onboarding, we stay involved until the position is successfully filled."
    }
  ];

  return (
    /* Changed py-20 to h-screen + pt-24 + flex layout to lock height to viewport */
    <section className="h-screen flex flex-col justify-center pt-6 pb-12 bg-[#F8FAFC] overflow-hidden">
      <div className="container mx-auto px-8 lg:px-12">
        
        {/* --- HEADER (Reduced margin-bottom from 20 to 8 to save vertical space) --- */}
        <div className="max-w-4xl mb-8 flex-shrink-0">
           <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-6 shadow-sm w-fit"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-50">
                <Zap size={12} className="text-[#0B57D0] fill-[#0B57D0]/20" /> 
              </div>
             The Process
            </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-[#071952] tracking-tighter mb-4 leading-tight">
            Our Hiring Process
          </h2>
          
          <div className="w-20 h-1.5 bg-[#0B57D0] mb-6 rounded-full" />
          
          <p className="text-lg lg:text-xl text-slate-500 font-medium max-w-2xl">
           We make hiring simple, transparent, and efficient.
          </p>
        </div>

        {/* --- TIMELINE AREA --- */}
<div className="relative flex-grow">
  
  {/* Horizontal Line - Fixed Start and End Points */}
  <div className="hidden lg:block absolute top-[40px] left-10 w-[calc(75%+32px)] h-[2px] bg-slate-200 z-0">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-full bg-[#0B57D0]"
    />
  </div>

          {/* Grid gap reduced to 8 to keep elements tighter vertically */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-start"
              >
                {/* Number Circle (Reduced mb-8 to mb-6) */}
                <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0B57D0] flex items-center justify-center mb-6 shadow-xl group hover:bg-[#0B57D0] transition-colors duration-300 flex-shrink-0">
                  <span className="text-2xl font-black text-[#071952] group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-black text-[#071952] mb-3 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Work;