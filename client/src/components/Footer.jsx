

// import React from 'react';
// import { Link } from 'react-router-dom';

// // --- Icons ---
// const InstagramOutlined = ({ size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//   </svg>
// );

// const LinkedinOutlined = ({ size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//     <rect x="2" y="9" width="4" height="12"></rect>
//     <circle cx="4" cy="4" r="2"></circle>
//   </svg>
// );

// const MailOutlined = ({ size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//     <polyline points="22,6 12,13 2,6"></polyline>
//   </svg>
// );

// const PhoneOutlined = ({ size = 18 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//   </svg>
// );

// const ZapIcon = ({ size = 14 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"></path>
//   </svg>
// );

// const Footer = () => {
//   return (
//     <footer className="bg-[#050B2C] text-white pt-16 pb-10 relative font-sans">
//       <div className="container mx-auto px-8 lg:px-12">
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
//           {/* 1. ABOUT COLUMN */}
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center gap-2 mb-2">
//               {/* <span className="text-2xl font-black tracking-wider uppercase text-white">Hirings</span> */}
//                  <img src="/blueLogo.png" alt="Hirings Logo" className="h-22 w-58" />
//             </div>
//             <p className="text-gray-400 text-[13px] leading-relaxed">
//               Hirings is a recruitment partner helping startups, SMEs, and enterprises hire top talent across Technology, Sales, Marketing, Operations, and Leadership roles.
//             </p>
//             <p className="text-[#0B57D0] text-[13px] font-bold italic">
//               "Building teams that build great companies."
//             </p>
            
//             <div className="flex gap-4 mt-2">
//               <a href="#" className="text-white/60 hover:text-white transition-colors"><InstagramOutlined size={20} /></a>
//               <a href="#" className="text-white/60 hover:text-white transition-colors"><LinkedinOutlined size={20} /></a>
//               <a href="mailto:info@hirings.in" className="text-white/60 hover:text-white transition-colors"><MailOutlined size={20} /></a>
//             </div>
//           </div>

//           {/* 2. QUICK LINKS */}
//           <div className="flex flex-col lg:pl-10">
//             <h4 className="text-white text-[14px] font-black uppercase tracking-widest mb-6">Quick Links</h4>
//             <ul className="space-y-3">
//               <li><Link to="/work" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">How It Works</Link></li>
//               <li><Link to="/pricing" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Pricing</Link></li>
//               <li><Link to="/services" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Solutions</Link></li>
//               <li><Link to="/submit-resume" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Talent Portal</Link></li>
//               {/* <li><Link to="/contact" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Partner With Us</Link></li> */}
//               <li><Link to="/contact" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* 3. SERVICE AREAS */}
//      <div className="flex flex-col lg:pl-5">
//   <h4 className="text-white text-[14px] font-black uppercase tracking-widest mb-6">Service Areas</h4>
//   <div className="grid grid-cols-2 gap-x-4 gap-y-4">
//     {[
//       { name: "India", code: "in" },
//       { name: "USA", code: "us" },
//       { name: "Canada", code: "ca" },
//       { name: "UK", code: "gb" },
//       { name: "UAE", code: "ae" },
//       { name: "Singapore", code: "sg" }
//     ].map((country) => (
//       <div key={country.name} className="flex items-center gap-3 group">
//         {/* Circular Flag Wrapper */}
//         <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-sm transition-transform group-hover:scale-110">
//           <img 
//             src={`https://flagcdn.com/w40/${country.code}.png`} 
//             alt={country.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <span className="text-gray-400 text-[14px] font-medium group-hover:text-white transition-colors">
//           {country.name}
//         </span>
//       </div>
//     ))}
//   </div>
// </div>

//           {/* 4. CONTACT */}
//           <div className="flex flex-col">
//             <h4 className="text-white text-[14px] font-black uppercase tracking-widest mb-6">Contact</h4>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <MailOutlined size={18} className="text-blue-500 mt-0.5" />
//                 <div>
//                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Email Us</p>
//                     <a href="mailto:info@hirings.in" className="text-gray-300 text-[14px] font-medium hover:text-white transition-colors">info@hirings.in</a>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <PhoneOutlined size={18} className="text-blue-500 mt-0.5" />
//                 <div>
//                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Call Us</p>
//                     <a href="tel:+919038045666" className="text-gray-300 text-[14px] font-medium hover:text-white transition-colors">+91 9038045666</a>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* --- BOTTOM BAR --- */}
//         <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-gray-500 text-[12px] font-medium">
//             © {new Date().getFullYear()} Hirings.in. Connecting exceptional talent with ambitious businesses worldwide.
//           </p>
          
