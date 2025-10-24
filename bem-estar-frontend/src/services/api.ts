import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://REPLACE_WITH_YOUR_LOCAL_IP:3000/api',
  timeout: 15000,
});
