import api from './api.js';
import { toPaginated } from '../utils/helpers.js';

// params: { page, limit, search, featured }
export const getServices = async (params = {}) => {
  const { data } = await api.get('/services', { params });
  return toPaginated(data.data);
};
export const getServiceById = async (id) => (await api.get(`/services/${id}`)).data.data;
export const createService = async (payload) => (await api.post('/services', payload)).data.data;
export const updateService = async (id, payload) => (await api.put(`/services/${id}`, payload)).data.data;
export const deleteService = async (id) => (await api.delete(`/services/${id}`)).data;
