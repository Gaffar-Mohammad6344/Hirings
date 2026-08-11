import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email passed from Register page

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { email, otp });
      toast.success("Account verified!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#fafafa' }}>
      <form onSubmit={handleVerify} style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '10px' }}>Verify Email</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>We sent a code to <b>{email}</b></p>
        <input 
          type="text" maxLength="6" placeholder="Enter 6-digit OTP" 
          value={otp} onChange={(e) => setOtp(e.target.value)}
          style={{ width: '100%', height: '50px', textAlign: 'center', fontSize: '20px', letterSpacing: '10px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '20px' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', height: '50px', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;