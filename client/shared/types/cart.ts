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
        total: number;
      }[];
      itemCount: number;
      subTotal: number;
    };
  };
};
