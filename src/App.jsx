import './App.css'
import { Home } from './Container/Home/Home'
import { Routes,Route } from 'react-router-dom';
import { Signup } from './signup/Signup';
import { useState } from 'react';
import { Cart } from './Container/Cart/Cart';
import { OtpVerify } from './signup/OtpVerify';
import { Toaster } from 'react-hot-toast';
import ContactForm from './Container/Cart/ContactForm';


export const App = () => {
  const [cart,setCart]=useState([]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes basename="/carRental">
        <Route path="/" element={<Home cart={cart} setCart={setCart}/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
        <Route path="/otpVerify" element={<OtpVerify/>} />
        <Route path="/contactForm" element={<ContactForm/>} />
      </Routes>
    
  
    </>
  )
}
