import Header from '@components/Header';
import useDataQuery from 'hooks/useQueryData';
import Head from 'next/head';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addToCart, getAllCart } from 'shared/services/home';
import { Cart } from 'shared/types/cart';

const Cart = () => {
  const { data } = useDataQuery('cartList', () => getAllCart()) as Cart;
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
  const handleRemoveItemFromCart = useCallback(
    (productId: string) => {
      const params = {
        quantity: 0,
        productId,
      };
      addToCartMutation.mutate(params);
    },
    [addToCartMutation]
  );

  const handleUpdateItemToCart = useCallback(
    (productId: string, quantity: number, type?: string) => {
      const params = {
        quantity: type === 'Add' ? quantity + 1 : quantity - 1,
        productId,
      };
      addToCartMutation.mutate(params);
    },
    [addToCartMutation]
  );

  return (
    <>
      <Head>
        <title>Your Order Carts</title>
        <meta
          name="description"
          content="Enjoy your coffee before your activity"
        />
      </Head>
      <div className="bg-[#F7EBDA] pt-9 relative h-screen">
        <div className="container my-0 mx-auto relative z-10">
          <Header />
          <div className="my-9 px-5 sm:px-0">
            <h1 className="text-[28px] ">My cart</h1>
            <p className="mt-[10px] text-[#1c1f21]">
              You are eligible for free shipping!
            </p>
          </div>
          <div className="lg:min-h-[385px]px-0">
            <div className="px-0 relative">
              <div className="sm:mb-[30px] rounded-[3px] border border-solid border-[#dfdfdf] relative bg-[#eeeff4] lg:w-[calc(100%_-_380px)]">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead className="hidden sm:table-header-group">
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
                      {data?.cart?.items?.map((item, index) => (
                        <tr
                          key={index}
                          className="sm:border-t border-solid sm:border-[#dfdfdf] block whitespace-normal sm:table-row"
                        >
                          <td className="first:pl-0 sm:first:pl-[30px] sm:py-[26px] sm:px-[30px] block sm:table-cell py-5">
                            <div className="flex items-center">
                              <div className="w-[80px] sm:w-[90px] min-w-[80px] sm:min-w-[90px] mr-5">
                                <div className="pb-[100%] relative mx-auto">
                                  <Image fill src={item?.imgUrl} alt="" />
                                </div>
                              </div>
                              <div>
                                <a className="whitespace-normal block mb-1 transition ease-in-out font-semibold leading-5">
                                  {item?.name}
                                </a>
                                <div>
                                  <span className="inline-block font-semibold text-[#677279]">
                                    {item?.price}$
                                  </span>
                                </div>
                                <div className="flex sm:hidden items-center justify-center mt-3">
                                  <div
                                    style={{
                                      boxShadow:
                                        '0 1px 1px rgba(233,233,233,.2)',
                                    }}
                                    className="inline-flex items-center h-[38px] rounded-md border border-solid border-[#dfdfdf] align-middle mr-2"
                                  >
                                    <button
                                      className="flex items-center px-3 h-full transition-[color] duration-200 ease-in-out touch-manipulation"
                                      onClick={() =>
                                        handleUpdateItemToCart(
                                          item.productId,
                                          item.quantity
                                        )
                                      }
                                      disabled={item.quantity < 1}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="appearance-none px-[5px] min-w-[32px] w-[32px] text-center border-none bg-transparent rounded-none"
                                      value={item?.quantity}
                                    />
                                    <button
                                      className="flex items-center px-3 h-full transition-[color] duration-200 ease-in-out touch-manipulation"
                                      onClick={() =>
                                        handleUpdateItemToCart(
                                          item.productId,
                                          item.quantity,
                                          'Add'
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <a
                                    className="block w-max mx-auto mb-0 text-[14px] text-[#4e5458] transition-[color]"
                                    onClick={() =>
                                      handleRemoveItemFromCart(item.productId)
                                    }
                                  >
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-[26px] sm:px-[30px] sm:py-[15px] text-center hidden sm:table-cell">
                            <div
                              style={{
                                boxShadow: '0 1px 1px rgba(233,233,233,.2)',
                              }}
                              className="inline-flex items-center h-[38px] rounded-md border border-solid border-[#dfdfdf] align-middle"
                            >
                              <button
                                className="flex items-center px-3 h-full transition-[color] duration-200 ease-in-out touch-manipulation"
                                onClick={() =>
                                  handleUpdateItemToCart(
                                    item.productId,
                                    item.quantity
                                  )
                                }
                                disabled={item.quantity < 1}
                              >
                                -
                              </button>
                              <input
                                className="appearance-none px-[5px] min-w-[32px] w-[32px] text-center border-none bg-transparent rounded-none"
                                value={item?.quantity}
                              />
                              <button
                                className="flex items-center px-3 h-full transition-[color] duration-200 ease-in-out touch-manipulation"
                                onClick={() =>
                                  handleUpdateItemToCart(
                                    item.productId,
                                    item.quantity,
                                    'Add'
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <a
                              className="block w-max mt-[10px] mx-auto mb-0 text-[14px] text-[#4e5458] transition-[color]"
                              onClick={() =>
                                handleRemoveItemFromCart(item.productId)
                              }
                            >
                              Remove
                            </a>
                          </td>
                          <td className="sm:last:pr-[30px] py-[26px] sm:px-[30px] sm:py-[15px] text-right text-[#4e5458] hidden sm:table-cell">
                            <span>{item?.total}$</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="absolute right-5 top-0 w-[350px] h-full">
                <div className="lg:sticky lg:t-[254px]">
                  <div className="md:rounded-none relative mb-[18px] bg-[#eeeff4] border border-solid border-t-[#dfdfdf] border-b-[#dfdfdf]">
                    <div className="relative p-5">
                      <div className="flex justify-between items-center mb-1 font-semibold">
                        <span>Total</span>
                        <span>{data?.cart.subTotal}$</span>
                      </div>
                      <div className="break-words my-5 text-[#4e5458">
                        <p>Tax included. Shipping calculated at checkout</p>
                      </div>
                      <button className="w-full bg-primary text-white px-[30px] text-center leading-[55px] transition hover:opacity-90">
                        Check out
                      </button>
                    </div>
                  </div>
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
