import Header from '@components/Header';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Your Order Carts</title>
        <meta
          name="description"
          content="Enjoy your coffee before your activity"
        />
      </Head>
      <div className="bg-[#F7EBDA] pt-9 relative">
        <div className="container my-0 mx-auto relative z-10">
          <Header />
          <div className="my-9 px-5 sm:px-0">
            <h1 className="text-[28px] ">My cart</h1>
            <p className="mt-[10px] text-[#1c1f21]">
              You are eligible for free shipping!
            </p>
          </div>
          <div className="lg:min-h-[385px] px-5 sm:px-0">
            <div className="px-5 sm:px-0">
              <div className="sm:mb-[30px] rounded-[3px] border border-solid border-[#dfdfdf] relative bg-[#eeeff4]">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="sm:first:pl-[30px] sm:px-[30px] sm:py-[15px] text-[#4e5458] font-normal text-left">
                          Product
                        </th>
                        <th className="text-center sm:px-[30px] sm:py-[15px] text-[#4e5458] font-normal">
                          Quantity
                        </th>
                        <th className="sm:last:pr-[30px] text-right sm:px-[30px] sm:py-[15px] text-[#4e5458] font-normal">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-solid border-[#dfdfdf]">
                        <td className="sm:first:pl-[30px] py-[26px] sm:px-[30px] sm:py-[15px]">
                          <div className="flex items-center">
                            <div className="w-[60px] sm:w-[90px] min-w-[60px] sm:min-w-[90px] mr-5">
                              <div className="pb-[100%] relative mx-auto">
                                <Image
                                  fill
                                  src={
                                    'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRqPnxhzG50sOFqBgyKvZtmOHiB3mwkR2YtId5jZG5nApAoiSDkXMK4Rxxqpkfg0ZW9'
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            <div>
                              <a className="whitespace-normal block mb-1 transition ease-in-out font-semibold leading-5">
                                Cappuccino
                              </a>
                              <div>
                                <span className="inline-block font-semibold text-[#677279]">
                                  20$
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-[26px] sm:px-[30px] sm:py-[15px] text-center">
                          <div
                            style={{
                              boxShadow: '0 1px 1px rgba(233,233,233,.2)',
                            }}
                            className="inline-flex items-center h-[38px] rounded-md border border-solid border-[#dfdfdf] align-middle"
                          >
                            <button
                              className="flex items-center px-3 h-full transition-[color] duration-200 ease-in-out touch-manipulation"
                              // onClick={() =>
                              //   handleUpdateItemToCart(
                              //     item.productId,
                              //     item.quantity
                              //   )
                              // }
                              // disabled={item.quantity < 1}
                            >
                              -
                            </button>
                            <input
                              className="appearance-none px-[5px] min-w-[32px] w-[32px] text-center border-none bg-transparent rounded-none"
                              // value={item?.quantity}
                            />
                            <button
                              className="flex items-center px-3 h-full transition-[color] duration-200 ease-in-out touch-manipulation"
                              // onClick={() =>
                              //   handleUpdateItemToCart(
                              //     item.productId,
                              //     item.quantity,
                              //     'Add'
                              //   )
                              // }
                            >
                              +
                            </button>
                          </div>
                          <a
                            className="block w-max mt-[10px] mx-auto mb-0 text-[14px] text-[#4e5458] transition-[color]"
                            // onClick={() =>
                            //   handleRemoveItemFromCart(item.productId)
                            // }
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
