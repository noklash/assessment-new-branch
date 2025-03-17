import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getBookings } from '../utils/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true); 
    setError(null); // Reset error
    try {
      const response = await getBookings();
      
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load booking history. Please try again later.');
      setBookings([]); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <Clock className="mr-2" size={28} /> Booking History
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Loading booking history...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {/* Bookings List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">No bookings found.</p>
          ) : (
            bookings.map(booking => (
              <div key={booking._id} className="card">
                <h3 className="text-xl font-semibold text-gray-800">{booking.spaceId.name}</h3>
                <p className="text-gray-600 mt-2">Location: {booking.spaceId.location}</p>
                <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Duration: {booking.duration} hours</p>
                <p className="text-gray-800 font-semibold mt-2">
                  Total: ${booking.spaceId.price * booking.duration}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;