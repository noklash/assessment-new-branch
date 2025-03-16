import React from 'react';
import SpaceList from './SpaceList';
import { Shield } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Shield className="mr-2" /> Admin Dashboard
      </h2>
      <SpaceList isAdmin />
    </div>
  );
};

export default AdminDashboard;