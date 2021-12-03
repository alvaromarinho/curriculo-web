import axios from 'axios';
import { parseCookies } from 'nookies';

export const apiCtx = (ctx?: any) => {
    const api = axios.create({ baseURL: process.env.API_URL });
    const { akToken } = parseCookies(ctx);
    if (akToken) {
        api.defaults.headers['Authorization'] = `Bearer ${akToken}`;
    }

    // api.interceptors.response.use(
    //     (response) => response,
    //     (error) => Promise.reject(error)
    // );

    return api;
}

export const api = apiCtx()