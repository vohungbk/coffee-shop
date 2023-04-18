import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { addToCart } from 'shared/services/home';
import { Product } from 'shared/types/product';

type Props = {
  padding?: string;
  imageWidth?: number;
  imageHeight?: number;
  product: Product;
};

const AddToCart = ({
  padding = 'p-[5px]',
  imageWidth = 12,
  imageHeight = 12,
  product,
}: Props) => {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation('addToCart', addToCart, {
    onSuccess: () => {
      window.scroll(0, 0);
      queryClient.invalidateQueries(['cartList']);
    },
    onError: (errors) => {
      console.log(errors);
    },
  });

  const handleAddToCart = () => {
    const params = {
      quantity: 1,
      productId: product._id,
    };

    addToCartMutation.mutate(params);
  };

  return (
    <div
      className={`rounded-full bg-primary cursor-pointer ${padding} hover:opacity-90`}
      onClick={handleAddToCart}
    >
      <Image
        src={'assets/cart_white.svg'}
        alt="logo"
        width={imageWidth}
        height={imageHeight}
      />
    </div>
  );
};

export default AddToCart;
