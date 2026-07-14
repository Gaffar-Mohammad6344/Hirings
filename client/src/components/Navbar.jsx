// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ArrowRight, Briefcase, Users } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
 
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
 
//   // Handle scroll for glassmorphism effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
 
//   const navLinks = [
//     { name: 'How We Work', path: '/work' },
//     { name: 'Pricing', path: '/pricing' },
//     { name: 'Solutions', path: '/services' },
//   ];
 
//   return (
// <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
//       scrolled 
//         ? 'bg-white/80 backdrop-blur-xl py-2 border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
//         : 'bg-white py-4 border-b border-transparent'
//     }`}>
// <div className="container mx-auto px-8 flex justify-between items-center">
//         {/* --- BRAND LOGO --- */}
// <Link to="/" className="flex items-center group">
// <span className="text-2xl font-black text-[#111827] tracking-tighter transition-transform duration-300 group-hover:scale-105">
//             Hirings
// </span>
// </Link>
 
//         {/* --- CENTERED NAVIGATION --- */}
// <div className="hidden lg:flex items-center gap-10">
//           {navLinks.map((link) => (
// <Link
//               key={link.name}
//               to={link.path}
//               className={`relative py-1 text-[14px] font-bold tracking-tight transition-all duration-300 group ${
//                 location.pathname === link.path ? 'text-[#0B57D0]' : 'text-[#4B5563]'
//               }`}
// >
// <span className="relative z-10 group-hover:text-[#0B57D0] transition-colors duration-300">
//                 {link.name}
// </span>
//               {/* Premium Underline */}
// <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#0B57D0] rounded-full transition-all duration-500 ease-out ${
//                 location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
//               }`} />
// </Link>
//           ))}
// </div>
 
//         {/* --- RIGHT ACTIONS (Primary & Secondary) --- */}
// <div className="hidden lg:flex items-center gap-4">
//           {/* Secondary Button (Candidate Path) */}
// <Link 
//             to="/submit-resume"
//             className="px-5 py-2 bg-white text-[#071952] border border-slate-200 text-[13px] font-bold rounded-xl hover:border-[#0B57D0] hover:bg-slate-50 transition-all flex items-center gap-2 group active:scale-95 shadow-sm"
// >
// <Briefcase size={14} className="text-[#0B57D0] group-hover:rotate-12 transition-transform" />
//             Explore Opportunities
// </Link>
 
//           {/* Primary Button (Employer Path) */}
// <Link 
//             to="/contact"
//             className="px-6 py-2 bg-[#071952] text-white text-[13px] font-bold rounded-xl flex items-center gap-2 group transition-all duration-300 hover:bg-[#0B57D0] hover:shadow-[0_10px_20px_rgba(11,87,208,0.15)] active:scale-95"
// >
// <Users size={14} />
//             Partner With Us
// <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
// </Link>
// </div>
 
//         {/* --- MOBILE TOGGLE --- */}
// <button 
//           className="lg:hidden p-2 bg-slate-50 text-[#111827] rounded-xl hover:bg-slate-100 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
// >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
// </button>
// </div>
 
//       {/* --- MOBILE MENU --- */}
// <AnimatePresence>
//         {isOpen && (
// <motion.div 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
// >
// <div className="p-8 flex flex-col gap-6">
//               {navLinks.map((link) => (
// <Link
//                   key={link.name}
//                   to={link.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`text-lg font-bold transition-colors ${
//                     location.pathname === link.path ? 'text-[#0B57D0]' : 'text-[#111827] hover:text-[#0B57D0]'
//                   }`}
// >
//                   {link.name}
// </Link>
//               ))}
// <hr className="border-slate-100" />
// <div className="flex flex-col gap-3">
// <Link 
//                   to="/submit-resume"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full py-4 bg-white text-[#071952] border border-slate-200 text-center font-bold rounded-2xl"
// >
//                   Explore Opportunities
// </Link>
// <Link 
//                   to="/contact"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full py-4 bg-[#071952] text-white text-center font-bold rounded-2xl shadow-lg"
// >
//                   Partner With Us
// </Link>
// </div>
// </div>
// </motion.div>
//         )}
// </AnimatePresence>
// </nav>
//   );
// };
 
// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Briefcase, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
 
  // Handle scroll for glassmorphism and shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  const navLinks = [
    { name: 'How We Work', path: '/work' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Solutions', path: '/services' },
  ];
 
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl py-2 border-b border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)]' 
        : 'bg-white py-4 border-b border-transparent shadow-sm'
    }`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        {/* --- BRAND LOGO --- */}
        <Link to="/" className="flex items-center group">
          {/* <span className="text-2xl font-black text-[#111827] tracking-tighter transition-transform duration-300 group-hover:scale-105">
            Hirings
          </span> */}
          <img src="/Hirings.jpeg" alt="Hirings Logo" className="h-14 w-44" />
        </Link>
 
        {/* --- CENTERED NAVIGATION --- */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative py-1 text-[14px] font-bold tracking-tight transition-all duration-300 group ${
                location.pathname === link.path ? 'text-[#0B57D0]' : 'text-[#4B5563]'
              }`}
            >
              <span className="relative z-10 group-hover:text-[#0B57D0] transition-colors duration-300">
                {link.name}
              </span>
              {/* Premium Underline */}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#0B57D0] rounded-full transition-all duration-500 ease-out ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>
 
        {/* --- RIGHT ACTIONS (Primary & Secondary) --- */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Secondary Button (Candidate Path) */}
          <Link 
            to="/submit-resume"
            className="px-5 py-2 bg-white text-[#071952] border border-slate-200 text-[13px] font-bold rounded-xl hover:border-[#0B57D0] hover:bg-slate-50 transition-all flex items-center gap-2 group active:scale-95 shadow-sm"
          >
            <Briefcase size={14} className="text-[#0B57D0] group-hover:rotate-12 transition-transform" />
            Explore Opportunities
          </Link>
 
          {/* Primary Button (Employer Path) */}
          <Link 
            to="/contact"
            className="px-6 py-2 bg-[#071952] text-white text-[13px] font-bold rounded-xl flex items-center gap-2 group transition-all duration-300 hover:bg-[#0B57D0] hover:shadow-[0_10px_20px_rgba(11,87,208,0.15)] active:scale-95"
          >
            <Users size={14} />
          Hire Talent
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
 
        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="lg:hidden p-2 bg-slate-50 text-[#111827] rounded-xl hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
 
      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold transition-colors ${
                    location.pathname === link.path ? 'text-[#0B57D0]' : 'text-[#111827] hover:text-[#0B57D0]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-3">
                <Link 
                  to="/submit-resume"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-white text-[#071952] border border-slate-200 text-center font-bold rounded-2xl"
                >
                  Explore Opportunities
                </Link>
                <Link 
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-[#071952] text-white text-center font-bold rounded-2xl shadow-lg"
                >
                  Hire Talent
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
 
export default Navbar;