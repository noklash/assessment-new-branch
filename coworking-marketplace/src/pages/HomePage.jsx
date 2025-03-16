import React from 'react';
import SpaceList from '../components/SpaceList';
import { Home } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6 flex items-center justify-center">
        <Home className="mr-2" /> Co-working Spaces
      </h1>
      <SpaceList />
    </div>
  );
};

export default HomePage;