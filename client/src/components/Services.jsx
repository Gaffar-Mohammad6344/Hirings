// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Users2, 
//   SearchCheck, 
//   UserPlus, 
//   ArrowRight,
//   ArrowUp,
//   Zap
// } from 'lucide-react';

// const ServiceCard = ({ service, index }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       /* Removed min-h-full to prevent empty space stretching */
//       className="group p-7 lg:p-8 rounded-[32px] border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(11,87,208,0.06)] transition-all duration-500 flex flex-col h-auto"
//     >
//       <div className={`w-11 h-11 ${service.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform flex-shrink-0`}>
//         {service.icon}
//       </div>

//       <h3 className="text-xl lg:text-2xl font-bold text-[#071952] mb-2 tracking-tight">
//         {service.title}
//       </h3>
      
//       <div className="text-slate-500 text-[14px] leading-relaxed mb-4 font-medium">
//         <p>{service.description}</p>
        
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="overflow-hidden"
//             >
//               <p className="mt-3 pt-3 border-t border-slate-100 text-[#0B57D0] italic">
//                 {service.extraDetails}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <button 
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0B57D0] group/link transition-colors mt-1"
//       >
//         {isExpanded ? 'Learn Less' : 'Learn More'}
//         {isExpanded ? <ArrowUp size={14} /> : <ArrowRight size={14} />}
//       </button>
//     </motion.div>
//   );
// };

// const Services = () => {
//   const services = [
//     {
//       title: 'Talent Sourcing',
//       description: 'Access qualified candidates matched to your requirements.',
//       extraDetails: 'Our headhunting methodology reaches passive talent not found on job boards.',
//       icon: <Users2 size={22} className="text-[#0B57D0]" />, 
//       color: 'bg-blue-50'
//     },
//     {
//       title: 'Candidate Screening',
//       description: 'Technical, behavioral, and communication assessments conducted by our recruitment team.',
//       extraDetails: 'Every candidate undergoes a 3-stage technical deep dive and values check.',
//       icon: <SearchCheck size={22} className="text-[#0B57D0]" />,
//       color: 'bg-indigo-50'
//     },
//     {
//       title: 'Hiring Support',
//       description: 'Interview scheduling, offer management, and onboarding assistance.',
//       extraDetails: 'We manage documentation and 30-day check-ins for long-term retention.',
//       icon: <UserPlus size={22} className="text-[#0B57D0]" />,
//       color: 'bg-sky-50'
//     }
//   ];


//   return (
//     /* 1. Reduced pt-24 to pt-16 to move everything up */
//     /* 2. Reduced pb-12 to pb-6 to lift the bottom box higher */
//     <section className="h-screen max-h-screen flex flex-col justify-start pt-19 md:pt-25 pb-6 bg-white overflow-hidden">
//       <div className="container mx-auto px-8 lg:px-12 flex flex-col h-full max-w-7xl justify-between">
        
//         {/* --- HEADER --- */}
//         {/* Reduced mb-6 to mb-2 to save space */}
//         <div className="max-w-5xl flex-shrink-0 mb-2"> 
         
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-6 shadow-sm w-fit"
//             >
//               <div className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-50">
//                 <Zap size={12} className="text-[#0B57D0] fill-[#0B57D0]/20" /> 
//               </div>
//                Tailored Solutions
//             </motion.div>
          
//           <h2 className="text-4xl lg:text-4xl font-black text-[#071952] tracking-tight mb-1 leading-tight">
//             Recruitment Solutions<span className="text-[#0B57D0]"> Built for Growing Teams</span>
//           </h2>
//           <p className="text-sm lg:text-base text-slate-500 font-medium max-w-5xl">
          
//           Whether you’re hiring one key employee or building an entire team, we provide end-to-end recruitment support.
//           </p>
//         </div>

//         {/* --- SERVICES GRID --- */}
//         {/* Removed flex-grow to let the CTA box sit naturally higher */}
// <div className="grid md:grid-cols-3 gap-6 items-start pb-4 -mt-10">
//           {services.map((service, index) => (
//             <ServiceCard key={service.title} service={service} index={index} />
//           ))}
//         </div>

