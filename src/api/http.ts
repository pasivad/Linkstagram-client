import axios from 'axios';
import { io } from 'socket.io-client';

const instance = axios.create({
   baseURL: 'http://localhost:4444/api',
});

instance.interceptors.request.use((config) => {
   config.headers.Authorization = window.localStorage.getItem('token');

   return config;
});

export const socket = io('http://localhost:4444');

export default instance;