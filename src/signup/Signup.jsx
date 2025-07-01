import { useState } from 'react';
import './SignUp.css';
import { useMutation } from '@tanstack/react-query';
import blackbg from '../Container/img/blackbg.jpeg';
import {
  FaArrowRight,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Signup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setForm] = useState({ name: '', email: '', password: '' });
const [loginform, setLoginForm] = useState({ email: '', password: '' });

  const ToggleVisibility = () => setVisible(!visible);
  const home = () => navigate('/');

  const { mutate: signup, isError, error, isPending } = useMutation({
    mutationFn: async ({ email, password, fullname }) => {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password, fullname }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      return data;
    },
    onSuccess: (data) => {
      console.log('Success:', data.email);
      toast.success("Check your email for the OTP.");
      navigate('/otpVerify');
    },
    onError: (err) => {
      console.error('Mutation error:', err.message);
    },
  });

  const LoginDataHandleChange = (e) => {
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
  };

    const { mutate: login } = useMutation({
    mutationFn: async ({ email, password }) => {
      const url = 'http://localhost:5000/api/auth/login';

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); 

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Login successful");
      navigate('/')
    },
    onError: (err) => {
      const msg = err.message;
      if (msg) {
        toast.error("Invalid email or password");
      }
    },
  });

  const LoginHandleSubmit = (e) => {
    e.preventDefault();
    login(loginform);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({
      email: formData.email,
      password: formData.password,
      fullname: formData.name, // Correct mapping
    });
  };

  return (
    <>
      <div className="absolute w-full h-full -z-10">
        <img className="w-full h-full object-cover blur-sm" src={blackbg} alt="" />
      </div>

      <div className="pt-9 pl-9 w-full flex justify-center md:justify-start gap-4 md:gap-8 px-5 text-white font-sans text-lg z-10">
        <p onClick={home} className="cursor-pointer hover:text-orange-500 transition hover:translate-x-1">Home</p>
        <p className="cursor-pointer hover:text-orange-500 transition hover:translate-x-1">Services</p>
        <p className="cursor-pointer hover:text-orange-500 transition hover:translate-x-1">Review</p>
        <p className="cursor-pointer hover:text-orange-500 transition hover:translate-x-1">About</p>
      </div>

      <div className="relative w-full mt-20 flex flex-col lg:flex-row items-center justify-center gap-10 px-4 lg:px-20">
        <div className="text-white text-center lg:text-left max-w-xl">
          <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">THE ROYAL ESSENCE OF JOURNEY</p>
          <p className="text-lg font-semibold mb-2">RELAXED JOURNEY EVER</p>
          <p className="mb-4">Looking for an affordable ride? Rent a car at a great price and enjoy the freedom of the open road. Make every journey memorable with a comfortable, budget-friendly vehicle!</p>
          <button className="bg-yellow-500 hover:bg-green-600 px-6 py-2 rounded transition">RENT CAR NOW</button>
        </div>

        {/* Auth Form */}
        <form onSubmit={visible ? handleSubmit : LoginHandleSubmit} className="bg-black bg-opacity-50 p-6 rounded-xl w-full max-w-md text-white">
  {visible ? (
    <div className="flex flex-col gap-3">
      <p className="text-2xl font-bold mb-2">Register to Rent a Dream Car</p>
      <label>Name</label>
      <input
        value={formData.name}
        onChange={(e) => setForm({ ...formData, name: e.target.value })}
        className="bg-gray-100 text-black px-4 py-2 rounded"
        type="text"
        placeholder="Enter your name..."
        required
      />
      <label>Email</label>
      <input
        value={formData.email}
        onChange={(e) => setForm({ ...formData, email: e.target.value })}
        className="bg-gray-100 text-black px-4 py-2 rounded"
        type="email"
        placeholder="Enter your @gmail.com"
        required
      />
      <label>Password</label>
      <input
        value={formData.password}
        onChange={(e) => setForm({ ...formData, password: e.target.value })}
        className="bg-gray-100 text-black px-4 py-2 rounded"
        type="password"
        placeholder="Enter password"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className={`mt-2 py-2 rounded text-white ${isPending ? 'bg-gray-400' : 'bg-orange-600 hover:bg-green-500'}`}
      >
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>
      {isError && (
        <p className="mt-4 text-center text-sm text-red-600">
          {error.message}
        </p>
      )}
      <p className="text-red-500 hover:text-green-500 cursor-pointer text-sm" onClick={ToggleVisibility}>Or Sign In</p>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <p className="text-2xl font-bold mb-2">Sign In to Rent a Dream Car</p>
      <label>Email</label>
      <input
        name='email'
        value={loginform.email}
        onChange={LoginDataHandleChange}
        className="bg-gray-100 text-black px-4 py-2 rounded"
        type="email"
        placeholder="Enter your @gmail.com"
        required
      />
      <label>Password</label>
      <input
        name='password'
        value={loginform.password}
        onChange={LoginDataHandleChange}
        className="bg-gray-100 text-black px-4 py-2 rounded"
        type="password"
        placeholder="Enter password"
        required
      />
      <button
        type="submit"
        className="bg-orange-600 hover:bg-green-500 mt-2 py-2 rounded text-white"
      >
        Sign In
      </button>
      <p className="text-red-500 hover:text-green-500 cursor-pointer text-sm" onClick={ToggleVisibility}>New user? Register here</p>
    </div>
  )}
</form>

      
      </div>

      {/* Footer */}
      <div className="mt-20 w-full bg-black text-white py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <p className="text-orange-500 font-bold text-2xl mb-2">NOVARIDE</p>
            <p>Experience the ease and convenience of renting a car with Novaride.</p>
          </div>
          <div>
            <p className="text-orange-500 font-bold text-xl mb-2">Legal Policy</p>
            <p className="hover:text-orange-500 cursor-pointer">Terms & Conditions</p>
            <p className="hover:text-orange-500 cursor-pointer">Privacy Policy</p>
            <p className="hover:text-orange-500 cursor-pointer">Legal Notice</p>
            <p className="hover:text-orange-500 cursor-pointer">Accessibility</p>
          </div>
          <div>
            <p className="text-orange-500 font-bold text-xl mb-2">Quick Links</p>
            <p className="hover:text-orange-500 cursor-pointer">Home</p>
            <p className="hover:text-orange-500 cursor-pointer">About Us</p>
            <p className="hover:text-orange-500 cursor-pointer">Car Type</p>
            <p className="hover:text-orange-500 cursor-pointer">Service</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold text-white mb-2">Subscribe to the Newsletter</p>
            <div className="flex gap-2">
              <input type="email" className="bg-white text-black px-3 py-2 rounded w-full" placeholder="Email..." />
              <button className="bg-orange-400 hover:bg-orange-600 p-2 rounded">
                <FaArrowRight className="text-white text-xl" />
              </button>
            </div>
            <div className="mt-4 flex gap-4 text-2xl">
              <FaYoutube className="hover:text-orange-400 cursor-pointer" />
              <FaFacebook className="hover:text-orange-400 cursor-pointer" />
              <FaInstagram className="hover:text-orange-400 cursor-pointer" />
              <FaLinkedin className="hover:text-orange-400 cursor-pointer" />
              <FaTwitter className="hover:text-orange-400 cursor-pointer" />
            </div>
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">© 2024 Novaride. All rights reserved.</p>
      </div>
    </>
  );
};