//           <div className="flex items-center gap-3">
//             <span className="text-gray-600 text-[11px] font-bold uppercase tracking-widest">Powered By</span>
//             <div className="flex items-center gap-1 text-white font-black tracking-tighter hover:text-blue-400 transition-colors cursor-pointer">
//               <ZapIcon size={14} />
//               <span className="text-[12px] uppercase">Zeusdesk</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- FLOATING WHATSAPP BUTTON --- */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <a 
//           href="https://wa.me/919038045666" 
//           target="_blank" 
//           rel="noreferrer"
//           className="bg-[#25D366] w-14 h-14 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
//           aria-label="Chat on WhatsApp"
//         >
//           <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.555 4.197 1.607 6.02L0 24l6.163-1.617a12.007 12.007 0 005.883 1.532h.005c6.637 0 12.05-5.414 12.05-12.05a11.829 11.829 0 00-3.483-8.414z"/>
//           </svg>
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import { Link } from 'react-router-dom';

// --- Icons ---
const InstagramOutlined = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinOutlined = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const MailOutlined = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneOutlined = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const ZapIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#050B2C] text-white pt-16 pb-10 relative font-sans">
      <div className="container mx-auto px-8 lg:px-12">
        
        {/* Main Grid: items-start ensures everything aligns to the top of the row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start mb-16">
          
          {/* 1. ABOUT COLUMN */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6"> {/* Margin-bottom 6 matches h4 margin-bottom 6 for alignment */}
                 <img src="/blueLogo.png" alt="Hirings Logo" className="h-18 w-52" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-400 text-[13px] leading-relaxed">
                Hirings is a recruitment partner helping startups, SMEs, and enterprises hire top talent across Technology, Sales, Marketing, Operations, and Leadership roles.
              </p>
              <p className="text-[#0B57D0] text-[13px] font-bold italic">
                "Building teams that build great companies."
              </p>
              
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-white/60 hover:text-white transition-colors"><InstagramOutlined size={20} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><LinkedinOutlined size={20} /></a>
                <a href="mailto:info@hirings.in" className="text-white/60 hover:text-white transition-colors"><MailOutlined size={20} /></a>
              </div>
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div className="flex flex-col lg:pl-10">
            <h4 className="text-white text-[14px] font-black uppercase tracking-widest mb-6 h-10 flex items-center">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/work" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link to="/services" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Solutions</Link></li>
              <li><Link to="/submit-resume" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Talent Portal</Link></li>
              <li><Link to="/contact" className="text-gray-400 text-[14px] hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. SERVICE AREAS */}
          <div className="flex flex-col lg:pl-5">
            <h4 className="text-white text-[14px] font-black uppercase tracking-widest mb-6 h-10 flex items-center">Service Areas</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                { name: "India", code: "in" },
                { name: "USA", code: "us" },
                { name: "Canada", code: "ca" },
                { name: "UK", code: "gb" },
                { name: "UAE", code: "ae" },
                { name: "Singapore", code: "sg" }
              ].map((country) => (
                <div key={country.name} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-sm transition-transform group-hover:scale-110">
                    <img 
                      src={`https://flagcdn.com/w40/${country.code}.png`} 
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-400 text-[14px] font-medium group-hover:text-white transition-colors">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. CONTACT */}
          <div className="flex flex-col">
            <h4 className="text-white text-[14px] font-black uppercase tracking-widest mb-6 h-10 flex items-center">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MailOutlined size={18} className="text-blue-500 mt-0.5" />
                <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Email Us</p>
                    <a href="mailto:info@hirings.in" className="text-gray-300 text-[14px] font-medium hover:text-white transition-colors">info@hirings.in</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PhoneOutlined size={18} className="text-blue-500 mt-0.5" />
                <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Call Us</p>
                    <a href="tel:+919038045666" className="text-gray-300 text-[14px] font-medium hover:text-white transition-colors">+91 9038045666</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
       <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
  <p className="text-gray-500 text-[12px] font-medium text-center md:text-left">
    © {new Date().getFullYear()} Hirings.in. Build and Design by Team <span className="text-white font-bold tracking-wide">Asthra</span>.
  </p>
          
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-[11px] font-bold uppercase tracking-widest">Powered By</span>
            <div className="flex items-center gap-1 text-white font-black tracking-tighter hover:text-blue-400 transition-colors cursor-pointer">
              <ZapIcon size={14} />
              <span className="text-[12px] uppercase">Zeusdesk</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/919038045666" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] w-14 h-14 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.555 4.197 1.607 6.02L0 24l6.163-1.617a12.007 12.007 0 005.883 1.532h.005c6.637 0 12.05-5.414 12.05-12.05a11.829 11.829 0 00-3.483-8.414z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;