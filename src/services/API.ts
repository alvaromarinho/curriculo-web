import { parseCookies } from 'nookies';
import axios from 'axios';

export const apiCtx = (ctx?: any) => {
    const api = axios.create({ baseURL: process.env.API_URL });
    const { akToken } = parseCookies(ctx);
    if (akToken) 
        api.defaults.headers['Authorization'] = `Bearer ${akToken}`;

    return api;
}

export const api = apiCtx()