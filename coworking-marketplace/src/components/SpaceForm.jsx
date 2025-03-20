import React, { useState } from 'react';
import { createSpace, updateSpace } from '../utils/api';

const SpaceForm = ({ space = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: space?.name || '',
    location: space?.location || '',
    amenities: space?.amenities?.join(', ') || '',
    price: space?.price || '',
    availability: space?.availability ?? true,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const data = {
      ...formData,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
    };
    try {
      if (space?._id) {
        await updateSpace(space._id, data);
      } else {
        await createSpace(data);
      }
      onSave();
    } catch (error) {
      setError(error.message || 'Failed to save space. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card max-w-lg mx-auto my-10 md:my-12 p-6 md:p-8 bg-white rounded-xl shadow-lg animate-fade-in"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
        {space ? 'Edit Space' : 'Add New Space'}
      </h2>
      {error && (
        <p className="text-red-500 mb-6 text-center bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}
      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="e.g., Creative Hub"
            required
          />
        </div>
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
            value={formData.location}
            onChange={handleChange}
            className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="e.g., 123 Main St, City"
            required
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
            value={formData.amenities}
            onChange={handleChange}
            className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="e.g., Wi-Fi, Coffee, Printer"
            title="Separate amenities with commas"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="price"
          >
            Price ($/hr)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="e.g., 15"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="availability"
          >
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="input-field w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn-primary w-full py-3 px-6 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isSubmitting}
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
              Saving...
            </>
          ) : (
            'Save Space'
          )}
        </button>
      </div>
    </form>
  );
};

export default SpaceForm;