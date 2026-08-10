

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { 
//   LayoutDashboard, Users, LogOut, FileText, Download,
//   Clock, Star, Mic, XCircle, Trophy, Trash2, ArrowUpDown, AlertTriangle, 
//   Shield, ChevronDown, Handshake
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//   const [stats, setStats] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [adminName, setAdminName] = useState('Admin');
//   const [adminRank, setAdminRank] = useState('1'); 
  
//   const navigate = useNavigate();

//   // Sorting & Modals
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [showModal, setShowModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [deleteType, setDeleteType] = useState('candidate');

//   // --- 1. AUTOMATIC LOGOUT LOGIC (10 MINUTES) ---
//   const handleLogout = useCallback(() => {
//     localStorage.clear();
//     toast.info("Session expired due to inactivity");
//     navigate('/login');
//   }, [navigate]);

//   useEffect(() => {
//     let logoutTimer;
//     const INACTIVITY_TIME = 10 * 60 * 1000; // 10 Minutes

//     const resetTimer = () => {
//       if (logoutTimer) clearTimeout(logoutTimer);
//       logoutTimer = setTimeout(() => {
//         handleLogout();
//       }, INACTIVITY_TIME);
//     };

//     // Events to track user activity
//     const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

//     // Add listeners
//     events.forEach(event => window.addEventListener(event, resetTimer));

//     // Initialize timer
//     resetTimer();

//     // Cleanup function
//     return () => {
//       if (logoutTimer) clearTimeout(logoutTimer);
//       events.forEach(event => window.removeEventListener(event, resetTimer));
//     };
//   }, [handleLogout]);

//   // --- 2. DATA FETCHING ---
//   useEffect(() => {
//     fetchDashboardData();
//     setAdminName(localStorage.getItem("adminName") || 'Admin');
//     setAdminRank(localStorage.getItem("adminRank") || '1');
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [sRes, cRes, pRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/dashboard/stats'),
//         axios.get('http://localhost:5000/api/candidates'),
//         axios.get('http://localhost:5000/api/contact')
//       ]);
//       setStats(sRes.data);
//       setCandidates(cRes.data);
//       setPartners(Array.isArray(pRes.data) ? pRes.data : []);
//     } catch (e) {
//       console.error("Fetch Error", e);
//       toast.error("Failed to sync dashboard data");
//     }
//     setLoading(false);
//   };

//   // --- 3. HELPER FUNCTIONS ---
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
//     setSortConfig({ key, direction });
//   };

//   const getSortedData = (data) => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         const valA = (a[sortConfig.key] || "").toString().toLowerCase();
//         const valB = (b[sortConfig.key] || "").toString().toLowerCase();
//         if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableItems;
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/candidates/${id}/status`, { status: newStatus });
//       toast.success(`Status updated to ${newStatus}`);
//       fetchDashboardData();
//     } catch (e) { toast.error("Status update failed"); }
//   };

//   const openDeleteModal = (id, type) => {
//     setSelectedId(id);
//     setDeleteType(type);
//     setShowModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedId) return;
//     try {
//       const url = deleteType === 'candidate' 
//         ? `http://localhost:5000/api/candidates/${selectedId}`
//         : `http://localhost:5000/api/contact/${selectedId}`;
      
//       await axios.delete(url);
//       toast.success(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} record deleted`);
//       fetchDashboardData();
//     } catch (e) { 
//         toast.error("Delete failed."); 
//     }
//     setShowModal(false);
//   };

//   const downloadExcel = () => {
//     const data = activeTab === 'Candidates' ? candidates : partners;
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
//     XLSX.writeFile(workbook, `${activeTab}_Report.xlsx`);
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'HIRED': return 'bg-green-50 border-green-200 text-green-700';
//       case 'REJECTED': return 'bg-red-50 border-red-200 text-red-700';
//       case 'INTERVIEW': return 'bg-orange-50 border-orange-200 text-orange-700';
//       case 'SHORTLISTED': return 'bg-blue-50 border-blue-200 text-[#0B57D0]';
//       default: return 'bg-slate-50 border-slate-200 text-slate-600';
//     }
//   };

//   const getIconConfig = (type) => {
//     switch (type) {
//       case 'total': return { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' };
//       case 'pending': return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' };
//       case 'shortlisted': return { icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' };
//       case 'interview': return { icon: Mic, color: 'text-orange-600', bg: 'bg-orange-50' };
//       case 'rejected': return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' };
//       case 'hired': return { icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' };
//       default: return { icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' };
//     }
//   };

//   if (loading) return <div className="h-screen flex items-center justify-center font-black text-[#071952] animate-pulse">LOADING...</div>;

//   return (
//     <div className="h-screen w-full flex flex-col bg-[#F8FAFC] font-sans overflow-hidden">
      
//       {/* DELETE MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center">
//             <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
//             <h2 className="text-xl font-black text-[#071952] mb-2">Confirm Delete?</h2>
//             <p className="text-slate-500 text-sm mb-6">This record will be permanently removed.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600">Cancel</button>
//               <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* NAVBAR */}
//       <nav className="h-[72px] flex-none flex items-center justify-between px-8 bg-white border-b border-slate-100 z-30">
//         <Link to="/" className="text-2xl font-black tracking-tight text-[#071952]">Hirings</Link>
//         <button className="px-6 py-2.5 bg-[#071952] text-white rounded-xl font-bold text-[14px]">Partner With Us</button>
//       </nav>

//       <div className="flex-1 flex overflow-hidden">
//         {/* SIDEBAR */}
//         <aside className="w-64 bg-white border-r border-slate-100 flex flex-col pt-8">
//           <nav className="flex-1 px-4 space-y-2">
//             {[
//               { n: 'Overview', i: LayoutDashboard }, 
//               { n: 'Candidates', i: Users }, 
//               { n: 'Partners', i: Handshake }
//             ].map((t) => (
//               <button key={t.n} onClick={() => {setActiveTab(t.n); setSortConfig({ key: null, direction: 'asc' });}}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
//                   activeTab === t.n ? 'bg-[#071952] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
//                 }`}>
//                 <t.i size={18} /> {t.n}
//               </button>
//             ))}
//           </nav>
//           <div className="p-6 border-t">
//             <button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-2 w-full hover:bg-red-50 p-2 rounded-lg">
//               <LogOut size={18}/> Logout
//             </button>
//           </div>
//         </aside>

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-1 overflow-y-auto p-8 space-y-8">
          
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-black text-[#071952] tracking-tight">{activeTab}</h1>
//               <p className="text-slate-400 font-medium text-sm">Welcome, {adminName}!</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-[20px] flex items-center gap-3 shadow-sm">
//                 <Shield size={20} className="text-[#0B57D0]" />
//                 <div className="leading-none text-right">
//                   <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Rank</p>
//                   <p className="text-[15px] font-black text-[#071952]">Admin {adminRank}</p>
//                 </div>
//               </div>
//               {activeTab !== 'Overview' && (
//                 <button onClick={downloadExcel} className="px-6 py-3.5 bg-[#0B57D0] text-white rounded-xl font-bold text-sm flex items-center gap-2">
//                   <Download size={18} /> Download Excel
//                 </button>
//               )}
//             </div>
//           </div>

//           {activeTab === 'Overview' ? (
//             <>
//               {/* STATS GRID */}
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                 {stats.map((stat, i) => {
//                   const config = getIconConfig(stat.type);
//                   return (
//                     <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
//                       <div className={`w-11 h-11 rounded-xl mb-4 flex items-center justify-center ${config.bg} ${config.color} bg-opacity-20`}>
//                         <config.icon size={22} />
//                       </div>
//                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
//                       <h3 className="text-3xl font-black text-[#071952]">{stat.value}</h3>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* OVERVIEW TABLE (REMOVED ACTIONS COLUMN) */}
//               <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mt-8">
//                 <div className="p-7 border-b border-slate-50 font-black text-[#071952] text-lg">Recent Pipeline Activity</div>
//                 <table className="w-full text-left">
//                   <thead className="bg-[#071952] text-white">
//                     <tr>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Candidate</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Email</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Mobile</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Role</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-50">
//                     {candidates.slice(0, 5).map((c) => (
//                       <tr key={c._id} className="hover:bg-slate-50">
//                         <td className="px-7 py-5 font-bold text-[14px] text-slate-700 uppercase">{c.name}</td>
//                         <td className="px-7 py-5 text-slate-400 text-sm">{c.email}</td>
//                         <td className="px-7 py-5 text-slate-400 text-sm">{c.phone}</td>
//                         <td className="px-7 py-5 text-slate-500 text-sm">{c.role}</td>
//                         <td className="px-7 py-5">
//                           <span className={`text-[9px] font-black rounded-lg px-3 py-1 uppercase border ${getStatusStyle(c.status)}`}>
//                             {c.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           ) : (
//             /* FULL DATA TABLE (Contains Actions) */
//             <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
//               <table className="w-full text-left">
//                 <thead className="bg-[#071952] text-white">
//                   <tr>
//                     <th onClick={() => requestSort('name')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">
//                       <div className="flex items-center gap-2">{activeTab === 'Candidates' ? 'Candidate' : 'Partner'} <ArrowUpDown size={12}/></div>
//                     </th>
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">Email</th>
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">{activeTab === 'Candidates' ? 'Mobile' : 'Message'}</th>
                    
//                     {activeTab === 'Candidates' && (
//                       <>
//                         <th onClick={() => requestSort('role')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Role</th>
//                         <th onClick={() => requestSort('status')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Status</th>
//                       </>
//                     )}
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {getSortedData(activeTab === 'Candidates' ? candidates : partners).map((item) => (
//                     <tr key={item._id} className="hover:bg-slate-50/50">
//                       <td className="px-7 py-5 font-bold text-[14px] text-slate-700 uppercase">{item.name}</td>
//                       <td className="px-7 py-5 text-slate-400 text-sm">{item.email}</td>
//                       <td className="px-7 py-5 text-slate-400 text-sm truncate max-w-[250px]">{item.phone || item.message}</td>
                      
//                       {activeTab === 'Candidates' && (
//                         <>
//                           <td className="px-7 py-5 text-slate-500 text-sm">{item.role || 'N/A'}</td>
//                           <td className="px-7 py-5">
//                             <div className="relative w-fit">
//                                 <select 
//                                 value={item.status} 
//                                 onChange={(e) => handleStatusChange(item._id, e.target.value)}
//                                 className={`appearance-none border text-[10px] font-black rounded-lg pl-3 pr-9 py-2 cursor-pointer uppercase outline-none shadow-sm min-w-[130px] ${getStatusStyle(item.status)}`}
//                                 >
//                                 {['PENDING', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'].map(s => (
//                                     <option key={s} value={s} className="bg-white text-slate-700">{s}</option>
//                                 ))}
//                                 </select>
//                                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
//                             </div>
//                           </td>
//                         </>
//                       )}

//                       <td className="px-7 py-5">
//                         <div className="flex items-center gap-4">
//                           {activeTab === 'Candidates' && (
//                             <a href={`http://localhost:5000/${item.resumePath}`} target="_blank" rel="noreferrer">
//                               <FileText size={19} className="text-[#0B57D0] hover:scale-110 transition-all"/>
//                             </a>
//                           )}
//                           <button onClick={() => openDeleteModal(item._id, activeTab === 'Candidates' ? 'candidate' : 'partner')}>
//                             <Trash2 size={19} className="text-red-300 hover:text-red-500 hover:scale-110 transition-all" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { 
//   LayoutDashboard, Users, LogOut, FileText, Download,
//   Clock, Star, Mic, XCircle, Trophy, Trash2, ArrowUpDown, AlertTriangle, 
//   ShieldCheck, ChevronDown, Handshake, Check
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // --- CUSTOM PREMIUM DROPDOWN COMPONENT ---
// const StatusDropdown = ({ currentStatus, onStatusChange, getStyle }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef(null);
//   const statuses = ['PENDING', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={containerRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex items-center justify-between w-[145px] px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${getStyle(currentStatus)}`}
//       >
//         <span>{currentStatus}</span>
//         <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-[100] mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
//           {statuses.map((s) => (
//             <button
//               key={s}
//               onClick={() => {
//                 onStatusChange(s);
//                 setIsOpen(false);
//               }}
//               className={`w-full flex items-center justify-between px-4 py-2.5 text-[10px] font-bold uppercase transition-colors hover:bg-slate-50 ${
//                 currentStatus === s ? 'text-[#0B57D0] bg-blue-50/50' : 'text-slate-600'
//               }`}
//             >
//               {s}
//               {currentStatus === s && <Check size={12} />}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [stats, setStats] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [adminName, setAdminName] = useState('Admin');
//   const [adminRank, setAdminRank] = useState('1'); 
  
//   const navigate = useNavigate();

//   // Sorting & Modals
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [showModal, setShowModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [deleteType, setDeleteType] = useState('candidate');

//   // --- 1. AUTOMATIC LOGOUT LOGIC (10 MINUTES) ---
//   const handleLogout = useCallback(() => {
//     localStorage.clear();
//     toast.info("Session expired due to inactivity");
//     navigate('/login');
//   }, [navigate]);

//   useEffect(() => {
//     let logoutTimer;
//     const INACTIVITY_TIME = 10 * 60 * 1000;

//     const resetTimer = () => {
//       if (logoutTimer) clearTimeout(logoutTimer);
//       logoutTimer = setTimeout(() => {
//         handleLogout();
//       }, INACTIVITY_TIME);
//     };

//     const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
//     events.forEach(event => window.addEventListener(event, resetTimer));
//     resetTimer();

//     return () => {
//       if (logoutTimer) clearTimeout(logoutTimer);
//       events.forEach(event => window.removeEventListener(event, resetTimer));
//     };
//   }, [handleLogout]);

//   // --- 2. DATA FETCHING ---
//   useEffect(() => {
//     fetchDashboardData();
//     setAdminName(localStorage.getItem("adminName") || 'Admin');
//     setAdminRank(localStorage.getItem("adminRank") || '1');
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [sRes, cRes, pRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/dashboard/stats'),
//         axios.get('http://localhost:5000/api/candidates'),
//         axios.get('http://localhost:5000/api/contact')
//       ]);
//       setStats(sRes.data);
//       setCandidates(cRes.data);
//       setPartners(Array.isArray(pRes.data) ? pRes.data : []);
//     } catch (e) {
//       console.error("Fetch Error", e);
//       toast.error("Failed to sync dashboard data");
//     }
//     setLoading(false);
//   };

//   // --- 3. HELPER FUNCTIONS ---
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
//     setSortConfig({ key, direction });
//   };

//   const getSortedData = (data) => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         const valA = (a[sortConfig.key] || "").toString().toLowerCase();
//         const valB = (b[sortConfig.key] || "").toString().toLowerCase();
//         if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableItems;
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/candidates/${id}/status`, { status: newStatus });
//       toast.success(`Status updated to ${newStatus}`);
//       fetchDashboardData();
//     } catch (e) { toast.error("Status update failed"); }
//   };

//   const openDeleteModal = (id, type) => {
//     setSelectedId(id);
//     setDeleteType(type);
//     setShowModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedId) return;
//     try {
//       const url = deleteType === 'candidate' 
//         ? `http://localhost:5000/api/candidates/${selectedId}`
//         : `http://localhost:5000/api/contact/${selectedId}`;
      
//       await axios.delete(url);
//       toast.success(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} record deleted`);
//       fetchDashboardData();
//     } catch (e) { 
//         toast.error("Delete failed."); 
//     }
//     setShowModal(false);
//   };

//   const downloadExcel = () => {
//     const data = activeTab === 'Candidates' ? candidates : partners;
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
//     XLSX.writeFile(workbook, `${activeTab}_Report.xlsx`);
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'HIRED': return 'bg-[#ECFDF5] border-[#D1FAE5] text-[#059669]';
//       case 'REJECTED': return 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]';
//       case 'INTERVIEW': return 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]';
//       case 'SHORTLISTED': return 'bg-[#EFF6FF] border-[#DBEAFE] text-[#2563EB]';
//       default: return 'bg-[#F9FAFB] border-[#F3F4F6] text-[#4B5563]';
//     }
//   };

//   const getIconConfig = (type) => {
//     switch (type) {
//       case 'total': return { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' };
//       case 'pending': return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' };
//       case 'shortlisted': return { icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' };
//       case 'interview': return { icon: Mic, color: 'text-orange-600', bg: 'bg-orange-50' };
//       case 'rejected': return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' };
//       case 'hired': return { icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' };
//       default: return { icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' };
//     }
//   };

//   if (loading) return <div className="h-screen flex items-center justify-center font-black text-[#071952] animate-pulse">LOADING...</div>;

//   return (
//     <div className="h-screen w-full flex flex-col bg-[#F8FAFC] font-sans overflow-hidden">
      
//       {/* DELETE MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center">
//             <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
//             <h2 className="text-xl font-black text-[#071952] mb-2">Confirm Delete?</h2>
//             <p className="text-slate-500 text-sm mb-6">This record will be permanently removed.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600">Cancel</button>
//               <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* NAVBAR */}
//       <nav className="h-[72px] flex-none flex items-center justify-between px-8 bg-white border-b border-slate-100 z-30">
//         <Link to="/" className="text-2xl font-black tracking-tight text-[#071952]">Hirings</Link>
//         <button className="px-6 py-2.5 bg-[#071952] text-white rounded-xl font-bold text-[14px]">Partner With Us</button>
//       </nav>

//       <div className="flex-1 flex overflow-hidden">
//         {/* SIDEBAR */}
//         <aside className="w-64 bg-white border-r border-slate-100 flex flex-col pt-8">
//           <nav className="flex-1 px-4 space-y-2">
//             {[
//               { n: 'Overview', i: LayoutDashboard }, 
//               { n: 'Candidates', i: Users }, 
//               { n: 'Partners', i: Handshake }
//             ].map((t) => (
//               <button key={t.n} onClick={() => {setActiveTab(t.n); setSortConfig({ key: null, direction: 'asc' });}}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
//                   activeTab === t.n ? 'bg-[#071952] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
//                 }`}>
//                 <t.i size={18} /> {t.n}
//               </button>
//             ))}
//           </nav>
//           <div className="p-6 border-t">
//             <button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-2 w-full hover:bg-red-50 p-2 rounded-lg transition-colors">
//               <LogOut size={18}/> Logout
//             </button>
//           </div>
//         </aside>

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-1 overflow-y-auto p-8 space-y-8">
          
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-black text-[#071952] tracking-tight">{activeTab}</h1>
//               <p className="text-slate-400 font-medium text-sm">Welcome, {adminName}!</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* UPDATED ADMIN DISPLAY: CLEANER & PREMIUM */}
//               <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-sm hover:shadow transition-all duration-300">
//                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//                   <ShieldCheck size={18} className="text-[#0B57D0]" />
//                 </div>
//                 <p className="text-[15px] font-black text-[#071952] pr-1">Admin {adminRank}</p>
//               </div>

//               {activeTab !== 'Overview' && (
//                 <button onClick={downloadExcel} className="px-6 py-3.5 bg-[#0B57D0] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#071952] transition-colors shadow-lg shadow-blue-100">
//                   <Download size={18} /> Download Excel
//                 </button>
//               )}
//             </div>
//           </div>

//           {activeTab === 'Overview' ? (
//             <>
//               {/* STATS GRID */}
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                 {stats.map((stat, i) => {
//                   const config = getIconConfig(stat.type);
//                   return (
//                     <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col items-start">
//                       <div className={`w-11 h-11 rounded-xl mb-4 flex items-center justify-center ${config.bg} ${config.color} bg-opacity-20`}>
//                         <config.icon size={22} />
//                       </div>
//                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
//                       <h3 className="text-3xl font-black text-[#071952]">{stat.value}</h3>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* OVERVIEW TABLE */}
//               <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mt-8">
//                 <div className="p-7 border-b border-slate-50 font-black text-[#071952] text-lg">Recent Pipeline Activity</div>
//                 <table className="w-full text-left">
//                   <thead className="bg-[#071952] text-white">
//                     <tr>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Candidate</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Email</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Mobile</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Role</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-50">
//                     {candidates.slice(0, 5).map((c) => (
//                       <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
//                         <td className="px-7 py-5 font-bold text-[14px] text-slate-700 uppercase">{c.name}</td>
//                         <td className="px-7 py-5 text-slate-400 text-sm">{c.email}</td>
//                         <td className="px-7 py-5 text-slate-400 text-sm">{c.phone}</td>
//                         <td className="px-7 py-5 text-slate-500 text-sm">{c.role}</td>
//                         <td className="px-7 py-5">
//                           <span className={`text-[9px] font-black rounded-lg px-3 py-1 uppercase border ${getStatusStyle(c.status)}`}>
//                             {c.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           ) : (
//             /* FULL DATA TABLE (Contains Custom Premium Dropdown) */
//             <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
//               <table className="w-full text-left">
//                 <thead className="bg-[#071952] text-white">
//                   <tr>
//                     <th onClick={() => requestSort('name')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">
//                       <div className="flex items-center gap-2">{activeTab === 'Candidates' ? 'Candidate' : 'Partner'} <ArrowUpDown size={12}/></div>
//                     </th>
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">Email</th>
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">{activeTab === 'Candidates' ? 'Mobile' : 'Message'}</th>
                    
//                     {activeTab === 'Candidates' && (
//                       <>
//                         <th onClick={() => requestSort('role')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Role</th>
//                         <th onClick={() => requestSort('status')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Status</th>
//                       </>
//                     )}
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {getSortedData(activeTab === 'Candidates' ? candidates : partners).map((item) => (
//                     <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
//                       <td className="px-7 py-5 font-bold text-[14px] text-slate-700 uppercase">{item.name}</td>
//                       <td className="px-7 py-5 text-slate-400 text-sm">{item.email}</td>
//                       <td className="px-7 py-5 text-slate-400 text-sm truncate max-w-[250px]">{item.phone || item.message}</td>
                      
//                       {activeTab === 'Candidates' && (
//                         <>
//                           <td className="px-7 py-5 text-slate-500 text-sm">{item.role || 'N/A'}</td>
//                           <td className="px-7 py-5">
//                             {/* PREMIUM DROPDOWN INTEGRATION */}
//                             <StatusDropdown 
//                               currentStatus={item.status} 
//                               onStatusChange={(newStatus) => handleStatusChange(item._id, newStatus)}
//                               getStyle={getStatusStyle}
//                             />
//                           </td>
//                         </>
//                       )}

//                       <td className="px-7 py-5">
//                         <div className="flex items-center gap-4">
//                           {activeTab === 'Candidates' && (
//                             <a href={`http://localhost:5000/${item.resumePath}`} target="_blank" rel="noreferrer">
//                               <FileText size={19} className="text-[#0B57D0] hover:scale-110 transition-all"/>
//                             </a>
//                           )}
//                           <button onClick={() => openDeleteModal(item._id, activeTab === 'Candidates' ? 'candidate' : 'partner')}>
//                             <Trash2 size={19} className="text-red-300 hover:text-red-500 hover:scale-110 transition-all" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { 
//   LayoutDashboard, Users, LogOut, FileText, Download,
//   Clock, Star, Mic, XCircle, Trophy, Trash2, ArrowUpDown, AlertTriangle, 
//   ShieldCheck, ChevronDown, Handshake, Check
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // --- CUSTOM PREMIUM DROPDOWN COMPONENT ---
// const StatusDropdown = ({ currentStatus, onStatusChange, getStyle }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef(null);
//   const statuses = ['PENDING', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={containerRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex items-center justify-between w-[145px] px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${getStyle(currentStatus)}`}
//       >
//         <span>{currentStatus}</span>
//         <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-[100] mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
//           {statuses.map((s) => (
//             <button
//               key={s}
//               onClick={() => {
//                 onStatusChange(s);
//                 setIsOpen(false);
//               }}
//               className={`w-full flex items-center justify-between px-4 py-2.5 text-[10px] font-bold uppercase transition-colors hover:bg-slate-50 ${
//                 currentStatus === s ? 'text-[#0B57D0] bg-blue-50/50' : 'text-slate-600'
//               }`}
//             >
//               {s}
//               {currentStatus === s && <Check size={12} />}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [stats, setStats] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [adminName, setAdminName] = useState('Admin');
//   const [adminRank, setAdminRank] = useState('1'); 
  
//   const navigate = useNavigate();

//   // Sorting & Modals
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [showModal, setShowModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [deleteType, setDeleteType] = useState('candidate');

//   // --- 1. AUTOMATIC LOGOUT LOGIC (10 MINUTES) ---
//   const handleLogout = useCallback(() => {
//     localStorage.clear();
//     toast.info("Session expired due to inactivity");
//     navigate('/login');
//   }, [navigate]);

//   useEffect(() => {
//     let logoutTimer;
//     const INACTIVITY_TIME = 10 * 60 * 1000;

//     const resetTimer = () => {
//       if (logoutTimer) clearTimeout(logoutTimer);
//       logoutTimer = setTimeout(() => {
//         handleLogout();
//       }, INACTIVITY_TIME);
//     };

//     const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
//     events.forEach(event => window.addEventListener(event, resetTimer));
//     resetTimer();

//     return () => {
//       if (logoutTimer) clearTimeout(logoutTimer);
//       events.forEach(event => window.removeEventListener(event, resetTimer));
//     };
//   }, [handleLogout]);

//   // --- 2. DATA FETCHING ---
//   useEffect(() => {
//     fetchDashboardData();
//     setAdminName(localStorage.getItem("adminName") || 'Admin');
//     setAdminRank(localStorage.getItem("adminRank") || '1');
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [sRes, cRes, pRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/dashboard/stats'),
//         axios.get('http://localhost:5000/api/candidates'),
//         axios.get('http://localhost:5000/api/contact')
//       ]);
//       setStats(sRes.data);
//       setCandidates(cRes.data);
//       setPartners(Array.isArray(pRes.data) ? pRes.data : []);
//     } catch (e) {
//       console.error("Fetch Error", e);
//       toast.error("Failed to sync dashboard data");
//     }
//     setLoading(false);
//   };

//   // --- 3. HELPER FUNCTIONS ---
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
//     setSortConfig({ key, direction });
//   };

//   const getSortedData = (data) => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         const valA = (a[sortConfig.key] || "").toString().toLowerCase();
//         const valB = (b[sortConfig.key] || "").toString().toLowerCase();
//         if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableItems;
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/candidates/${id}/status`, { status: newStatus });
//       toast.success(`Status updated to ${newStatus}`);
//       fetchDashboardData();
//     } catch (e) { toast.error("Status update failed"); }
//   };

//   const openDeleteModal = (id, type) => {
//     setSelectedId(id);
//     setDeleteType(type);
//     setShowModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedId) return;
//     try {
//       const url = deleteType === 'candidate' 
//         ? `http://localhost:5000/api/candidates/${selectedId}`
//         : `http://localhost:5000/api/contact/${selectedId}`;
      
//       await axios.delete(url);
//       toast.success(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} record deleted`);
//       fetchDashboardData();
//     } catch (e) { 
//         toast.error("Delete failed."); 
//     }
//     setShowModal(false);
//   };

//   const downloadExcel = () => {
//     const data = activeTab === 'Candidates' ? candidates : partners;
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
//     XLSX.writeFile(workbook, `${activeTab}_Report.xlsx`);
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'HIRED': return 'bg-[#ECFDF5] border-[#D1FAE5] text-[#059669]';
//       case 'REJECTED': return 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]';
//       case 'INTERVIEW': return 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]';
//       case 'SHORTLISTED': return 'bg-[#EFF6FF] border-[#DBEAFE] text-[#2563EB]';
//       default: return 'bg-[#F9FAFB] border-[#F3F4F6] text-[#4B5563]';
//     }
//   };

//   const getIconConfig = (type) => {
//     switch (type) {
//       case 'total': return { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' };
//       case 'pending': return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' };
//       case 'shortlisted': return { icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' };
//       case 'interview': return { icon: Mic, color: 'text-orange-600', bg: 'bg-orange-50' };
//       case 'rejected': return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' };
//       case 'hired': return { icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' };
//       default: return { icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' };
//     }
//   };

//   if (loading) return <div className="h-screen flex items-center justify-center font-black text-[#071952] animate-pulse">LOADING...</div>;

//   return (
//     // Changed h-screen and overflow-hidden to min-h-screen to allow page scrolling
//     <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans">
      
//       {/* SIDEBAR - Made Sticky */}
//       <aside className="w-64 bg-white border-r border-slate-100 flex flex-col pt-8 sticky top-0 h-screen flex-none z-40">
//         <div className="px-8 mb-10">
//            <Link to="/" className="text-2xl font-black tracking-tight text-[#071952]">Hirings</Link>
//         </div>
//         <nav className="flex-1 px-4 space-y-2">
//           {[
//             { n: 'Overview', i: LayoutDashboard }, 
//             { n: 'Candidates', i: Users }, 
//             { n: 'Partners', i: Handshake }
//           ].map((t) => (
//             <button key={t.n} onClick={() => {setActiveTab(t.n); setSortConfig({ key: null, direction: 'asc' }); window.scrollTo(0,0);}}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
//                 activeTab === t.n ? 'bg-[#071952] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
//               }`}>
//               <t.i size={18} /> {t.n}
//             </button>
//           ))}
//         </nav>
//         <div className="p-6 border-t">
//           <button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-2 w-full hover:bg-red-50 p-2 rounded-lg transition-colors">
//             <LogOut size={18}/> Logout
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1 flex flex-col min-w-0">
//         {/* NAVBAR - Made Sticky */}
//         <nav className="h-[72px] sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-30 flex items-center justify-between px-8">
//           <div className="font-black text-[#071952] text-xl capitalize">{activeTab}</div>
//           <button className="px-6 py-2.5 bg-[#071952] text-white rounded-xl font-bold text-[14px] hover:bg-[#0B57D0] transition-colors shadow-sm">Partner With Us</button>
//         </nav>

//         {/* MAIN CONTENT AREA */}
//         <main className="p-8 space-y-8 pb-32">
          
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-black text-[#071952] tracking-tight">{activeTab}</h1>
//               <p className="text-slate-400 font-medium text-sm">Welcome back, {adminName}!</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-sm hover:shadow transition-all duration-300">
//                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//                   <ShieldCheck size={18} className="text-[#0B57D0]" />
//                 </div>
//                 <p className="text-[15px] font-black text-[#071952] pr-1">Admin {adminRank}</p>
//               </div>

//               {activeTab !== 'Overview' && (
//                 <button onClick={downloadExcel} className="px-6 py-3.5 bg-[#0B57D0] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#071952] transition-colors shadow-lg shadow-blue-100">
//                   <Download size={18} /> Download Excel
//                 </button>
//               )}
//             </div>
//           </div>

//           {activeTab === 'Overview' ? (
//             <>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                 {stats.map((stat, i) => {
//                   const config = getIconConfig(stat.type);
//                   return (
//                     <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col items-start">
//                       <div className={`w-11 h-11 rounded-xl mb-4 flex items-center justify-center ${config.bg} ${config.color} bg-opacity-20`}>
//                         <config.icon size={22} />
//                       </div>
//                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
//                       <h3 className="text-3xl font-black text-[#071952]">{stat.value}</h3>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-visible mt-8">
//                 <div className="p-7 border-b border-slate-50 font-black text-[#071952] text-lg">Recent Pipeline Activity</div>
//                 <table className="w-full text-left">
//                   <thead className="bg-[#071952] text-white">
//                     <tr>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Candidate</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Email</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Mobile</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Role</th>
//                       <th className="px-7 py-5 text-[10px] font-black uppercase">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-50">
//                     {candidates.slice(0, 10).map((c) => (
//                       <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
//                         <td className="px-7 py-5 font-bold text-[14px] text-slate-700 uppercase">{c.name}</td>
//                         <td className="px-7 py-5 text-slate-400 text-sm">{c.email}</td>
//                         <td className="px-7 py-5 text-slate-400 text-sm">{c.phone}</td>
//                         <td className="px-7 py-5 text-slate-500 text-sm">{c.role}</td>
//                         <td className="px-7 py-5">
//                           <span className={`text-[9px] font-black rounded-lg px-3 py-1 uppercase border ${getStatusStyle(c.status)}`}>
//                             {c.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           ) : (
//             <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-visible">
//               <table className="w-full text-left">
//                 <thead className="bg-[#071952] text-white">
//                   <tr>
//                     <th onClick={() => requestSort('name')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">
//                       <div className="flex items-center gap-2">{activeTab === 'Candidates' ? 'Candidate' : 'Partner'} <ArrowUpDown size={12}/></div>
//                     </th>
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">Email</th>
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">{activeTab === 'Candidates' ? 'Mobile' : 'Message'}</th>
                    
//                     {activeTab === 'Candidates' && (
//                       <>
//                         <th onClick={() => requestSort('role')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Role</th>
//                         <th onClick={() => requestSort('status')} className="px-7 py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Status</th>
//                       </>
//                     )}
//                     <th className="px-7 py-5 text-[10px] font-black uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {getSortedData(activeTab === 'Candidates' ? candidates : partners).map((item) => (
//                     <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
//                       <td className="px-7 py-5 font-bold text-[14px] text-slate-700 uppercase">{item.name}</td>
//                       <td className="px-7 py-5 text-slate-400 text-sm">{item.email}</td>
//                       <td className="px-7 py-5 text-slate-400 text-sm truncate max-w-[250px]">{item.phone || item.message}</td>
                      
//                       {activeTab === 'Candidates' && (
//                         <>
//                           <td className="px-7 py-5 text-slate-500 text-sm">{item.role || 'N/A'}</td>
//                           <td className="px-7 py-5">
//                             <StatusDropdown 
//                               currentStatus={item.status} 
//                               onStatusChange={(newStatus) => handleStatusChange(item._id, newStatus)}
//                               getStyle={getStatusStyle}
//                             />
//                           </td>
//                         </>
//                       )}

//                       <td className="px-7 py-5">
//                         <div className="flex items-center gap-4">
//                           {activeTab === 'Candidates' && (
//                             <a href={`http://localhost:5000/${item.resumePath}`} target="_blank" rel="noreferrer">
//                               <FileText size={19} className="text-[#0B57D0] hover:scale-110 transition-all"/>
//                             </a>
//                           )}
//                           <button onClick={() => openDeleteModal(item._id, activeTab === 'Candidates' ? 'candidate' : 'partner')}>
//                             <Trash2 size={19} className="text-red-300 hover:text-red-500 hover:scale-110 transition-all" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* DELETE MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center">
//             <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
//             <h2 className="text-xl font-black text-[#071952] mb-2">Confirm Delete?</h2>
//             <p className="text-slate-500 text-sm mb-6">This record will be permanently removed.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600">Cancel</button>
//               <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;















import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { 
  LayoutDashboard, Users, LogOut, FileText, Download,
  Clock, Star, Mic, XCircle, Trophy, Trash2, ArrowUpDown, AlertTriangle, 
  ShieldCheck, ChevronDown, Handshake, Check, Menu, X 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// --- CUSTOM PREMIUM DROPDOWN COMPONENT ---
const StatusDropdown = ({ currentStatus, onStatusChange, getStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const statuses = ['PENDING', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full min-w-[130px] lg:w-[145px] px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${getStyle(currentStatus)}`}
      >
        <span>{currentStatus}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-[100] mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => {
                onStatusChange(s);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-[10px] font-bold uppercase transition-colors hover:bg-slate-50 ${
                currentStatus === s ? 'text-[#0B57D0] bg-blue-50/50' : 'text-slate-600'
              }`}
            >
              {s}
              {currentStatus === s && <Check size={12} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [adminName, setAdminName] = useState('Admin');
  const [adminRank, setAdminRank] = useState('1'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  
  const navigate = useNavigate();

  // Sorting & Modals
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteType, setDeleteType] = useState('candidate');

  // --- 1. AUTOMATIC LOGOUT LOGIC (10 MINUTES) ---
  const handleLogout = useCallback(() => {
    localStorage.clear();
    toast.info("Session expired due to inactivity");
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    let logoutTimer;
    const INACTIVITY_TIME = 10 * 60 * 1000;

    const resetTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIME);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [handleLogout]);

  // --- 2. DATA FETCHING ---
  useEffect(() => {
    fetchDashboardData();
    setAdminName(localStorage.getItem("adminName") || 'Admin');
    setAdminRank(localStorage.getItem("adminRank") || '1');
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, pRes] = await Promise.all([
        axios.get('http://localhost:5000/api/dashboard/stats'),
        axios.get('http://localhost:5000/api/candidates'),
        axios.get('http://localhost:5000/api/contact')
      ]);
      setStats(sRes.data);
      setCandidates(cRes.data);
      setPartners(Array.isArray(pRes.data) ? pRes.data : []);
    } catch (e) {
      console.error("Fetch Error", e);
      toast.error("Failed to sync dashboard data");
    }
    setLoading(false);
  };

  // --- 3. HELPER FUNCTIONS ---
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = (a[sortConfig.key] || "").toString().toLowerCase();
        const valB = (b[sortConfig.key] || "").toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/candidates/${id}/status`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchDashboardData();
    } catch (e) { toast.error("Status update failed"); }
  };

  const openDeleteModal = (id, type) => {
    setSelectedId(id);
    setDeleteType(type);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      const url = deleteType === 'candidate' 
        ? `http://localhost:5000/api/candidates/${selectedId}`
        : `http://localhost:5000/api/contact/${selectedId}`;
      
      await axios.delete(url);
      toast.success(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} record deleted`);
      fetchDashboardData();
    } catch (e) { 
        toast.error("Delete failed."); 
    }
    setShowModal(false);
  };

  const downloadExcel = () => {
    const data = activeTab === 'Candidates' ? candidates : partners;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
    XLSX.writeFile(workbook, `${activeTab}_Report.xlsx`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'HIRED': return 'bg-[#ECFDF5] border-[#D1FAE5] text-[#059669]';
      case 'REJECTED': return 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]';
      case 'INTERVIEW': return 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]';
      case 'SHORTLISTED': return 'bg-[#EFF6FF] border-[#DBEAFE] text-[#2563EB]';
      default: return 'bg-[#F9FAFB] border-[#F3F4F6] text-[#4B5563]';
    }
  };

  const getIconConfig = (type) => {
    switch (type) {
      case 'total': return { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'pending': return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' };
      case 'shortlisted': return { icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'interview': return { icon: Mic, color: 'text-orange-600', bg: 'bg-orange-50' };
      case 'rejected': return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' };
      case 'hired': return { icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' };
      default: return { icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' };
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-[#071952] animate-pulse">LOADING...</div>;

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans relative">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        w-64 bg-white border-r border-slate-100 flex flex-col pt-8 fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-8 mb-10 flex items-center justify-between">
           <Link to="/" className="text-2xl font-black tracking-tight text-[#071952]">Hirings</Link>
           <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
             <X size={24} className="text-slate-400" />
           </button>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { n: 'Overview', i: LayoutDashboard }, 
            { n: 'Candidates', i: Users }, 
            { n: 'Partners', i: Handshake }
          ].map((t) => (
            <button key={t.n} onClick={() => {setActiveTab(t.n); setSortConfig({ key: null, direction: 'asc' }); window.scrollTo(0,0); setIsSidebarOpen(false);}}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === t.n ? 'bg-[#071952] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
              }`}>
              <t.i size={18} /> {t.n}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t">
          <button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-2 w-full hover:bg-red-50 p-2 rounded-lg transition-colors">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* NAVBAR */}
        <nav className="h-[72px] sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} className="text-[#071952]" />
            </button>
            <div className="font-black text-[#071952] text-lg lg:text-xl capitalize">{activeTab}</div>
          </div>
          <button className="px-4 lg:px-6 py-2 bg-[#071952] text-white rounded-xl font-bold text-[12px] lg:text-[14px] hover:bg-[#0B57D0] transition-colors shadow-sm whitespace-nowrap">
            Partner With Us
          </button>
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="p-4 lg:p-8 space-y-6 lg:space-y-8 pb-32">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-[#071952] tracking-tight">{activeTab}</h1>
              <p className="text-slate-400 font-medium text-xs lg:text-sm">Welcome back, {adminName}!</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-sm flex-1 md:flex-none">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-[#0B57D0]" />
                </div>
                <p className="text-[13px] lg:text-[15px] font-black text-[#071952] pr-1 whitespace-nowrap">Admin {adminRank}</p>
              </div>

              {activeTab !== 'Overview' && (
                <button onClick={downloadExcel} className="flex-1 md:flex-none justify-center px-4 py-3 bg-[#0B57D0] text-white rounded-xl font-bold text-xs lg:text-sm flex items-center gap-2 hover:bg-[#071952] transition-colors shadow-lg shadow-blue-100">
                  <Download size={18} /> <span className="hidden sm:inline">Download Excel</span> <span className="sm:hidden">Excel</span>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'Overview' ? (
            <>
              {/* Stats Grid - Adjusted columns for mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
                {stats.map((stat, i) => {
                  const config = getIconConfig(stat.type);
                  return (
                    <div key={i} className="bg-white p-4 lg:p-6 rounded-[24px] lg:rounded-[28px] border border-slate-100 shadow-sm flex flex-col items-start">
                      <div className={`w-9 h-9 lg:w-11 lg:h-11 rounded-xl mb-3 lg:mb-4 flex items-center justify-center ${config.bg} ${config.color} bg-opacity-20`}>
                        <config.icon size={20} />
                      </div>
                      <p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h3 className="text-xl lg:text-3xl font-black text-[#071952]">{stat.value}</h3>
                    </div>
                  );
                })}
              </div>

              {/* Recent Pipeline Activity with horizontal scroll */}
              <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mt-8">
                <div className="p-5 lg:p-7 border-b border-slate-50 font-black text-[#071952] text-md lg:text-lg">Recent Pipeline Activity</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-[#071952] text-white">
                      <tr>
                        <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Candidate</th>
                        <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Email</th>
                        <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Mobile</th>
                        <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Role</th>
                        <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {candidates.slice(0, 10).map((c) => (
                        <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 lg:px-7 py-4 lg:py-5 font-bold text-sm text-slate-700 uppercase">{c.name}</td>
                          <td className="px-6 lg:px-7 py-4 lg:py-5 text-slate-400 text-xs lg:text-sm">{c.email}</td>
                          <td className="px-6 lg:px-7 py-4 lg:py-5 text-slate-400 text-xs lg:text-sm">{c.phone}</td>
                          <td className="px-6 lg:px-7 py-4 lg:py-5 text-slate-500 text-xs lg:text-sm">{c.role}</td>
                          <td className="px-6 lg:px-7 py-4 lg:py-5">
                            <span className={`text-[8px] lg:text-[9px] font-black rounded-lg px-3 py-1 uppercase border ${getStatusStyle(c.status)}`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[900px]">
                  <thead className="bg-[#071952] text-white">
                    <tr>
                      <th onClick={() => requestSort('name')} className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">
                        <div className="flex items-center gap-2">{activeTab === 'Candidates' ? 'Candidate' : 'Partner'} <ArrowUpDown size={12}/></div>
                      </th>
                      <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Email</th>
                      <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">{activeTab === 'Candidates' ? 'Mobile' : 'Message'}</th>
                      
                      {activeTab === 'Candidates' && (
                        <>
                          <th onClick={() => requestSort('role')} className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Role</th>
                          <th onClick={() => requestSort('status')} className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Status</th>
                        </>
                      )}
                      <th className="px-6 lg:px-7 py-4 lg:py-5 text-[10px] font-black uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {getSortedData(activeTab === 'Candidates' ? candidates : partners).map((item) => (
                      <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 lg:px-7 py-4 lg:py-5 font-bold text-sm text-slate-700 uppercase">{item.name}</td>
                        <td className="px-6 lg:px-7 py-4 lg:py-5 text-slate-400 text-xs lg:text-sm">{item.email}</td>
                        <td className="px-6 lg:px-7 py-4 lg:py-5 text-slate-400 text-xs lg:text-sm truncate max-w-[200px] lg:max-w-[250px]">{item.phone || item.message}</td>
                        
                        {activeTab === 'Candidates' && (
                          <>
                            <td className="px-6 lg:px-7 py-4 lg:py-5 text-slate-500 text-xs lg:text-sm">{item.role || 'N/A'}</td>
                            <td className="px-6 lg:px-7 py-4 lg:py-5">
                              <StatusDropdown 
                                currentStatus={item.status} 
                                onStatusChange={(newStatus) => handleStatusChange(item._id, newStatus)}
                                getStyle={getStatusStyle}
                              />
                            </td>
                          </>
                        )}

                        <td className="px-6 lg:px-7 py-4 lg:py-5">
                          <div className="flex items-center gap-4">
                            {activeTab === 'Candidates' && (
                              <a href={`http://localhost:5000/${item.resumePath}`} target="_blank" rel="noreferrer">
                                <FileText size={19} className="text-[#0B57D0] hover:scale-110 transition-all"/>
                              </a>
                            )}
                            <button onClick={() => openDeleteModal(item._id, activeTab === 'Candidates' ? 'candidate' : 'partner')}>
                              <Trash2 size={19} className="text-red-300 hover:text-red-500 hover:scale-110 transition-all" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] p-6 lg:p-8 max-w-sm w-full shadow-2xl text-center">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={40} lg={48} />
            <h2 className="text-lg lg:text-xl font-black text-[#071952] mb-2">Confirm Delete?</h2>
            <p className="text-slate-500 text-xs lg:text-sm mb-6">This record will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600 text-sm">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;