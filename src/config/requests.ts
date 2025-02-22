import axiosFiles from 'axios';
import axios from './axios';

const errorHandler = (error: any): string => {
  let message = '';

  if (!error) {
    message = 'Erro interno de servidor.';
  } else {
    const { status } = error?.response || 500;
    message = error?.response?.data?.messages || 500;

    switch (status) {
      case 404:
        message = `Não foi possível comunicar com servidor da aplicação. Código: ${status}`;
        break;
      case 401:
        message = `Acesso negado, favor faça o login. Código: ${status}`;
        break;
      case 500:
        message = 'Servidor indisponível no momento';
        break;

      default:
        if (!message) {
          message = 'Servidor indisponível no momento';
        }
        break;
    }
  }

  return message;
};

const loginErrorHandler = (error: any): string => {
  let message = '';

  if (!error) {
    message = 'Servidor fora do ar!';
  } else {
    const { status } = error?.response || 500;
    message = error?.response?.data?.messages;

    if (message) {
      return message;
    }

    if (status === 404) {
      message = 'Caminho não encontrado!';
    } else {
      message = 'Servidor fora do ar!';
    }
  }

  return message;
};

const getRequest = (
  url: string,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
): Promise<any> =>
  axios
    .get(url)
    .then((response) => {
      const { data } = response;

      resolve(data);
    })
    .catch((error) => {
      const messages = errorHandler(error);

      reject(messages);
    });

const getRequestWithParams = (
  url: string,
  resolve: (value: any) => void,
  reject: (reason?: any) => void,
  params: any
): Promise<any> =>
  axios
    .get(url, {
      params: { ...params },
    })
    .then((response) => {
      const { data } = response;
      resolve(data);
    })
    .catch((error) => {
      const messages = errorHandler(error);

      reject(messages);
    });

const postRequest = async (
  url: string,
  data: any,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
): Promise<any> => {
  return axios
    .post(url, data)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      const messages = errorHandler(error);
      reject(messages);
    });
};

const postFilesRequest = async (
  url: string,
  data: any,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
): Promise<any> => {
  return axiosFiles
    .post(url, data, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      const messages = errorHandler(error);
      reject(messages);
    });
};

const putRequest = async (
  url: string,
  data: any,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
): Promise<any> => {
  return axios
    .put(url, data)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      const messages = errorHandler(error);
      reject(messages);
    });
};

const deleteRequest = async (
  url: string,
  data: any,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
): Promise<any> => {
  return axios
    .delete(url, {
      data: { ...data },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      const messages = errorHandler(error);
      reject(messages);
    });
};

const deleteRequestWithAuthorization = async (
  url: string,
  authorization: string,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
): Promise<any> => {
  return axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`,
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      const messages = errorHandler(error);
      reject(messages);
    });
};

export {
  errorHandler,
  loginErrorHandler,
  getRequest,
  getRequestWithParams,
  postRequest,
  postFilesRequest,
  putRequest,
  deleteRequest,
  deleteRequestWithAuthorization,
};
