import api from './api.js';
import { toPaginated } from '../utils/helpers.js';

export const getTestimonials = async (params = {}) => {
  const { data } = await api.get('/testimonials', { params });
  return toPaginated(data.data);
};
export const createTestimonial = async (payload) => (await api.post('/testimonials', payload)).data.data;
export const updateTestimonial = async (id, payload) => (await api.put(`/testimonials/${id}`, payload)).data.data;
export const deleteTestimonial = async (id) => (await api.delete(`/testimonials/${id}`)).data;
