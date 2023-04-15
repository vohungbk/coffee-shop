export type Product = {
  id: string;
  name: string;
  price: number;
  star: number;
  category?: string[];
  imgUrl: string;
  description?: string;
};

export type ProductResponse = {
  data: {
    product: Product[];
  };
};
