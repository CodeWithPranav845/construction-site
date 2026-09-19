import api from './api.js';
import { toPaginated } from '../utils/helpers.js';

export const getTeam = async (params = {}) => {
  const { data } = await api.get('/team', { params });
  return toPaginated(data.data);
};
export const createTeamMember = async (payload) => (await api.post('/team', payload)).data.data;
export const updateTeamMember = async (id, payload) => (await api.put(`/team/${id}`, payload)).data.data;
export const deleteTeamMember = async (id) => (await api.delete(`/team/${id}`)).data;
