import  { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';

const DAILY_RATE = 700;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);

  const [submittedData, setSubmittedData] = useState(null); // stores submitted info
  const [isEditMode, setIsEditMode] = useState(false); // toggle edit mode

  // Calculate days and price
  const rentalDays = useMemo(() => {
    if (pickupDate && dropoffDate) {
      const days = differenceInDays(dropoffDate, pickupDate);
      return days > 0 ? days : 0;
    }
    return 0;
  }, [pickupDate, dropoffDate]);

  const totalPrice = rentalDays * DAILY_RATE;




  // payment
  const handlePayment = async () => {
  if (!totalPrice) return;

  const res = await fetch('http://localhost:5000/api/payment/createOrder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: totalPrice }),
  });

  const data = await res.json();

  const options = {
    key: 'your_key_id', // public key
    amount: data.amount,
    currency: data.currency,
    name: 'Car Rental Co.',
    description: 'Rental Booking',
    order_id: data.id,
    handler: function (response) {
      alert('Payment Successful: ' + response.razorpay_payment_id);
      // You can update DB here via API if needed
    },
    prefill: {
      name: formData.name,
      email: formData.email,
      contact: formData.phone,
    },
    theme: {
      color: '#0b5ed7',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

//pay end//

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const endpoint = submittedData
        ? `http://localhost:5000/api/auth/updateContact/${submittedData._id}` // for update
        : 'http://localhost:5000/api/auth/contactDetail'; // for create

      const res = await fetch(endpoint, {
        method: submittedData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Submission failed');
      }

      return res.json();
    },
    onSuccess: (data) => {
      setSubmittedData(data);
      setIsEditMode(false);
      toast.success(
        submittedData ? 'Contact info updated!' : 'Submitted successfully!'
      );
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong');
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupDate || !dropoffDate || rentalDays === 0) {
      toast.error('Please select valid pickup and drop-off dates.');
      return;
    }

    const finalData = {
      ...formData,
      pickup: pickupDate.toISOString(),
      dropoff: dropoffDate.toISOString(),
      totalPrice,
    };

    mutate(finalData);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setPickupDate(null);
    setDropoffDate(null);
    setSubmittedData(null);
    setIsEditMode(false);
  };

  // If form submitted and not in edit mode, show submitted info
  
  if (submittedData && !isEditMode) {
    return (
      <div className="p-6 bg-white rounded shadow text-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-center">Your Contact Details</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Message:</strong> {submittedData.message || 'N/A'}</p>
          <p><strong>Pickup Date:</strong> {new Date(submittedData.pickup).toLocaleDateString()}</p>
          <p><strong>Drop-off Date:</strong> {new Date(submittedData.dropoff).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ₹{submittedData.totalPrice}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Info
          </button>
          <button
            onClick={handleResetForm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Info
          </button>
          
        </div>
       <button
  type="button"
  onClick={handlePayment}
  className="w-full py-2 mt-2 rounded text-white bg-green-600 hover:bg-green-700"
>
  Make Payment ₹{totalPrice}
</button>

      </div>
    );
  }

  return (
    <>
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Update Your Details' : 'Enter Your Contact Details'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <div>
          <label className="block mb-1 font-medium">Pickup Date</label>
          <DatePicker
            selected={pickupDate}
            onChange={setPickupDate}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholderText="Select pickup date"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Drop-off Date</label>
          <DatePicker
            selected={dropoffDate}
            onChange={setDropoffDate}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholderText="Select drop-off date"
            dateFormat="yyyy-MM-dd"
            minDate={pickupDate || new Date()}
            required
          />
        </div>

        <textarea
          name="message"
          placeholder="Additional message (optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          rows="4"
        />

        {/* Price summary */}
        {rentalDays > 0 && (
          <div className="text-lg font-medium text-gray-800 bg-gray-100 p-4 rounded">
            <p>Rental Days: {rentalDays}</p>
            <p>Total Price: ₹{totalPrice}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 rounded text-white ${isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isPending ? 'Submitting...' : isEditMode ? 'Update Info' : 'Submit'}
        </button>

       
      </form>
    </div>

     <button
  type="button"
  onClick={handlePayment}
  className="w-full py-2 mt-2 rounded text-white bg-green-600 hover:bg-green-700"
>
  Make Payment ₹{totalPrice}
</button>


        </>
  );
};

export default ContactForm;
