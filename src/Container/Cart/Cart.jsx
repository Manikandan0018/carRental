// Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cart = ({ cart, setCart }) => {
  const [daysMap, setDaysMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const initDays = {};
    cart.forEach((car) => {
      initDays[car.id] = initDays[car.id] || 1;
    });
    setDaysMap(initDays);
  }, [cart]);

  const updateDays = (id, delta) => {
    setDaysMap((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((car) => car.id !== id));
    setDaysMap((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handlePayment = () => {
    alert("Payment Successful!");
    setCart([]);
    setDaysMap({});
  };

  const perDayPrice = 120;

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Rented Cars</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Home
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">No cars added to cart.</p>
      ) : (
        <>
          <div className="grid lg:w-200 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
            {cart.map((car) => {
              const days = daysMap[car.id] || 1;
              const total = days * perDayPrice;

              return (
                <div key={car.id} className="border rounded shadow p-4">
                  <img
                    src={car.img}
                    alt={car.model}
                    className="w-full h-fit object-cover rounded mb-4"
                  />
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>Year:</strong> {car.year}</p>
                  <p><strong>Engine:</strong> {car.engine}</p>
                  <p><strong>Top Speed:</strong> {car.horsepower} mph</p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateDays(car.id, -1)}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >-</button>
                    <span>{days} day(s)</span>
                    <button
                      onClick={() => updateDays(car.id, 1)}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >+</button>
                  </div>

                  <p className="mt-2 text-lg font-semibold text-blue-600">Total: ${total}</p>

                  <button
                    onClick={() => removeFromCart(car.id)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-right">
            <p className="text-xl font-bold">
              Grand Total: $
              {cart.reduce((acc, car) => acc + (daysMap[car.id] || 1) * perDayPrice, 0)}
            </p>
            <button
              onClick={handlePayment}
              className="mt-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};
