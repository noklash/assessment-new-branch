import React from 'react';
import { Book } from 'lucide-react';

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <Book className="mr-2" /> Book a Space
        </h1>
        <p>Booking form coming soon...</p>
      </div>
    </div>
  );
};

export default BookingPage;