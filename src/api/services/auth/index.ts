import axios from 'axios';
import { stringify } from 'qs';

import { AccessTokenResponse } from '@/types';
import { getItemLocalStorage } from '@/utils';

const settingsStorage = getItemLocalStorage('settings');

const url = settingsStorage?.apiUrl ?? '';

const axiosInstance = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

export const loginWithUserNameAndPassword = async (
  userName: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const dataPost = {
      userName,
      password,
    };

    axios
      .post('/login', dataPost)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAccessToken = async (
  code: string,
  codeVerifier?: string
): Promise<AccessTokenResponse | undefined> => {
  const data = stringify({
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier,
  });

  const response = await axiosInstance.post(`${url}/token`, data);

  return response?.data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<AccessTokenResponse | undefined> => {
  const data = stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const response = await axiosInstance.post(`${url}/token`, data);

  return response?.data;
};

export const logout = async (refreshToken: string): Promise<void> => {
  const data = stringify({
    refresh_token: refreshToken,
  });

  await axiosInstance.post(`${url}/logout`, data);
};
