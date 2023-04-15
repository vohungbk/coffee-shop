/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart } from 'shared/types/cart';
import api from '../config/api';
import { ProductResponse } from 'shared/types/product';

export const getAllProduct = () => {
  return api
    .get(`product`)
    .then((response: any) => response?.data as ProductResponse[]);
};

export const addToCart = (params: { quantity: number; productId: string }) => {
  return api.post(`cart/addToCart`, {
    data: params,
  });
};

export const getAllCart = () => {
  return api.get(`cart`).then((response: any) => response?.data as Cart);
};
