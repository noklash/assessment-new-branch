// src/utils/api.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend URL differs
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the Authorization header with the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API response errors globally (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// API Functions

// Login to get a JWT token
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Expected: { token: "..." }
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Fetch all spaces with optional filters
export const getSpaces = async (filters = {}) => {
  try {
    const response = await api.get('/spaces', { params: filters });
    return response.data; // Expected: Array of space objects
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch spaces' };
  }
};

// Create a new space (admin only)
export const createSpace = async (spaceData) => {
  try {
    const response = await api.post('/spaces', spaceData);
    return response.data; // Expected: Newly created space object
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create space' };
  }
};

// Update an existing space (admin only)
export const updateSpace = async (id, spaceData) => {
  try {
    const response = await api.put(`/spaces/${id}`, spaceData);
    return response.data; // Expected: Updated space object
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update space' };
  }
};

// Delete a space (admin only)
export const deleteSpace = async (id) => {
  try {
    const response = await api.delete(`/spaces/${id}`);
    return response.data; // Expected: { message: 'Space deleted' }
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete space' };
  }
};

// Book a space
export const bookSpace = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data; // Expected: Newly created booking object
  } catch (error) {
    throw error.response?.data || { message: 'Failed to book space' };
  }
};

// Fetch booking history for the authenticated user
export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data; // Expected: Array of booking objects
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch bookings' };
  }
};

export default api;