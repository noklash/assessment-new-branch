import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Filter, Search } from 'lucide-react'; // Added Search icon
import { getSpaces } from '../utils/api';

const SpaceList = ({ isAdmin = false }) => {
  const [spaces, setSpaces] = useState([]);
  const [filters, setFilters] = useState({ location: '', maxPrice: '', amenities: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpaces();
  }, [filters]);

  const fetchSpaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSpaces(filters);
      setSpaces(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      setError(error.message || 'Failed to load spaces. Please try again later.');
      setSpaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBook = (spaceId) => navigate(`/book?spaceId=${spaceId}`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 bg-gray-50">
      {/* Filter Section (Non-Admin Only) */}
      {!isAdmin && (
        <div className="mb-10 md:mb-12 bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Filter className="mr-2 w-6 h-6 text-blue-600" /> Filter Spaces
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., New York"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="maxPrice"
              >
                Max Price ($/hr)
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., 50"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="amenities"
              >
                Amenities
              </label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                value={filters.amenities}
                onChange={handleFilterChange}
                className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., Wi-Fi, Coffee"
                title="Separate amenities with commas"
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mr-3"
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
            <p className="text-gray-600 text-lg md:text-xl">Loading spaces...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12 bg-red-50 p-6 rounded-lg shadow-md">
          <p className="text-red-600 text-lg md:text-xl">{error}</p>
          <button
            onClick={fetchSpaces}
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Spaces Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {spaces.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full text-lg md:text-xl py-12">
              No spaces available. Try adjusting your filters!
            </p>
          ) : (
            spaces.map(space => (
              <div
                key={space._id}
                className="card p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {space.name}
                  </h3>
                  {!isAdmin && (
                    <button
                      onClick={() => handleBook(space._id)}
                      className="btn-primary flex items-center px-4 py-2 text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Search className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Book
                    </button>
                  )}
                </div>
                <p className="text-gray-600 flex items-center mt-2">
                  <MapPin className="mr-2 w-5 h-5 text-gray-500" /> {space.location}
                </p>
                <p className="text-gray-600 flex items-center mt-2">
                  <DollarSign className="mr-2 w-5 h-5 text-gray-500" /> ${space.price}/hour
                </p>
                <p className="text-gray-500 text-sm mt-3 italic">
                  {space.amenities.join(', ')}
                </p>
                {!isAdmin && (
                  <p
                    className={`mt-3 font-medium ${
                      space.availability ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {space.availability ? 'Available' : 'Not Available'}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SpaceList;