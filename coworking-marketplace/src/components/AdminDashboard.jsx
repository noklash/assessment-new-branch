// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Shield, Trash2, Edit, MapPin, DollarSign } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <Shield className="mr-2" size={28} /> Admin Dashboard
      </h2>
      <button
        onClick={() => setEditingSpace({})}
        className="btn-primary mb-6"
      >
        Add New Space
      </button>
      {editingSpace && <SpaceForm space={editingSpace} onSave={handleSave} />}
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
              <div key={space._id} className="card relative">
                <h3 className="text-xl font-semibold text-gray-800">{space.name}</h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <MapPin className="mr-2" size={16} /> {space.location}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <DollarSign className="mr-2" size={16} /> ${space.price}/hour
                </p>
                <p className="text-gray-500 text-sm mt-2 italic">{space.amenities.join(', ')}</p>
                <p className="text-gray-600 mt-1">
                  Status: {space.availability ? 'Available' : 'Not Available'}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setEditingSpace(space)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit space"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(space._id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete space"
                  >
                    <Trash2 size={20} />
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