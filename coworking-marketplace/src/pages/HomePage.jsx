// src/pages/HomePage.jsx
import React from 'react';
import SpaceList from '../components/SpaceList';
import { Home } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center">
          <Home className="mr-2" size={32} /> Find Your Perfect Co-working Space
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Discover and book co-working spaces tailored to your needs.
        </p>
      </header>
      <SpaceList />
    </div>
  );
};

export default HomePage;