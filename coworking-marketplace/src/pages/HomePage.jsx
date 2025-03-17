// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // For CTA navigation
import SpaceList from '../components/SpaceList';
import { Home, Search } from 'lucide-react'; // Added Search icon

const HomePage = () => {
  const navigate = useNavigate(); // For navigating to booking page

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

      {/* Space List Section */}
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left animate-fade-in">
            Available Spaces
          </h2>
          <SpaceList />
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