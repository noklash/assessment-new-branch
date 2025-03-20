import React, { useState, useEffect } from 'react';
import { Shield, Trash2, Edit, MapPin, DollarSign, RefreshCw } from 'lucide-react'; // Added RefreshCw
import SpaceForm from './SpaceForm';
import { getSpaces, deleteSpace } from '../utils/api';

const AdminDashboard = () => {
  const [spaces, setSpaces] = useState([]);
  const [editingSpace, setEditingSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSpaces();
      setSpaces(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      setError(error.message || 'Failed to load spaces. Please try again later.');
      setSpaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this space?')) {
      try {
        await deleteSpace(id);
        fetchSpaces();
      } catch (error) {
        console.error('Error deleting space:', error);
        alert(error.message || 'Failed to delete space.');
      }
    }
  };

  const handleSave = () => {
    setEditingSpace(null);
    fetchSpaces();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center animate-fade-in">
          <Shield className="mr-3 w-8 h-8 md:w-10 md:h-10" /> Admin Dashboard
        </h2>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <button
            onClick={() => setEditingSpace({})}
            className="btn-primary flex items-center px-5 py-2 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Edit className="mr-2 w-5 h-5" /> Add New Space
          </button>
          <button
            onClick={fetchSpaces}
            className="flex items-center px-5 py-2 bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
            aria-label="Refresh spaces"
          >
            <RefreshCw className="mr-2 w-5 h-5" /> Refresh
          </button>
        </div>
      </div>

      {/* Space Form */}
      {editingSpace && (
        <div className="mb-10 md:mb-12">
          <SpaceForm space={editingSpace} onSave={handleSave} />
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

      {/* Spaces List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {spaces.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full text-lg md:text-xl py-12">
              No spaces available. Add a new space to get started!
            </p>
          ) : (
            spaces.map(space => (
              <div
                key={space._id}
                className="card p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                  {space.name}
                </h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <MapPin className="mr-2 w-5 h-5" /> {space.location}
                </p>
                <p className="text-gray-600 flex items-center mt-2">
                  <DollarSign className="mr-2 w-5 h-5" /> ${space.price}/hour
                </p>
                <p className="text-gray-500 text-sm mt-3 italic">
                  {space.amenities.join(', ')}
                </p>
                <p
                  className={`mt-3 font-medium ${
                    space.availability ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  Status: {space.availability ? 'Available' : 'Not Available'}
                </p>
                <div className="flex space-x-6 mt-6">
                  <button
                    onClick={() => setEditingSpace(space)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-colors duration-300"
                    aria-label="Edit space"
                  >
                    <Edit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(space._id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 transition-colors duration-300"
                    aria-label="Delete space"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;