export type Product = {
  _id: string;
  name: string;
  price: number;
  star: number;
  category?: string[];
  imgUrl: string;
  description?: string;
  type: string;
};

export type ProductResponse = {
  data: {
    product: Product[];
  };
};
