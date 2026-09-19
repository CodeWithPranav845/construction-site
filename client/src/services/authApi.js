import api from './api.js';

/** POST /auth/login -> { token, admin } */
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
};

/** GET /auth/me -> admin profile (requires token) */
export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data.data;
};
