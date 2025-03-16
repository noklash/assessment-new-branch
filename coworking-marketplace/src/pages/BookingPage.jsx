// src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Book, Calendar } from 'lucide-react';
import { bookSpace, getSpaces } from '../utils/api';

const BookingPage = () => {
  const location = useLocation();
  const spaceId = new URLSearchParams(location.search).get('spaceId');
  const [space, setSpace] = useState(null);
  const [bookingData, setBookingData] = useState({ date: '', duration: 1 });

  useEffect(() => {
    if (spaceId) {
      fetchSpace();
    }
  }, [spaceId]);

  const fetchSpace = async () => {
    try {
      const response = await getSpaces({ _id: spaceId });
      setSpace(response.data[0]);
    } catch (error) {
      console.error('Error fetching space:', error);
    }
  };

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookSpace({ spaceId, ...bookingData });
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking space:', error);
      alert('Booking failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Book className="mr-2" /> Book a Space
        </h1>
        {space ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800">{space.name}</h2>
            <p className="text-gray-600">{space.location} - ${space.price}/hour</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  name="duration"
                  value={bookingData.duration}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center">
                <Calendar className="mr-2" size={20} /> Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <p className="text-gray-600">Select a space to book.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;