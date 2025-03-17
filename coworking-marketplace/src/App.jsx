import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import BookingHistory from './pages/BookingHistory';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const ProtectedRoute = ({ children, isAdmin = false }) => {
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
    if (!token) return <Navigate to="/login" />;
    if (isAdmin && user?.role !== 'admin') return <Navigate to="/" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage setToken={setToken} />} />
        <Route path="/admin" element={<ProtectedRoute isAdmin><AdminDashboard /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;