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
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-extrabold flex items-center space-x-2 hover:text-blue-100 transition-colors duration-300"
        >
          <Home className="w-8 h-8" />
          <span>CoWorkHub</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          <Link
            to="/book"
            className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/30 hover:text-blue-100 transition-all duration-300 ease-in-out"
          >
            <Book className="mr-2 w-5 h-5" />
            Book
          </Link>
          {!token ? (
            <>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/30 hover:text-blue-100 transition-all duration-300 ease-in-out"
              >
                <LogIn className="mr-2 w-5 h-5" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/30 hover:text-blue-100 transition-all duration-300 ease-in-out"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/30 hover:text-blue-100 transition-all duration-300 ease-in-out"
              >
                <Shield className="mr-2 w-5 h-5" />
                Admin
              </Link>
              <Link
                to="/history"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/30 hover:text-blue-100 transition-all duration-300 ease-in-out"
              >
                <Clock className="mr-2 w-5 h-5" />
                History
              </Link>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-600/30 hover:text-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                <LogOut className="mr-2 w-5 h-5" />
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white p-2 rounded-full hover:bg-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-colors duration-300"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-indigo-700/95 backdrop-blur-md p-6 rounded-b-2xl shadow-2xl border-t border-blue-800/20 animate-slide-down">
          <ul className="space-y-4 text-white font-medium">
            <li>
              <Link
                to="/book"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out"
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
                    className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out"
                  >
                    <LogIn className="mr-3 w-6 h-6" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out"
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
                    className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out"
                  >
                    <Shield className="mr-3 w-6 h-6" />
                    Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-blue-600/40 hover:text-blue-100 transition-all duration-300 ease-in-out"
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
    </nav>
  );
};

export default Navbar;