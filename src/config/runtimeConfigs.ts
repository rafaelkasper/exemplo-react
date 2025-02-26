import axios from 'axios';

// Recupera configurações salvas em localStorage
// const settingsStorage = getItemLocalStorage('settings');
// const url = settingsStorage?.apiUrl ?? '';
export const runtimeConfigs = async () => {
  return axios
    .get('/static/config.json')
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
