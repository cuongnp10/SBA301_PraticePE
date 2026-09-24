import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ||
        'http://localhost:8080/api'
});
export const get = (endpoint: string) => api.get(endpoint);
export const post = (endpoint: string, data?: any) => api.post(endpoint, data);
export const put = (endpoint: string, data?: any) => api.put(endpoint, data);
export const remove = (endpoint: string) => api.delete(endpoint);