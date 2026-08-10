// // import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./pages/Home";
// import { ToastContainer } from 'react-toastify';
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer"; // Assuming you have one
// import Services from "./components/Services"; // Assuming you have a Services page
// import Pricing from "./components/Pricing"; // Assuming you have a Pricing page
// import Testimonials from "./components/Testimonials"; // Assuming you have a Testimonials page
// import Work from "./components/Work"; // Assuming you have a Work page
// import ContactForm from "./components/ContactForm"; // Assuming you have a ContactForm page
// import CandidateForm from "./components/CandidateForm"; // Assuming you have a CandidateForm page
// // import BackgroundLayout from "./components/BackgroundLayout"; // Import the BackgroundLayout component
// import Register from "./components/Register"; // Assuming you have a Register page
// import Login from "./components/Login"; // Assuming you have a Login page
// import ForgotPassword from "./components/ForgotPassword"; // Assuming you have a ForgotPassword page
// import Dashboard from "./components/Dashboard"; // Assuming you have a Dashboard page
// function App() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* <BackgroundLayout> */}
//       <Navbar />
//         <ToastContainer position="top-right" autoClose={3000} />
//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/services" element={<Services />} />
//            <Route path="/pricing" element={<Pricing />} />
//            <Route path="/testimonials" element={<Testimonials />} />
//            <Route path="/work" element={<Work />} />
//            <Route path="/contact" element={<ContactForm />} />
//            <Route path="/submit-resume" element={<CandidateForm />} />
//            <Route path="/register" element={<Register />} />
//            <Route path="/login" element={<Login />} />
//            <Route path="/forgot-password" element={<ForgotPassword />} />
//            <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </main>
//       {/* </BackgroundLayout> */}
//       {/* <Footer /> */}
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import your components
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Services from "./components/Services";
// import Pricing from "./components/Pricing";
// import Testimonials from "./components/Testimonials";
// import Work from "./components/Work";
// import ContactForm from "./components/ContactForm";
// import CandidateForm from "./components/CandidateForm";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import ForgotPassword from "./components/ForgotPassword";
// import Dashboard from "./components/Dashboard";

// // --- 1. PROTECTED ROUTE COMPONENT ---
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const location = useLocation();

//   const isAuthenticated = token && token !== "null" && token !== "undefined";

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// // --- 2. AUTH ROUTE COMPONENT ---
// const AuthRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   const isAuthenticated =
//     token &&
//     token !== "null" &&
//     token !== "undefined";

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };
// function App() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navbar stays at the top */}
//       <Navbar />
      
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       <main>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/pricing" element={<Pricing />} />
//           <Route path="/testimonials" element={<Testimonials />} />
//           <Route path="/work" element={<Work />} />
//           <Route path="/contact" element={<ContactForm />} />
//           <Route path="/submit-resume" element={<CandidateForm />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Auth Protected Routes (Login/Register) */}
//           <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
//           <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />

//           {/* Private Dashboard Route */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;


import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages / Components
import Home from "./pages/Home";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Work from "./components/Work";
import ContactForm from "./components/ContactForm";
import CandidateForm from "./components/CandidateForm";

import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

// ------------------------------------
// PROTECTED ROUTE
// ------------------------------------
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isAuthenticated =
    token &&
    token !== "null" &&
    token !== "undefined";

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

// ------------------------------------
// AUTH ROUTE
// ------------------------------------
const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const isAuthenticated =
    token &&
    token !== "null" &&
    token !== "undefined";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// ------------------------------------
// APP
// ------------------------------------
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <main>
        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/pricing"
            element={<Pricing />}
          />

          <Route
            path="/testimonials"
            element={<Testimonials />}
          />

          <Route
            path="/work"
            element={<Work />}
          />

          <Route
            path="/contact"
            element={<ContactForm />}
          />

          <Route
            path="/submit-resume"
            element={<CandidateForm />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* =========================
              ADMIN AUTH
          ========================= */}

          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />

          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />

          {/* =========================
              ADMIN DASHBOARD
          ========================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* =========================
              FALLBACK
          ========================= */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </main>
    </>
  );
}

export default App;