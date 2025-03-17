import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Book, Calendar } from 'lucide-react';
import { bookSpace, getSpaces } from '../utils/api';

const BookingPage = () => {
  const location = useLocation();
  const spaceId = new URLSearchParams(location.search).get('spaceId');
  const [space, setSpace] = useState(null);
  const [bookingData, setBookingData] = useState({ date: '', duration: 1 });
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    if (spaceId) fetchSpace();
  }, [spaceId]);

  const fetchSpace = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSpaces({ _id: spaceId });
      const spaces = Array.isArray(response) ? response : [];
      if (spaces.length > 0) {
        setSpace(spaces[0]); // Use first space if available
      } else {
        setError('Space not found');
      }
    } catch (error) {
      console.error('Error fetching space:', error);
      setError(error.message || 'Failed to fetch space details');
    } finally {
      setLoading(false);
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
      alert(error.message || 'Booking failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Book className="mr-2" size={24} /> Book a Space
        </h1>
        {loading && <p className="text-gray-600 text-center">Loading space details...</p>}
        {error && !loading && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && space ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800">{space.name}</h2>
            <p className="text-gray-600 mb-6">{space.location} - ${space.price}/hour</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                <input
                  type="number"
                  name="duration"
                  value={bookingData.duration}
                  onChange={handleChange}
                  min="1"
                  className="input-field"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center"
              >
                <Calendar className="mr-2" size={20} /> Book Now
              </button>
            </form>
          </>
        ) : (
          !loading && !error && <p className="text-gray-600">No space selected.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;