//         {/* --- BOTTOM CTA --- */}
//         {/* Reduced internal padding (p-6 to p-5) to make the box shorter */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="p-5 lg:p-6 rounded-[28px] bg-[#071952] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0"
//         >
//           <div className="absolute inset-0 opacity-10 pointer-events-none">
//             <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
//           </div>

//           <div className="relative z-10 text-center md:text-left">
//             <h4 className="text-xl lg:text-2xl font-bold text-white mb-0.5">Ready to grow your team?</h4>
//             <p className="text-sm lg:text-base text-slate-300 font-medium">Schedule a discovery call with our experts today.</p>
//           </div>

//           <button className="relative z-10 px-8 py-3 bg-[#0B57D0] text-white text-[14px] font-bold rounded-2xl hover:bg-blue-500 transition-all active:scale-95 shadow-xl">
//             Get Started Now
//           </button>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default Services;




// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Users2, 
//   SearchCheck, 
//   UserPlus, 
//   ArrowRight,
//   ArrowUp,
//   Zap
// } from 'lucide-react';

// const ServiceCard = ({ service, index }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       className="group p-6 lg:p-8 rounded-[32px] border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(11,87,208,0.06)] transition-all duration-500 flex flex-col h-full"
//     >
//       <div className={`w-11 h-11 ${service.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform flex-shrink-0`}>
//         {service.icon}
//       </div>

//       <h3 className="text-xl lg:text-2xl font-bold text-[#071952] mb-2 tracking-tight">
//         {service.title}
//       </h3>
      
//       <div className="text-slate-500 text-[14px] leading-relaxed mb-4 font-medium flex-grow">
//         <p>{service.description}</p>
        
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="overflow-hidden"
//             >
//               <p className="mt-3 pt-3 border-t border-slate-100 text-[#0B57D0] italic">
//                 {service.extraDetails}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <button 
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0B57D0] group/link transition-colors mt-auto pt-2"
//       >
//         {isExpanded ? 'Learn Less' : 'Learn More'}
//         {isExpanded ? <ArrowUp size={14} /> : <ArrowRight size={14} />}
//       </button>
//     </motion.div>
//   );
// };

// const Services = () => {
//   const services = [
//     {
//       title: 'Talent Sourcing',
//       description: 'Access qualified candidates matched to your requirements.',
//       extraDetails: 'Our headhunting methodology reaches passive talent not found on job boards.',
//       icon: <Users2 size={22} className="text-[#0B57D0]" />, 
//       color: 'bg-blue-50'
//     },
//     {
//       title: 'Candidate Screening',
//       description: 'Technical, behavioral, and communication assessments conducted by our recruitment team.',
//       extraDetails: 'Every candidate undergoes a 3-stage technical deep dive and values check.',
//       icon: <SearchCheck size={22} className="text-[#0B57D0]" />,
//       color: 'bg-indigo-50'
//     },
//     {
//       title: 'Hiring Support',
//       description: 'Interview scheduling, offer management, and onboarding assistance.',
//       extraDetails: 'We manage documentation and 30-day check-ins for long-term retention.',
//       icon: <UserPlus size={22} className="text-[#0B57D0]" />,
//       color: 'bg-sky-50'
//     }
//   ];

//   return (
//     <section className="min-h-screen py-16 md:py-24 bg-white flex flex-col justify-center overflow-x-hidden">
//       <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
//         {/* --- HEADER --- */}
//         <div className="max-w-4xl mb-12 lg:mb-16"> 
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-6 shadow-sm w-fit"
//             >
//               <div className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-50">
//                 <Zap size={12} className="text-[#0B57D0] fill-[#0B57D0]/20" /> 
//               </div>
//                Tailored Solutions
//             </motion.div>
          
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#071952] tracking-tight mb-4 leading-tight">
//             Recruitment Solutions<span className="text-[#0B57D0]"> Built for Growing Teams</span>
//           </h2>
//           <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl">
//             Whether you’re hiring one key employee or building an entire team, we provide end-to-end recruitment support.
//           </p>
//         </div>

//         {/* --- SERVICES GRID --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
//           {services.map((service, index) => (
//             <ServiceCard key={service.title} service={service} index={index} />
//           ))}
//         </div>

