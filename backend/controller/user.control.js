import express from "express"
import User from '../models/user.model.js'
import Contact from '../models/contact.model.js';

import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import { sendOTP } from "../utils/sendEmail.js"; // ✅ import added

import Razorpay from 'razorpay';


const app = express();

app.use(express.json());


export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body; // 🔥 fixed

    const otp = otpGenerator.generate(6, { digits: true });
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email.trim(),
      password: hashPassword,
      fullname, // 🔥 fixed
      otp,
      otpExpires,
      isVerified: false,
    });

    await newUser.save();
    await sendOTP(email, otp);
    generateToken(newUser._id, res);

    return res.status(201).json({
      message: "Signup successful",
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    });

  } catch (error) {
    console.error(`Error in signup: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const verifyOtp = async (req,res)=>{
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  res.json({ message: 'OTP verified, signup complete' });
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res); // Set cookie or JWT

    return res.status(200).json({
      message: "Login successful",
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "login Server error" });
  }
};


export const contactDetail = async (req,res) =>{
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Create error:', err);
    res.status(400).json({ message: err.message });
  }
}

export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ message: err.message });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};