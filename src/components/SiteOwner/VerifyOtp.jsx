import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import AdminNavbar from './SiteNavbar';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await fetch('https://jobportal-backend-psrc.onrender.com/api/v1/admin/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate('/owner/dashboard'); // Navigate to admin dashboard after successful OTP verification
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('OTP verification failed');
    } finally {
      setLoading(false); // Reset loading state after submission is complete
    }
  };

  return (
    <div>

    <AdminNavbar/>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f7fc',
        fontFamily: 'Arial, sans-serif',
      }}
    >

      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '400px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
          Verify OTP
        </h1>
        <p style={{ marginBottom: '30px', fontSize: '16px', color: '#777' }}>
          Please enter the OTP sent to your email address.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              disabled={loading} // Disable input if loading
            />
          </div>
          {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Verify
              </Button>
            )}
        </form>
      </div>
    </div>
    </div>
  );
};

export default VerifyOtp;
