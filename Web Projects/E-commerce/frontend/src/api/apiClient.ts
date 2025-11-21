import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

export default apiClient;

export const getJSON = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
    const res = await apiClient.get<T>(url, { signal });
    return res.data;
}