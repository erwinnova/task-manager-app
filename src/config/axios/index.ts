import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dummyjson.com/todos',
});

instance.interceptors.response.use(response => response);

export default instance;
