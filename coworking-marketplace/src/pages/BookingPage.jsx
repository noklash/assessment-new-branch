import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Book, Calendar, AlertCircle } from 'lucide-react';
import { bookSpace, getSpaces } from '../utils/api';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const spaceId = new URLSearchParams(location.search).get('spaceId');

  const [space, setSpace] = useState(null);
  const [allSpaces, setAllSpaces] = useState([]);
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    duration: null,
  });
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    isSubmitting: false,
  });

  // Fetch spaces with memoized callback
  const fetchSpaces = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getSpaces(spaceId ? { _id: spaceId } : {});
      const spaces = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];
      
      if (spaceId) {
        const foundSpace = spaces.find((s) => s._id === spaceId);
        if (foundSpace) {
          setSpace(foundSpace);
        } else {
          throw new Error('Space not found');
        }
      } else {
        setAllSpaces(spaces);
      }
    } catch (error) {
      console.error('Error fetching spaces:', error);
      setStatus((prev) => ({
        ...prev,
        error: error.message || 'Failed to fetch space details. Please try again.',
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, [spaceId]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? Math.max(1, parseInt(value, 10) || 1) : value,
    }));
  };

  const handleSpaceSelect = (selectedSpace) => {
    setSpace(selectedSpace);
    navigate(`?spaceId=${selectedSpace._id}`, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!space || !bookingData.bookingDate || !bookingData.duration) {
      setStatus((prev) => ({ ...prev, error: 'Please fill in all required fields.' }));
      return;
    }
    setStatus((prev) => ({ ...prev, error: null, isSubmitting: true }));
    try {
      await bookSpace({ spaceId: space._id, ...bookingData });
      navigate('/history', { state: { success: 'Booking successful!' } });
      setBookingData({ bookingDate: '', duration: 1 }); // Reset form
    } catch (error) {
      console.error('Booking error:', error);
      setStatus((prev) => ({
        ...prev,
        error: error.message || 'Booking failed. Please try again.',
      }));
    } finally {
      setStatus((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const calculateTotal = () => {
    return space && bookingData.duration
      ? (space.price * bookingData.duration).toFixed(2)
      : '0.00';
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          <Book className="mr-3 h-8 w-8 text-indigo-600" aria-hidden="true" />
          Book a Space
        </h1>

        {status.loading && <LoadingSpinner message="Loading space details..." />}
        {status.error && !status.loading && <ErrorMessage message={status.error} />}
        
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
          <p className="text-gray-500 text-center py-6 text-lg font-medium">
            No spaces available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const LoadingSpinner = ({ message }) => (
  <div className="flex items-center justify-center py-8" role="status" aria-live="polite">
    <svg
      className="animate-spin h-6 w-6 text-indigo-600 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
      />
    </svg>
    <span className="text-gray-600 text-lg">{message}</span>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div
    className="flex items-center justify-center py-6 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-inner"
    role="alert"
  >
    <AlertCircle className="h-6 w-6 text-red-600 mr-3" aria-hidden="true" />
    <p className="text-red-700 text-lg">{message}</p>
  </div>
);

const SpaceSelector = ({ spaces, onSelect }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-gray-900 text-center">Choose a Space</h2>
    <ul className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {spaces.map((space) => (
        <li key={space._id}>
          <button
            type="button"
            onClick={() => onSelect(space)}
            className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={`Select ${space.name} in ${space.location}`}
          >
            <h3 className="text-lg font-medium text-gray-800">{space.name}</h3>
            <p className="text-gray-600 text-sm">{space.location}</p>
            <p className="text-indigo-600 font-semibold">${space.price}/hour</p>
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
  today,
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900">{space.name}</h2>
      <p className="text-gray-600 mt-1">
        {space.location} • <span className="text-indigo-600 font-medium">${space.price}/hour</span>
      </p>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
          Booking Date
        </label>
        <input
          type="date"
          id="bookingDate"
          name="bookingDate"
          value={bookingData.bookingDate}
          onChange={handleChange}
          min={today}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-100"
          disabled={isSubmitting}
          aria-required="true"
          aria-describedby="bookingDate-error"
        />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
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
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-100"
          disabled={isSubmitting}
          aria-required="true"
          aria-describedby="duration-error"
        />
      </div>
      <div className="text-center">
        <p className="text-gray-900 text-lg font-semibold">
          Total: <span className="text-indigo-600">${calculateTotal()}</span>
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
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
            <Calendar className="h-5 w-5 mr-2" aria-hidden="true" />
            Book Now
          </>
        )}
      </button>
    </form>
  </div>
);

export default BookingPage;