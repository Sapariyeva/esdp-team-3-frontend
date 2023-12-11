import axios from 'axios'
import { Store } from 'redux';

let store: Store

export const injectStore = (_store: Store) => {
    store = _store
}

const port = 8000;
export const API_URL = `http://localhost:${port}`;

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config) => {
    localStorage.setItem('token', config.data.payload.accessToken);
    return config;
}, async (error) => {
    console.log(error.response);
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Unauthorized');
        }
    }
    throw error;
})