import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Book, LogIn, Shield, Clock, LogOut, Menu, X, UserPlus } from 'lucide-react';

const Navbar = ({ token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 sticky top-0 z-50 shadow-xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-2xl md:text-3xl font-extrabold flex items-center space-x-3 hover:text-blue-100 transition-colors duration-300"
          >
            <Home className="w-8 h-8 md:w-9 md:h-9" />
            <span>CoWorkHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-white font-medium gap-3">
            <Link
              to="/book"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
              <Book className="mr-2 w-5 h-5" />
              Book
            </Link>
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <LogIn className="mr-2 w-5 h-5" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <UserPlus className="mr-2 w-5 h-5" />
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <Shield className="mr-2 w-5 h-5" />
                  Admin
                </Link>
                <Link
                  to="/history"
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <Clock className="mr-2 w-5 h-5" />
                  History
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <LogOut className="mr-2 w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-6 bg-indigo-700/95 backdrop-blur-md rounded-b-2xl shadow-2xl border-t border-blue-800/20 animate-slide-down ">
            <ul className="space-y-4 text-white font-medium px-4 gap-4">
              <li>
                <Link
                  to="/book"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <Book className="mr-3 w-6 h-6" />
                  Book
                </Link>
              </li>
              {!token ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      <LogIn className="mr-3 w-6 h-6" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      <UserPlus className="mr-3 w-6 h-6" />
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      <Shield className="mr-3 w-6 h-6" />
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/history"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      <Clock className="mr-3 w-6 h-6" />
                      History
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      <LogOut className="mr-3 w-6 h-6" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;