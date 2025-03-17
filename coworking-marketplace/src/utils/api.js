import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const getSpaces = async (filters = {}) => {
  try {
    const response = await api.get('/spaces', { params: filters });
    return response.data; // Returns array of spaces
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch spaces' };
  }
};

export const createSpace = async (spaceData) => {
  try {
    const response = await api.post('/spaces', spaceData);
    return response.data; // Returns created space
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create space' };
  }
};

export const updateSpace = async (id, spaceData) => {
  try {
    const response = await api.put(`/spaces/${id}`, spaceData);
    return response.data; // Returns updated space
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update space' };
  }
};

export const deleteSpace = async (id) => {
  try {
    const response = await api.delete(`/spaces/${id}`);
    return response.data; // Returns { message: 'Space deleted' }
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete space' };
  }
};

export const bookSpace = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to book space' };
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch bookings' };
  }
};

export default api;