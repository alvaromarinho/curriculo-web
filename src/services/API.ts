import { parseCookies } from 'nookies';
import { toast } from "react-toastify";
import axios from 'axios';

export const apiCtx = (ctx?: any) => {
    const api = axios.create({ baseURL: process.env.API_URL });
    const { akToken } = parseCookies(ctx);
    if (akToken) {
        api.defaults.headers['Authorization'] = `Bearer ${akToken}`;
    }

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status == 401) error.response.data = "Authentication failed"
            toast.error(error.response.data || 'Error')
            Promise.reject(error)
        }
    );

    return api;
}

export const api = apiCtx()