// src/pages/BookingHistory.jsx
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getBookings } from '../utils/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
        <Clock className="mr-2" /> Booking History
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map(booking => (
          <div key={booking._id} className="card">
            <h3 className="text-xl font-semibold text-gray-800">{booking.spaceId.name}</h3>
            <p className="text-gray-600">Location: {booking.spaceId.location}</p>
            <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Duration: {booking.duration} hours</p>
            <p className="text-gray-600">Total: ${booking.spaceId.price * booking.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;