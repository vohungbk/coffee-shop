export type Cart = {
  data: {
    cart: {
      items: CartItems[];
      itemCount: number;
      subTotal: number;
    };
  };
};

export type CartItems = {
  imgUrl: string;
  name: string;
  price: number;
  id: string;
  quantity: number;
  productId: string;
  total: number;
};
