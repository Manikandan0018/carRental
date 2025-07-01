import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarSide } from 'react-icons/fa';

export const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Verification failed');
        return;
      }

      navigate('/');
    } catch (err) {
      setError(err,'Server error, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-4">
          <FaCarSide className="text-orange-500 text-4xl mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Verify Your OTP</h2>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email to verify your account.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="px-4 py-2 border rounded-lg text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-200"
          >
            Verify OTP
          </button>

          <p className="text-sm text-gray-500">Didnt receive OTP?<span className="text-blue-600 cursor-pointer hover:underline">Resend</span>
          </p>
        </form>
      </div>
    </div>
  );
};
