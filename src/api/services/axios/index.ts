import axios from 'axios';

import { getItemLocalStorage } from '@/utils';

// Recupera configurações salvas em localStorage
const settingsStorage = getItemLocalStorage('settings');
const url = settingsStorage?.apiUrl ?? '';

//Configuração do axios
const axiosInstance = axios.create({
  baseURL: url,
  timeout: 12000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  },
});

export default axiosInstance;
