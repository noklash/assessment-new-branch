import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Filter } from 'lucide-react';
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
      setSpaces(Array.isArray(response) ? response : []); // Backend returns array directly
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!isAdmin && (
        <div className="mb-8 bg-gray-100 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter className="mr-2" size={20} /> Filter Spaces
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="e.g., New York"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($/hr)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="e.g., 50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <input
                type="text"
                name="amenities"
                value={filters.amenities}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="e.g., wifi, coffee"
              />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Loading spaces...</p>
        </div>
      )}
      {error && !loading && (
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">No spaces available.</p>
          ) : (
            spaces.map(space => (
              <div key={space._id} className="card">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{space.name}</h3>
                  {!isAdmin && (
                    <button onClick={() => handleBook(space._id)} className="btn-primary text-sm">
                      Book
                    </button>
                  )}
                </div>
                <p className="text-gray-600 flex items-center mt-2">
                  <MapPin className="mr-2" size={16} /> {space.location}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <DollarSign className="mr-2" size={16} /> ${space.price}/hour
                </p>
                <p className="text-gray-500 text-sm mt-2 italic">{space.amenities.join(', ')}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SpaceList;