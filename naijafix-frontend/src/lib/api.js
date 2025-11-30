import axios from 'axios';

// Use environment variable with fallback for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and auth (if needed)
api.interceptors.request.use(
  (config) => {
    // Log API calls in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data; // Return only the data part
  },
  (error) => {
    // Enhanced error handling
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Network error occurred';

    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: errorMessage
    });

    // You can show user-friendly messages based on status codes
    if (error.response?.status === 404) {
      console.error('📭 Resource not found');
    } else if (error.response?.status === 500) {
      console.error('🔧 Server error - please try again later');
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout - please check your connection');
    }

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      code: error.code
    });
  }
);

export const ReportsAPI = {
  // Get all reports with optional filters
  list: (filters = {}) => api.get('/reports', { params: filters }),
  
  // Get single report by ID
  get: (id) => api.get(`/reports/${id}`),
  
  // Get reports by user
  getByUser: (userid, page = 1, limit = 10) => 
    api.get(`/reports/user/${userid}`, { params: { page, limit } }),
  
  // Create new report
  create: (reportData) => api.post('/reports', reportData),
  
  // Update report (full update)
  update: (id, updateData) => api.put(`/reports/${id}`, updateData),
  
  // Update report status only
  updateStatus: (id, status) => api.patch(`/reports/${id}/status`, { status }),
  
  // Delete report
  delete: (id) => api.delete(`/reports/${id}`),
  
  // Get statistics
  getStats: () => api.get('/reports/stats/summary'),
  
  // Get reports by category
  getByCategory: (category, page = 1, limit = 10) => 
    api.get(`/reports/category/${category}`, { params: { page, limit } }),
  
  // Health check
  health: () => api.get('/health')
};

// Utility function for checking API connectivity
export const checkAPIConnection = async () => {
  try {
    const response = await api.get('/health');
    return {
      connected: true,
      data: response
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
};

export default api;