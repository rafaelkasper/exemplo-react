import axios from 'axios';

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
