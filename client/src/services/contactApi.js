import api from './api.js';
import { toPaginated } from '../utils/helpers.js';

/** Public: POST /inquiries */
export const submitInquiry = async (payload) => (await api.post('/inquiries', payload)).data;

/** Admin: GET /inquiries */
export const getInquiries = async (params = {}) => {
  const { data } = await api.get('/inquiries', { params });
  return toPaginated(data.data);
};
/** Admin: PATCH /inquiries/:id  (body: { status: 'new' | 'contacted' | 'resolved' }) */
export const updateInquiryStatus = async (id, status) =>
  (await api.patch(`/inquiries/${id}`, { status })).data.data;
/** Admin: DELETE /inquiries/:id */
export const deleteInquiry = async (id) => (await api.delete(`/inquiries/${id}`)).data;
