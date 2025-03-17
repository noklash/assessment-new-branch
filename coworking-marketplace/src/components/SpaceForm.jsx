import React, { useState } from 'react';
import { createSpace, updateSpace } from '../utils/api';

const SpaceForm = ({ space = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: space?.name || '',
    location: space?.location || '',
    amenities: space?.amenities?.join(', ') || '',
    price: space?.price || '',
    availability: space?.availability ?? true, // Default to true if not specified
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {space ? 'Edit Space' : 'Add New Space'}
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., wifi, coffee"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/hr)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="input-field"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">Save Space</button>
      </div>
    </form>
  );
};

export default SpaceForm;