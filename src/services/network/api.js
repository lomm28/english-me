import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.HOST}:${process.env.PORT}`,
  timeout: 5000,
});

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  },
);

export default instance;
