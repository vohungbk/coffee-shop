import Head from 'next/head';
import React, { useEffect } from 'react';
import { emptyCart } from 'shared/services/home';

const CheckoutSuccess = () => {
  useEffect(() => {
    try {
      emptyCart();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Coffee Street - Check out succes</title>
        <meta
          name="description"
          content="Enjoy your coffee before your activity"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-[80vh] max-w-[800px] w-full m-auto flex flex-col items-center justify-center">
        <h2 className="mb-2 text-[#029e02]">Checkout Successful</h2>
        <p>Your order might take some time to process.</p>
        <p>Check your order status at your profile after about 10mins.</p>
        <p>
          Incase of any inquiries contact the support at{' '}
          <strong>support@onlineshop.com</strong>
        </p>
      </div>
    </>
  );
};

export default CheckoutSuccess;
