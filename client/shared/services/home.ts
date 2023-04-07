/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../config/api';

export const getOrderSaleEventInfo = () => {
  return api.get(`posts`).then((response: any) => response?.data);
};

export const addToCart = () => {
  return api.post(`posts`, { data: { name: 'test', price: 2 } });
};
