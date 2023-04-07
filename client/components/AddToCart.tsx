import Image from 'next/image';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { addToCart } from 'shared/services/home';

type Props = {
  padding?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const AddToCart = ({
  padding = 'p-[5px]',
  imageWidth = 12,
  imageHeight = 12,
}: Props) => {
  const tradeConnectMutation = useMutation('addToCart', addToCart, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (errors) => {
      console.log(errors);
    },
  });

  const handleAddToCart = useCallback(() => {
    tradeConnectMutation.mutate();
  }, [tradeConnectMutation]);

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
