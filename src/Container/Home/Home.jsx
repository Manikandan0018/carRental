import './Home.css';
import carlogo from "../img/carlogo.jpg";
import carjeep from "../img/jeephome.png";
import cus1 from "../img/cus1.jpeg";
import cus2 from "../img/cus2.jpeg";
import cus3 from "../img/cus3.jpeg";
import penzebg from "../cardata/penzebg.png";

import { CiSearch } from "react-icons/ci";
import { BsCalendarDate } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuBookCheck } from "react-icons/lu";
import appstore from "../img/appstoregg.png";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { IoMdStarHalf } from "react-icons/io";

import carData from "../data";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Home = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const SignupPage = () => navigate('/Signup');
  const cartPage = () => navigate('/cart');

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const addcard = (car) => {
  const alreadyInCart = cart.some((c) => c.id === car.id);
  if (!alreadyInCart) {
    setCart([...cart, car]);
    cartPage();
  } else {
    cartPage();
  }
};


  return (
    <>
      {/* Header Section */}
      <div className='flex flex-wrap items-center justify-between mt-5 px-4'>
        <img className='h-6 w-15' src={carlogo} alt="logo" />

        <div className='relative mt-2'>
          <CiSearch className='absolute top-2 left-3' />
          <input type="text" className='pl-9 bg-gray-100 shadow-md w-64 sm:w-80 h-10 rounded' placeholder='Search Dream Cars...' />
        </div>

        <div className='flex flex-wrap mt-5 gap-4 font-sans  text-md sm:text-lg'>
          <button className='hover:text-amber-500' onClick={() => scrollToSection("home")}>Home</button>
          <button className='hover:text-amber-500' onClick={() => scrollToSection("services")}>Services</button>
          <button className='hover:text-amber-500' onClick={() => scrollToSection("review")}>Review</button>
          <button className='hover:text-amber-500' onClick={() => scrollToSection("about")}>About</button>
        </div>

        <div className='flex gap-2 items-center mt-2'>
          <button onClick={SignupPage} className='hover:text-orange-600'>SignUp</button>
          <button onClick={SignupPage} className='bg-blue-700 px-3 py-1 hover:bg-amber-500 text-white rounded'>SignIn</button>
          <button onClick={cartPage} className='flex items-center gap-1 px-2 py-1 border rounded'>Rented <span className='text-orange-500 font-bold'>{cart.length}</span></button>
        </div>
      </div>

      {/* Hero Section */}
      <div id="home" className='flex flex-wrap bg-gray-100 shadow-md rounded-b-xl mt-10 p-6 justify-center'>
        <div className='flex flex-col gap-4 max-w-lg'>
          <p className='text-4xl md:text-6xl font-extrabold'><span className='text-orange-500'>Looking</span> to rent a car</p>
          <p className='text-gray-700'>Here the right place to rent a Dream Cars, In Affordable price</p>
          <img src={appstore} className='w-40' alt='App store' />
          <button className='bg-orange-500 hover:bg-amber-400 w-40 py-2 rounded text-white'>Download App</button>
          <p className='text-gray-600'>For better Experience</p>
        </div>
        <img className='w-72 md:w-[500px]' src={carjeep} alt="car jeep" />
      </div>

      {/* Search Box */}
      <div className='bg-gray-200 shadow-md rounded-xl mt-5 px-6 py-4 max-w-6xl mx-auto flex flex-wrap justify-center gap-6'>
        <div className=''>
          <p>From</p>
          <input placeholder='Enter from place...' type="text" className='w-48 sm:w-60 h-10 pl-3 bg-white rounded' />
        </div>
        <div className='ml-15'>
          <p>To</p>
          <input placeholder='Enter to place...' type="text" className='w-48 sm:w-60 h-10 pl-3 bg-white rounded' />
        </div>
        <div className='flex flex-col items-start'>
          <p>Date</p>
          <BsCalendarDate className='text-xl mt-1' />
        </div>
        <div className='flex flex-col items-start'>
          <p>&nbsp;</p>
          <button className='flex items-center gap-1 bg-orange-400 px-3 py-2 rounded'>GetRent <FaCar /></button>
        </div>
      </div>

      {/* Easy Steps Section */}
      <div id="services" className='my-12 px-4'>
        <p className='text-center text-3xl font-bold mb-8'>Rent With 3 Easy Steps</p>
        <div className='flex flex-wrap gap-6 justify-center'>
          {[
            {
              icon: <FaLocationDot className='text-3xl mx-auto' />,
              title: "CHOOSE A LOCATION",
              desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            },
            {
              icon: <FaRegCalendarAlt className='text-3xl mx-auto text-orange-500' />,
              title: "PICK-UP DATE",
              desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            },
            {
              icon: <LuBookCheck className='text-3xl mx-auto' />,
              title: "#BOOK A CAR",
              desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            }
          ].map((item, i) => (
            <div key={i} className={`w-72 p-6 rounded shadow-md text-center ${i === 1 ? 'bg-black text-white' : 'bg-amber-400'}`}>
              {item.icon}
              <p className='font-bold mt-2'>{item.title}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Car Cards */}
      <div className='flex  flex-wrap justify-center gap-9 px-4'>
        {carData.productData.map((car, index) => (
          <div key={index} className='relative w-90  group overflow-hidden  rounded'>
            <img src={car.img} alt='' className='w-full h-48 object-cover group-hover:blur-sm group-hover:scale-105 transition-all duration-300' />
            <div className='absolute  top-0 pt-6 w-full h-4 bg-gray-700 bg-opacity-70 text-white flex flex-col mt- text-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
              <p>Model: {car.model}</p>
              <p>Engine: {car.engine}</p>
              <p>Year : {car.year}</p>
              <p>TopSpeed: {car.horsepower}mph</p>
            </div>
            <div className='absolute h-9 bottom-10 w-full bg-gray-950 text-white p-2 flex justify-between'>
              <div className='flex items-center gap-1'>
                <MdAirlineSeatReclineNormal /> <span>4 Seats</span>
              </div>
              <div className='flex items-center gap-1'>
                <BsFuelPumpDiesel /> <span>diesel</span>
              </div>
              <p>Per Day: $120</p>
            </div>
              <button onClick={() => addcard(car)} className='mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded'>Rent Now</button>

          </div>

          
        ))}

      </div>

      {/* Review Section */}
      <div id="review" className='mt-10 bg-gray-100 py-10'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold'>Review</h1>
          <p className='text-blue-900 text-xl'>Happy Customers</p>
        </div>
        <div className='flex flex-wrap justify-center gap-6 px-6'>
          {[cus1, cus2, cus3].map((cus, idx) => (
            <div key={idx} className='bg-white p-4 rounded-2xl shadow-md max-w-xs text-center'>
              <img src={cus} className='w-24 h-24 mx-auto rounded-full mb-2' alt='customer' />
              <div className='flex justify-center mb-2'>
                {[...Array(4)].map((_, i) => <IoStar key={i} className='text-orange-500' />)}
                <IoMdStarHalf className='text-orange-500' />
              </div>
              <p className='text-sm text-gray-600'>"The car rental experience was top-notch. The vehicle was in pristine condition and drove smoothly. Booking was quick and support was friendly."</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Section */}
      <div id="about" className='flex flex-wrap items-center justify-center gap-6 py-10 px-6'>
        <img src={penzebg} className='w-80 md:w-[500px]' alt='' />
        <div className='max-w-lg'>
          <p className='text-orange-600 text-2xl md:text-4xl font-extrabold'>Here the Right Place to Rent a best Cheapest You like</p>
          <p className='font-bold mt-2'>Rent a car today at unbeatable prices! Affordable rates, no hidden fees!!!!</p>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-black text-white py-8 px-6 flex flex-col md:flex-row justify-between items-center'>
        <div className='text-center md:text-left'>
          <p className='font-extrabold text-xl'>Let's collaborate on your upcoming car rental venture</p>
          <p className='mt-2'>Partner with us and earn by renting out your car! Join our platform for easy, reliable car rental opportunities.</p>
        </div>
        <button className='mt-4 md:mt-0 bg-orange-400 hover:bg-orange-600 text-black px-6 py-2 rounded'>Contact Us</button>
      </div>
    </>
  );
};
