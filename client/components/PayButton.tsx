import React from 'react';
import Api from 'shared/config/api';
import { CartItems } from 'shared/types/cart';

type Props = {
  cartItems: CartItems[];
  className?: string;
};

const PayButton = ({ cartItems, className }: Props) => {
  const handleCheckout = () => {
    Api.post('/stripe/create-checkout-session', {
      data: {
        cartItems,
      },
    })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <button
      className={
        className ||
        'w-full bg-primary text-white px-[30px] text-center leading-[55px] transition hover:opacity-90'
      }
      onClick={handleCheckout}
    >
      Check out
    </button>
  );
};

export default PayButton;
