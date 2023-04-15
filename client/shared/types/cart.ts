export type Cart = {
  data: {
    cart: {
      items: {
        imgUrl: string;
        name: string;
        price: number;
        id: string;
        quantity: number;
        productId: string;
      }[];
      itemCount: number;
      subTotal: number;
    };
  };
};
