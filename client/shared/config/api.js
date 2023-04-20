import axios from 'axios';
import { API_URL } from 'shared/constants/common';
import Cookies from 'js-cookie';

const defaultOptions = {
  withCredentials: false,
};

const headerDefault = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${Cookies.get('accessToken')}`,
  };
};

function getApi(path, option = {}, apiURL) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...option,
    headers: {
      ...headerDefault(),
      ...option?.headers,
    },
  });
}

function postApi(path, option = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, '')}`, option?.data, {
    ...defaultOptions,
    ...option,
    headers: {
      ...headerDefault(),
      ...option?.headers,
    },
  });
}

function putApi(path, option = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, '')}`, option?.data, {
    ...defaultOptions,
    ...option,
    headers: {
      ...headerDefault(),
      ...option.headers,
    },
  });
}

function deleteApi(path, option = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...option,
    headers: {
      ...headerDefault(),
      ...option.headers,
    },
  });
}

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
};

export default Api;
