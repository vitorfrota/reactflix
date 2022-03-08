import axios from 'axios';

import getLocale from '@/utils/getLocale';

const API_KEY = String(import.meta.env.VITE_TMDB_API_KEY);
const PROD_MODE = true; // Boolean(import.meta.env.PROD);

// const BASE_URL = String(import.meta.env.VITE_TMDB_BASE_URL);
const BASE_LOCAL_URL = String(import.meta.env.VITE_API_LOCAL_URL);

const locale = getLocale();

const params = PROD_MODE ? { api_key: API_KEY, language: locale } : null;

const api = axios.create({
   baseURL: PROD_MODE ? 'https://api.themoviedb.org/3/' : BASE_LOCAL_URL,
   params,
});

export default api;
