// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Book, LogIn, Shield, Clock } from 'lucide-react';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import BookingHistory from './pages/BookingHistory';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-blue-600 p-4 shadow-md">
        <ul className="flex space-x-6 text-white max-w-6xl mx-auto">
          <li className="flex items-center">
            <Home className="mr-1" size={20} />
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center">
            <Book className="mr-1" size={20} />
            <Link to="/book">Book</Link>
          </li>
          <li className="flex items-center">
            <LogIn className="mr-1" size={20} />
            <Link to="/login">Login</Link>
          </li>
          <li className="flex items-center">
            <Shield className="mr-1" size={20} />
            <Link to="/admin">Admin</Link>
          </li>
          <li className="flex items-center">
            <Clock className="mr-1" size={20} />
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;