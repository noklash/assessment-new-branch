import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign } from 'lucide-react';

const SpaceList = ({ isAdmin = false }) => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/spaces', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setSpaces(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBook = (spaceId) => navigate(`/book?spaceId=${spaceId}`);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {spaces.map(space => (
          <div key={space._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">{space.name}</h3>
            <p className="text-gray-600 flex items-center">
              <MapPin className="mr-1" size={16} /> {space.location}
            </p>
            <p className="text-gray-600 flex items-center">
              <DollarSign className="mr-1" size={16} /> ${space.price}/hour
            </p>
            {!isAdmin && (
              <button
                onClick={() => handleBook(space._id)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceList;