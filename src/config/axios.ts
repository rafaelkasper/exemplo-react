import axios from 'axios';

const API_BASE_URL = 'https://example.com';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

export default instance;
