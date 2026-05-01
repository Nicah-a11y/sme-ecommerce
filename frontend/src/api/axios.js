import axios from 'axios';

const api = axios.create({
  baseURL: 'https://friendly-guide-7vgpxqx7xq592pqqp-5000.app.github.dev/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export default api;
