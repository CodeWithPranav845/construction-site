import api from './api.js';
import { toPaginated } from '../utils/helpers.js';

// params: { page, limit, search, category }
export const getProjects = async (params = {}) => {
  const { data } = await api.get('/projects', { params });
  return toPaginated(data.data);
};
export const getProjectById = async (id) => (await api.get(`/projects/${id}`)).data.data;
export const createProject = async (payload) => (await api.post('/projects', payload)).data.data;
export const updateProject = async (id, payload) => (await api.put(`/projects/${id}`, payload)).data.data;
export const deleteProject = async (id) => (await api.delete(`/projects/${id}`)).data;
