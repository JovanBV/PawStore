import axios from 'axios';
import { triggerClearAuth } from './authEventEmitter';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json'}
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401){
            localStorage.removeItem('authToken');
            triggerClearAuth();
        }
        return Promise.reject(error);
    }
)

export default client;