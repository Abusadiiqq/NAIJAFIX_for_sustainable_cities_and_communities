import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const ReportsAPI = {
  list: () => api.get('/reports'),
  getByUser: (userid) => api.get(`/reports/user/${userid}`),
  create: (reportData) => api.post('/reports', reportData),
  update: (id, updateData) => api.put(`/reports/${id}`, updateData),
  delete: (id) => api.delete(`/reports/${id}`),
  getStats: () => api.get('/reports/stats/summary') // ← MAKE SURE THIS EXISTS
};

export default api;