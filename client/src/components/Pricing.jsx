
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Check, ArrowRight, Zap, Sparkles, Building2, Globe, Clock, UserCheck, Layout } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Pricing = () => {
//   const plans = [
//     {
//       name: "Starter",
//       price: "10%",
//       subtext: "Success Fee",
//       description: "Perfect for startups and small businesses hiring critical roles.",
//       features: ["Candidate sourcing", " Pre-screened profiles", "Interview coordination", " Reference checks"," 90-day replacement guarantee"],
//       cta: "Start Hiring",
//       highlight: false,
//       icon: <Zap size={18} className="text-[#0B57D0]" />
//     },
//     {
//       name: "Growth",
//       price: "15%",
//       subtext: "Success Fee",
//       description: "Designed for growing companies that need quality talent faster.",
//       features: ["Priority candidate delivery","Technical & behavioral screening","Dedicated account manager","Interview scheduling support","120-day replacement guarantee"],
//       cta: "Scale Your Team",
//       highlight: true,
//       icon: <Sparkles size={18} className="text-white" />
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       subtext: "monthly fee",
//       description: "A dedicated recruitment partner for large-scale hiring needs.",
//       features: ["Embedded recruiting support", "Full-cycle recruitment management", "Employer branding assistance", "Multiple role hiring", "Dedicated hiring team"],
//       cta: "Talk to Sales",
//       highlight: false,
//       icon: <Building2 size={18} className="text-[#0B57D0]" />
//     }
//   ];

//   const benefits = [
//     {
//       title: "Pay only for success",
//       desc: "No upfront retainers. You only pay when your ideal candidate signs the offer.",
//       icon: <Check className="text-[#0B57D0]" size={20} />
//     },
//     {
//       title: "Global Talent Reach",
//       desc: "Access to top-tier talent across India and major global tech hubs.",
//       icon: <Globe className="text-[#0B57D0]" size={20} />
//     },
//     {
//       title: "Speed to Hire",
//       desc: "Our streamlined process reduces time-to-fill by up to 40%.",
//       icon: <Clock className="text-[#0B57D0]" size={20} />
//     },
//     {
//       title: "Dedicated Support",
//       desc: "Expert recruiters who understand your culture and technical needs.",
//       icon: <UserCheck className="text-[#0B57D0]" size={20} />
//     },
//     {
//       title: "Flexible Models",
//       desc: "Scalable recruitment solutions that grow alongside your business.",
//       icon: <Layout className="text-[#0B57D0]" size={20} />
//     }
//   ];

//   return (
//     <section className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
//       <div className="container mx-auto px-8 lg:px-12">
        
//         {/* --- PRICING HEADER --- */}
//         <div className="max-w-3xl mb-12">
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-[0.15em] mb-3 shadow-sm"
//           >
//             <Zap size={10} className="text-[#0B57D0]" />
//             Simple, Transparent Recruitment Pricing
//           </motion.div>
          

//           <h2 className="text-3xl lg:text-[36px] font-black text-[#071952] tracking-tight mb-1 leading-tight">
//             Pay only when you successfully hire. <span className="text-[#0B57D0]"><br></br>No retainers. No hidden fees.</span>
//           </h2>
//           <p className="text-sm lg:text-[15px] text-slate-500 font-medium">
//             Whether you’re hiring your first employee or scaling an entire team, we have a solution that fits.
//           </p>
//         </div>

//         {/* --- PRICING GRID --- */}
//       <div className="grid lg:grid-cols-3 gap-6 mb-20">
//   {plans.map((plan, index) => (
//     <motion.div
//       key={plan.name}
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       /* 1. Changed p-7 to px-7 py-5 (Keeps horizontal width, reduces vertical height) */
//       className={`relative px-7 py-5 rounded-[28px] border flex flex-col transition-all duration-300 ${
//         plan.highlight 
//           ? 'bg-[#071952] border-[#071952] text-white shadow-xl lg:scale-105 z-10' 
//           : 'bg-white border-slate-100 text-[#071952] shadow-sm hover:shadow-md'
//       }`}
//     >
//       {plan.highlight && (
//         <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#0B57D0] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
//           Popular
//         </div>
//       )}

//       <div className="flex-grow">
//         {/* 2. Reduced mb-5 to mb-3 */}
//         <div className="flex items-center justify-between mb-3">
//           <div className={`p-2.5 rounded-xl ${plan.highlight ? 'bg-white/10' : 'bg-blue-50'}`}>
//             {plan.icon}
//           </div>
//           <span className={`text-[10px] font-black uppercase tracking-wider ${plan.highlight ? 'text-blue-300' : 'text-slate-400'}`}>
//             {plan.name}
//           </span>
//         </div>

//         {/* 3. Reduced mb-3 to mb-1 */}
//         <div className="mb-1">
//           <span className="text-4xl lg:text-5xl font-black tracking-tighter">{plan.price}</span>
//           <p className={`text-[11px] font-medium ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
//             {plan.subtext}
//           </p>
//         </div>

//         {/* 4. Reduced mb-5 to mb-3 */}
//         <p className={`mb-3 text-[13px] lg:text-[14px] leading-snug font-medium ${plan.highlight ? 'text-slate-200' : 'text-slate-500'}`}>
//           {plan.description}
//         </p>

//         {/* 5. Reduced mb-5 to mb-3 */}
//         <hr className={`mb-3 ${plan.highlight ? 'border-white/10' : 'border-slate-100'}`} />

//         {/* 6. Reduced space-y-3 to space-y-2 and mb-6 to mb-4 */}
//         <ul className="space-y-2 mb-4">
//           {plan.features.map((feature) => (
//             <li key={feature} className="flex items-center gap-2.5 text-[13px] font-semibold">
//               <Check size={16} className={plan.highlight ? "text-blue-400" : "text-[#0B57D0]"} />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <Link 
//         to="/contact"
//         /* 7. Reduced py-3 to py-2.5 */
//         className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl font-bold text-[13px] transition-all active:scale-95 ${
//           plan.highlight 
//             ? 'bg-[#0B57D0] text-white hover:bg-blue-500 shadow-lg' 
//             : 'bg-[#F8FAFC] text-[#071952] hover:bg-slate-100 border border-slate-200 shadow-sm'
//         }`}
//       >
//         {plan.cta}
//         <ArrowRight size={14} />
//       </Link>
//     </motion.div>
//   ))}
// </div>

//         {/* --- WHY CHOOSE US SECTION --- */}
//         <div className="pt-20 border-t border-slate-200">
//           <div className="text-center mb-12">
//             <h3 className="text-2xl lg:text-3xl font-black text-[#071952] mb-4">
//               Why Clients Choose Hirings
//             </h3>
//             <div className="h-1 w-20 bg-[#0B57D0] mx-auto rounded-full"></div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {benefits.map((benefit, idx) => (
//               <motion.div 
//                 key={idx}
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors"
//               >
//                 <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
//                   {benefit.icon}
//                 </div>
//                 <h4 className="text-[15px] font-black text-[#071952] mb-2 uppercase tracking-tight">
//                   {benefit.title}
//                 </h4>
//                 <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
//                   {benefit.desc}
//                 </p>
//               </motion.div>
//             ))}
            
//             {/* Custom Quote Box */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="bg-[#0B57D0] p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center text-white"
//             >
//               <h4 className="text-lg font-black mb-2">Need a custom quote?</h4>
//               <p className="text-[12px] text-blue-100 mb-4 font-medium">We design specific models for high-volume hiring.</p>
//               <Link to="/contact" className="bg-white text-[#0B57D0] px-6 py-2 rounded-xl font-bold text-[12px] hover:bg-blue-50 transition-colors">
//                 Talk to us
//               </Link>
//             </motion.div>
//           </div>
//         </div>

     

//       </div>
//     </section>
//   );
// };

// export default Pricing;





import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  Rocket, // Replaced Sparkles with Rocket
  Building2, 
  Globe, 
  Clock, 
  UserCheck, 
  Layout 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "10%",
      subtext: "Success Fee",
      description: "Perfect for startups and small businesses hiring critical roles.",
      features: ["Candidate sourcing", " Pre-screened profiles", "Interview coordination", " Reference checks"," 90-day replacement guarantee"],
      cta: "Start Hiring",
      highlight: false,
      icon: <Zap size={18} className="text-[#0B57D0]" />
    },
    {
      name: "Growth",
      price: "15%",
      subtext: "Success Fee",
      description: "Designed for growing companies that need quality talent faster.",
      features: ["Priority candidate delivery","Technical & behavioral screening","Dedicated account manager","Interview scheduling support","120-day replacement guarantee"],
      cta: "Scale Your Team",
      highlight: true,
      // Icon updated to Rocket
      icon: <Rocket size={18} className="text-white" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      subtext: "monthly fee",
      description: "A dedicated recruitment partner for large-scale hiring needs.",
      features: ["Embedded recruiting support", "Full-cycle recruitment management", "Employer branding assistance", "Multiple role hiring", "Dedicated hiring team"],
      cta: "Talk to Sales",
      highlight: false,
      icon: <Building2 size={18} className="text-[#0B57D0]" />
    }
  ];

  const benefits = [
    {
      title: "Pay only for success",
      desc: "No upfront retainers. You only pay when your ideal candidate signs the offer.",
      icon: <Check className="text-[#0B57D0]" size={20} />
    },
    {
      title: "Global Talent Reach",
      desc: "Access to top-tier talent across India and major global tech hubs.",
      icon: <Globe className="text-[#0B57D0]" size={20} />
    },
    {
      title: "Speed to Hire",
      desc: "Our streamlined process reduces time-to-fill by up to 40%.",
      icon: <Clock className="text-[#0B57D0]" size={20} />
    },
    {
      title: "Dedicated Support",
      desc: "Expert recruiters who understand your culture and technical needs.",
      icon: <UserCheck className="text-[#0B57D0]" size={20} />
    },
    {
      title: "Flexible Models",
      desc: "Scalable recruitment solutions that grow alongside your business.",
      icon: <Layout className="text-[#0B57D0]" size={20} />
    }
  ];

  return (
    <section className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="container mx-auto px-8 lg:px-12">
        
        {/* --- PRICING HEADER --- */}
        <div className="max-w-3xl mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-[0.15em] mb-3 shadow-sm"
          >
            <Zap size={10} className="text-[#0B57D0]" />
            Simple, Transparent Recruitment Pricing
          </motion.div>
          

          <h2 className="text-3xl lg:text-[36px] font-black text-[#071952] tracking-tight mb-1 leading-tight">
            Pay only when you successfully hire. <span className="text-[#0B57D0]"><br></br>No retainers. No hidden fees.</span>
          </h2>
          <p className="text-sm lg:text-[15px] text-slate-500 font-medium">
            Whether you’re hiring your first employee or scaling an entire team, we have a solution that fits.
          </p>
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative px-7 py-5 rounded-[28px] border flex flex-col transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-[#071952] border-[#071952] text-white shadow-xl lg:scale-105 z-10' 
                  : 'bg-white border-slate-100 text-[#071952] shadow-sm hover:shadow-md'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#0B57D0] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Popular
                </div>
              )}

              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${plan.highlight ? 'bg-white/10' : 'bg-blue-50'}`}>
                    {plan.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${plan.highlight ? 'text-blue-300' : 'text-slate-400'}`}>
                    {plan.name}
                  </span>
                </div>

                <div className="mb-1">
                  <span className="text-4xl lg:text-5xl font-black tracking-tighter">{plan.price}</span>
                  <p className={`text-[11px] font-medium ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.subtext}
                  </p>
                </div>

                <p className={`mb-3 text-[13px] lg:text-[14px] leading-snug font-medium ${plan.highlight ? 'text-slate-200' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <hr className={`mb-3 ${plan.highlight ? 'border-white/10' : 'border-slate-100'}`} />

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[13px] font-semibold">
                      <Check size={16} className={plan.highlight ? "text-blue-400" : "text-[#0B57D0]"} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/contact"
                className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl font-bold text-[13px] transition-all active:scale-95 ${
                  plan.highlight 
                    ? 'bg-[#0B57D0] text-white hover:bg-blue-500 shadow-lg' 
                    : 'bg-[#F8FAFC] text-[#071952] hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- WHY CHOOSE US SECTION --- */}
        <div className="pt-20 border-t border-slate-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-black text-[#071952] mb-4">
              Why Clients Choose Hirings
            </h3>
            <div className="h-1 w-20 bg-[#0B57D0] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-[15px] font-black text-[#071952] mb-2 uppercase tracking-tight">
                  {benefit.title}
                </h4>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
            
            {/* Custom Quote Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#0B57D0] p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center text-white"
            >
              <h4 className="text-lg font-black mb-2">Need a custom quote?</h4>
              <p className="text-[12px] text-blue-100 mb-4 font-medium">We design specific models for high-volume hiring.</p>
              <Link to="/contact" className="bg-white text-[#0B57D0] px-6 py-2 rounded-xl font-bold text-[12px] hover:bg-blue-50 transition-colors">
                Talk to us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;