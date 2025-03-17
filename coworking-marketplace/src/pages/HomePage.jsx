import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceList from '../components/SpaceList';
import { Home, Search, Filter } from 'lucide-react'; // Added Filter icon

const HomePage = () => {
  const navigate = useNavigate();
  
  // State for filters
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    availableOnly: false,
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      availableOnly: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 md:py-20 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center gap-3 animate-fade-in">
            <Home className="w-8 h-8 md:w-10 md:h-10" /> Find Your Perfect Co-working Space
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-slide-up">
            Discover and book co-working spaces tailored to your needs with ease.
          </p>
          <button
            onClick={() => navigate('/book')}
            className="mt-6 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            aria-label="Explore Spaces Now"
          >
            <Search className="mr-2 w-5 h-5" /> Explore Spaces Now
          </button>
        </div>
      </header>

      {/* Space List Section with Filters */}
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 animate-fade-in">
              Available Spaces
            </h2>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => document.getElementById('filter-section').classList.toggle('hidden')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Filter className="mr-2 w-5 h-5" /> Filters
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div id="filter-section" className="hidden bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="e.g., New York"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price ($/hr)
                </label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  min="0"
                  placeholder="Min"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price ($/hr)
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  min="0"
                  placeholder="Max"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availableOnly"
                  name="availableOnly"
                  checked={filters.availableOnly}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="availableOnly" className="ml-2 text-sm font-medium text-gray-700">
                  Available Only
                </label>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Space List */}
          <SpaceList filters={filters} />
        </div>
      </main>

      {/* Footer (Optional Enhancement) */}
      {/* <footer className="bg-gray-100 py-6 mt-12 text-center">
        <p className="text-gray-600 text-sm md:text-base">
          © 2025 Co-working Marketplace. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default HomePage;