import axios from 'axios';

const BASE_URL = "http://localhost:5000/api";

export const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials : true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add request interceptor to handle errors
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from cookies
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('jwt='))
            ?.split('=')[1];

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);