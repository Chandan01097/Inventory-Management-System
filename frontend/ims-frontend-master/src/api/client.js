import axios from 'axios';

const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090' });
export const errorMessage = (error) => error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Unable to complete the request.';
export default client;
