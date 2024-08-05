import { parseCookies } from 'nookies';
import axios from 'axios';

export const apiCtx = (ctx?: any) => {
    const api = axios.create({ baseURL: process.env.API_URL });
    const { akToken } = parseCookies(ctx);
    if (akToken) {
        api.defaults.headers['Authorization'] = `Bearer ${akToken}`;
        api.defaults.headers['Cache-Control'] = 'no-cache';
        api.defaults.headers['Pragma'] = 'no-cache';
        api.defaults.headers['Expires'] = '0';
    }

    return api;
}

export const api = apiCtx()