import axios from 'axios';
import { mockAdapter } from './mockAdapter.js';

export const TOKEN_KEY = 'buildcraft_token';

// VITE_USE_MOCK=true  -> requests never leave the browser (demo data, see mockAdapter.js)
// VITE_USE_MOCK=false -> requests go to the real Express backend
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  ...(USE_MOCK ? { adapter: mockAdapter } : {}),
});

// Attach the admin JWT (if any) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the token expired while the admin is working, send them back to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = Boolean(localStorage.getItem(TOKEN_KEY));
    if (error.response?.status === 401 && hadToken) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.assign('/admin/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
