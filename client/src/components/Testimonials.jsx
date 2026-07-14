

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Star, Sparkles } from 'lucide-react';

// const Testimonials = () => {
//   const reviews = [
//     {
//       name: "Alex Rivera",
//       role: "CTO @ TechFlow",
//       content: "They delivered three senior engineers in under 15 days. Their screening process is the best we've seen.",
//       image: "https://i.pravatar.cc/100?img=12"
//     },
//     {
//       name: "Sarah Chen",
//       role: "Founder @ Nexa",
//       content: "As a seed-stage startup, we needed quality over quantity. Hirings found us the perfect lead designer.",
//       image: "https://i.pravatar.cc/100?img=45"
//     },
//     {
//       name: "James Wilson",
//       role: "VP Eng @ SolarScale",
//       content: "No retainers, no hidden fees. Just high-quality candidates ready to interview. Exactly what we needed.",
//       image: "https://i.pravatar.cc/100?img=33"
//     },
//     {
//       name: "Michael K.",
//       role: "Head of Talent @ Velo",
//       content: "The most structured recruiting experience I've ever had. Predictable, fast, and high-signal.",
//       image: "https://i.pravatar.cc/100?img=11"
//     },
//     {
//       name: "Elena Rossi",
//       role: "COO @ Prisma",
//       content: "They understand startup DNA. We didn't have to explain our culture twice. Highly recommended.",
//       image: "https://i.pravatar.cc/100?img=22"
//     }
//   ];

//   // Double the items for seamless infinite scroll
//   const marqueeItems = [...reviews, ...reviews];

//   return (
//     <section className="py-16 bg-white overflow-hidden border-t border-slate-50">
//       <div className="container mx-auto px-8 lg:px-12 mb-12">
        
//         {/* --- HEADER (Matching Marquee Reference Layout but in White) --- */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
//           <div>
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="flex items-center gap-2 text-[#0B57D0] text-[9px] font-black uppercase tracking-[0.3em] mb-3"
//             >
//               <Sparkles size={12} />
//               Wall of Love
//             </motion.div>
//             <h2 className="text-4xl lg:text-5xl font-black text-[#071952] tracking-tighter uppercase">
//               What Founders <span className="text-slate-200">Say</span>
//             </h2>
//           </div>
          
//           <p className="text-slate-400 font-bold text-[11px] max-w-[240px] leading-relaxed uppercase tracking-widest">
//             A curated stream of feedback from engineering leaders.
//           </p>
//         </div>
//       </div>

//       {/* --- INFINITE MARQUEE --- */}
//       <div className="relative flex pointer-events-none group">
//         <motion.div 
//           className="flex gap-6 whitespace-nowrap pointer-events-auto"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ 
//             duration: 40, 
//             repeat: Infinity, 
//             ease: "linear" 
//           }}
//           whileHover={{ animationPlayState: "paused" }}
//         >
//           {marqueeItems.map((review, index) => (
//             <div
//               key={index}
//               className="w-[300px] md:w-[380px] flex-shrink-0 p-6 rounded-[24px] border border-slate-100 bg-slate-50/30 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 group/card"
//             >
//               {/* Star Rating (Smaller) */}
//               <div className="flex gap-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} size={10} className="fill-[#0B57D0] text-[#0B57D0]" />
//                 ))}
//               </div>

//               {/* Quote Text (Decreased font size to 14px) */}
//               <p className="text-[#4B5563] text-[14px] leading-relaxed mb-6 font-medium whitespace-normal">
//                 "{review.content}"
//               </p>

//               {/* Author Info */}
//               <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-auto">
//                 <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
//                   <img src={review.image} alt={review.name} className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all" />
//                 </div>
//                 <div>
//                   <h4 className="text-[13px] font-bold text-[#071952] tracking-tight">{review.name}</h4>
//                   <p className="text-[10px] font-bold text-[#0B57D0] uppercase tracking-widest">
//                     {review.role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* --- Edge Fades to White --- */}
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
//       </div>
//     </section>
//   );
// };

// export default Testimonials;



import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles,Zap } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "David Miller",
      role: "CEO @ FinTech Solutions",
      content: "Hirings helped us close key positions faster than any recruitment partner we’ve worked with.",
      image: "https://i.pravatar.cc/100?img=12"
    },
    {
      name: "Sarah Chen",
      role: "CTO @ CloudStream",
      content: "We received qualified candidates within days instead of weeks. Their speed is unmatched.",
      image: "https://i.pravatar.cc/100?img=45"
    },
    {
      name: "Marcus Thorne",
      role: "Founder @ AI Labs",
      content: "Their screening process saved our team significant interview time. We only met top-tier talent.",
      image: "https://i.pravatar.cc/100?img=33"
    },
    {
      name: "Elena Rossi",
      role: "COO @ Prisma Tech",
      content: "The most structured recruiting experience I've ever had. Predictable, fast, and high-signal.",
      image: "https://i.pravatar.cc/100?img=22"
    },
    {
      name: "Michael K.",
      role: "Head of Talent @ Nexa",
      content: "A recruitment partner that actually understands the urgency of early-stage scaling.",
      image: "https://i.pravatar.cc/100?img=11"
    }
  ];

  // Double the items for seamless infinite scroll
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-slate-50">
      <div className="container mx-auto px-8 lg:px-12 mb-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-[#0B57D0] text-[9px] font-black uppercase tracking-[0.3em] mb-3"
            >
              <Zap size={12} />
              Success Stories
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-black text-[#071952] tracking-tighter uppercase leading-tight">
              Trusted by Growing <span className="text-slate-200">Businesses Worldwide</span>
            </h2>
          </div>
          
          <p className="text-slate-400 font-bold text-[11px] max-w-[240px] leading-relaxed uppercase tracking-widest">
            Delivering high-quality talent to industry leaders and fast-growing startups.
          </p>
        </div>
      </div>

      {/* --- INFINITE MARQUEE --- */}
      <div className="relative flex pointer-events-none group">
        <motion.div 
          className="flex gap-6 whitespace-nowrap pointer-events-auto"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {marqueeItems.map((review, index) => (
            <div
              key={index}
              className="w-[300px] md:w-[380px] flex-shrink-0 p-8 rounded-[32px] border border-slate-100 bg-slate-50/40 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 group/card"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-[#0B57D0] text-[#0B57D0]" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-[#4B5563] text-[14px] leading-relaxed mb-8 font-medium whitespace-normal">
                "{review.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 border-t border-slate-100 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#071952] tracking-tight">{review.name}</h4>
                  <p className="text-[10px] font-bold text-[#0B57D0] uppercase tracking-widest">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* --- Edge Fades --- */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default Testimonials;