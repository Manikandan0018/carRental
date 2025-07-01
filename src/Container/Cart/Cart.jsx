import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import {
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaTools,
  FaTrashAlt,
} from 'react-icons/fa';

export const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const initDays = {};
    cart.forEach((car) => {
      initDays[car.id] = 1;
    });
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(cart.filter((car) => car.id !== id));
  };



 



 

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-r from-white to-blue-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Your Rented Cars</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 mt-10 text-lg">
          No cars added yet. Start booking your next ride now!
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: Car Cards */}
        <div className="space-y-8">
  {cart.map((car) => (
    <div
      key={car.id}
      className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition flex flex-col"
    >
      <img
        src={car.img}
        alt={car.model}
        className="w-full h-auto object-contain max-h-[300px] bg-gray-100"
      />

      <div className="p-5 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-blue-800">
            {car.model}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <FaTachometerAlt className="text-blue-500" />
              <span>Top Speed: {car.horsepower} mph</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCogs className="text-blue-500" />
              <span>Transmission: {car.gear || 'Automatic'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTools className="text-blue-500" />
              <span>Engine: {car.engine}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGasPump className="text-blue-500" />
              <span>Fuel Type: {car.fuel || 'Petrol'}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t pt-3">
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Free cancellation up to 24 hours</li>
            <li>Unlimited mileage</li>
            <li>Roadside assistance included</li>
          </ul>
        </div>

        <button
          onClick={() => removeFromCart(car.id)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          <FaTrashAlt /> cancel Rent </button>
      </div>
    </div>
  ))}
</div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center">
              Complete Your Booking
            </h3>
            <ContactForm />
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="mt-20 bg-white rounded-xl p-6 shadow-md">
        <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Why Choose Us?
        </h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-gray-700">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-2">Affordable Pricing</h5>
            <p>No hidden fees. Pay only for what you rent.</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-2">Wide Selection</h5>
            <p>From SUVs to sedans – choose what suits your trip.</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-2">24/7 Support</h5>
            <p>Our team is here for you around the clock.</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-2">Easy Booking</h5>
            <p>Simple and fast car rental experience.</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-2">Flexible Durations</h5>
            <p>Rent by the day, week, or month — your choice!</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-2">Well-Maintained Vehicles</h5>
            <p>Clean, safe, and regularly serviced cars.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};
