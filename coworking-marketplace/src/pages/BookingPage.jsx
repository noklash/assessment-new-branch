// src/pages/BookingPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Book, Calendar } from 'lucide-react';
import { bookSpace, getSpaces } from '../utils/api';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const spaceId = new URLSearchParams(location.search).get('spaceId');

  const [space, setSpace] = useState(null);
  const [allSpaces, setAllSpaces] = useState([]);
  const [bookingData, setBookingData] = useState({ 
    bookingDate: '', 
    duration: 1 
  });
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    isSubmitting: false
  });

  // Fetch all spaces or a specific space based on spaceId
  const fetchSpaces = useCallback(async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getSpaces(spaceId ? { _id: spaceId } : {});
      const spaces = Array.isArray(response) ? response : [];
      
      if (spaceId) {
        if (spaces.length > 0) {
          setSpace(spaces[0]);
        } else {
          throw new Error('Space not found');
        }
      } else {
        setAllSpaces(spaces);
      }
    } catch (error) {
      console.error('Error fetching spaces:', error);
      setStatus(prev => ({ ...prev, error: error.message || 'Failed to fetch space details' }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, [spaceId]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'duration' ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleSpaceSelect = (selectedSpace) => {
    setSpace(selectedSpace);
    navigate(`?spaceId=${selectedSpace._id}`, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!space) return;
    setStatus(prev => ({ ...prev, error: null, isSubmitting: true }));
    try {
      await bookSpace({ spaceId: space._id, ...bookingData });
      alert('Booking successful!');
      setBookingData({ bookingDate: '', duration: 1 }); // Reset form
    } catch (error) {
      console.error('Error booking space:', error);
      setStatus(prev => ({ ...prev, error: error.message || 'Booking failed. Please try again.' }));
    } finally {
      setStatus(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const calculateTotal = () => {
    return space && bookingData.duration 
      ? (space.price * bookingData.duration).toFixed(2) 
      : '0.00';
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 md:py-16">
      <div className="card max-w-md w-full mx-4 p-6 md:p-8 bg-white rounded-xl shadow-lg animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 flex items-center justify-center">
          <Book className="mr-3 w-7 h-7 md:w-8 md:h-8 text-blue-600" aria-hidden="true" />
          Book a Space
        </h1>

        {status.loading && (
          <LoadingSpinner message="Loading space details..." />
        )}

        {status.error && !status.loading && (
          <ErrorMessage message={status.error} />
        )}

        {!status.loading && !status.error && space && (
          <BookingForm 
            space={space}
            bookingData={bookingData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            calculateTotal={calculateTotal}
            isSubmitting={status.isSubmitting}
            today={today}
          />
        )}

        {!status.loading && !status.error && !space && allSpaces.length > 0 && (
          <SpaceSelector spaces={allSpaces} onSelect={handleSpaceSelect} />
        )}

        {!status.loading && !status.error && !space && allSpaces.length === 0 && (
          <p className="text-gray-600 text-center py-6 text-lg">
            No spaces available for booking.
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const LoadingSpinner = ({ message }) => (
  <div className="text-center py-6" role="status" aria-live="polite">
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-6 w-6 text-blue-600 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
        />
      </svg>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center py-6 bg-red-50 p-4 rounded-lg shadow-md" role="alert">
    <p className="text-red-600 text-lg">{message}</p>
  </div>
);

const SpaceSelector = ({ spaces, onSelect }) => (
  <div className="space-y-4">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
      Select a Space
    </h2>
    <ul className="space-y-3 max-h-96 overflow-y-auto" role="listbox">
      {spaces.map((space) => (
        <li key={space._id}>
          <button
            type="button"
            onClick={() => onSelect(space)}
            className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="option"
          >
            <h3 className="text-lg font-medium text-gray-800">{space.name}</h3>
            <p className="text-gray-600">{space.location}</p>
            <p className="text-gray-700 font-semibold">${space.price}/hour</p>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const BookingForm = ({
  space,
  bookingData,
  handleChange,
  handleSubmit,
  calculateTotal,
  isSubmitting,
  today
}) => (
  <>
    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
      {space.name}
    </h2>
    <p className="text-gray-600 text-center mb-6 md:mb-8">
      {space.location} - ${space.price}/hour
    </p>
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="bookingDate"
        >
          Booking Date
        </label>
        <input
          type="date"
          id="bookingDate"
          name="bookingDate"
          value={bookingData.bookingDate}
          onChange={handleChange}
          className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          required
          min={today}
          aria-required="true"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="duration"
        >
          Duration (hours)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={bookingData.duration}
          onChange={handleChange}
          min="1"
          step="1"
          className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          required
          aria-required="true"
        />
      </div>
      <div className="text-center">
        <p className="text-gray-700 text-lg font-semibold">
          Total: ${calculateTotal()}
        </p>
      </div>
      <button
        type="submit"
        className="btn-primary w-full py-3 px-6 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              />
            </svg>
            Booking...
          </>
        ) : (
          <>
            <Calendar className="mr-2 w-5 h-5" aria-hidden="true" /> Book Now
          </>
        )}
      </button>
    </form>
  </>
);

export default BookingPage;