import Api from 'shared/config/api';

export const login = (params: { email: string; password: string }) => {
  return Api.post('auth/login', {
    data: params,
  }).then((res) => res?.data);
};

export const register = (params: { email: string; password: string }) => {
  return Api.post('auth/register', {
    data: params,
  }).then((res) => res?.data);
};
