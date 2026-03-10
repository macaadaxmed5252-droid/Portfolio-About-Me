import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5566/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // send httpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Request interceptor ─────────────────────────────────────────────────────
// Attach token from localStorage if available (fallback for non-cookie envs)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear local auth state if unauthorized
            localStorage.removeItem('adminToken');
            // Only redirect if we're on an admin page
            if (window.location.pathname.startsWith('/admin') &&
                window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

// ─── Auth API ────────────────────────────────────────────────────────────────
export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
    updateProfile: (formData) => api.put('/auth/profile', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// ─── Projects API ─────────────────────────────────────────────────────────────
export const projectsAPI = {
    getAll: () => api.get('/projects'),
    getAllAdmin: () => api.get('/projects/admin/all'),
    getById: (id) => api.get(`/projects/${id}`),
    create: (formData) => api.post('/projects', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    update: (id, formData) => api.put(`/projects/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    delete: (id) => api.delete(`/projects/${id}`),
};

// ─── Tech API ─────────────────────────────────────────────────────────────────
export const techsAPI = {
    getAll: () => api.get('/techs'),
    create: (formData) => api.post('/techs', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    update: (id, formData) => api.put(`/techs/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    delete: (id) => api.delete(`/techs/${id}`),
};

// ─── Messages API ─────────────────────────────────────────────────────────────
export const messagesAPI = {
    send: (data) => api.post('/messages', data),
    getAll: () => api.get('/messages'),
    markAsRead: (id) => api.patch(`/messages/${id}/read`),
    delete: (id) => api.delete(`/messages/${id}`),
};

// ─── Subscribers API ─────────────────────────────────────────────────────────
export const subscribersAPI = {
    subscribe: (data) => api.post('/subscribers', data),
    getAll: () => api.get('/subscribers'),
    delete: (id) => api.delete(`/subscribers/${id}`),
};

// ─── Testimonials API ────────────────────────────────────────────────────────
export const testimonialsAPI = {
    submit: (formData) => api.post('/testimonials', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    getApproved: () => api.get('/testimonials'),
    getAllAdmin: () => api.get('/testimonials/admin'),
    approve: (id) => api.put(`/testimonials/admin/${id}`),
    delete: (id) => api.delete(`/testimonials/admin/${id}`),
};

export default api;