//         {/* --- BOTTOM CTA --- */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.98 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="p-8 lg:p-10 rounded-[32px] bg-[#071952] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
//         >
//           {/* Decorative Background */}
//           <div className="absolute inset-0 opacity-10 pointer-events-none">
//             <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
//           </div>

//           <div className="relative z-10 text-center md:text-left">
//             <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2">Ready to grow your team?</h4>
//             <p className="text-slate-300 font-medium text-sm md:text-base">Schedule a discovery call with our experts today.</p>
//           </div>

//           <button className="relative z-10 w-full md:w-auto px-10 py-4 bg-[#0B57D0] text-white text-[15px] font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl">
//             Get Started Now
//           </button>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default Services;




import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users2, 
  SearchCheck, 
  UserPlus, 
  ArrowRight,
  ArrowUp,
  Zap
} from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-6 lg:p-7 rounded-[28px] border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(11,87,208,0.06)] transition-all duration-500 flex flex-col h-full"
    >
      <div className={`w-10 h-10 lg:w-11 lg:h-11 ${service.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
        {React.cloneElement(service.icon, { size: 20 })}
      </div>

      <h3 className="text-lg lg:text-xl font-bold text-[#071952] mb-2 tracking-tight">
        {service.title}
      </h3>
      
      <div className="text-slate-500 text-[13px] lg:text-[14px] leading-relaxed mb-4 font-medium flex-grow">
        <p>{service.description}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-2 pt-2 border-t border-slate-100 text-[#0B57D0] italic text-[12px] lg:text-[13px]">
                {service.extraDetails}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 text-[12px] lg:text-[13px] font-bold text-[#0B57D0] group/link transition-colors mt-auto pt-1"
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
        {isExpanded ? <ArrowUp size={14} /> : <ArrowRight size={14} />}
      </button>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Talent Sourcing',
      description: 'Access qualified candidates matched to your requirements.',
      extraDetails: 'Our headhunting methodology reaches passive talent not found on job boards.',
      icon: <Users2 className="text-[#0B57D0]" />, 
      color: 'bg-blue-50'
    },
    {
      title: 'Candidate Screening',
      description: 'Technical, behavioral, and communication assessments conducted by our team.',
      extraDetails: 'Every candidate undergoes a 3-stage technical deep dive and values check.',
      icon: <SearchCheck className="text-[#0B57D0]" />,
      color: 'bg-indigo-50'
    },
    {
      title: 'Hiring Support',
      description: 'Interview scheduling, offer management, and onboarding assistance.',
      extraDetails: 'We manage documentation and 30-day check-ins for long-term retention.',
      icon: <UserPlus className="text-[#0B57D0]" />,
      color: 'bg-sky-50'
    }
  ];

  return (
    <section className="h-auto lg:h-screen lg:max-h-[900px] py-16 lg:py-0 bg-white flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        
        {/* --- HEADER --- */}
        <div className="max-w-3xl mb-8 lg:mb-12"> 
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/80 text-slate-500 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest mb-4 shadow-sm w-fit"
            >
              <Zap size={12} className="text-[#0B57D0] mr-1" /> 
               Tailored Solutions
            </motion.div>
          
          <h2 className="text-2xl md:text-3xl lg:text-[2.6rem] font-black text-[#071952] tracking-tight mb-3 leading-[1.1]">
            Recruitment Solutions<span className="text-[#0B57D0]"> Built for Growing Teams</span>
          </h2>
          <p className="text-sm md:text-base lg:text-[1.05rem] text-slate-500 font-medium max-w-2xl leading-relaxed">
            Whether you’re hiring one key employee or building an entire team, we provide end-to-end recruitment support.
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 mb-10 lg:mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 lg:p-8 rounded-[28px] bg-[#071952] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-xl lg:text-2xl font-bold text-white mb-1">Ready to grow your team?</h4>
            <p className="text-slate-300 font-medium text-xs lg:text-sm">Schedule a discovery call with our experts today.</p>
          </div>

          <button className="relative z-10 w-full md:w-auto px-8 py-3.5 bg-[#0B57D0] text-white text-[13px] lg:text-[14px] font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
            Get Started Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;