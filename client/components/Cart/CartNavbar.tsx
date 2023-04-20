import Image from 'next/image';

import useDataQuery from 'hooks/useQueryData';
import { getAllCart } from 'shared/services/home';
import { Cart } from 'shared/types/cart';
import Link from 'next/link';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addToCart } from 'shared/services/home';
import PayButton from '@components/PayButton';

const CartIcon = () => {
  const { data } = useDataQuery('cartList', () => getAllCart()) as Cart;
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation('addToCart', addToCart, {
    onSuccess: () => {
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
    <div className="relative group">
      <Image
        src={'assets/cart.svg'}
        alt="logo"
        width={32}
        height={32}
        className="cursor-pointer"
      />
      {!!data?.cart?.itemCount && (
        <span className="absolute -top-[10px] -right-[5px] h-5 w-5 flex items-center justify-center bg-primary rounded-full group-hover:scale-110 transition-transform duration-200">
          {data?.cart?.itemCount}
        </span>
      )}
      <div
        style={{ boxShadow: '0 0 15px -5px rgba(0,0,0,0.4)' }}
        className="absolute -right-16 md:right-2 top-[30px] bg-[#F7EBDA] z-20 hidden group-hover:block"
      >
        <ul className="p-5 m-0 max-h-[600px] min-w-[100vw] md:min-w-[470px]">
          <ul className="max-h-[290px] overflow-auto">
            {data?.cart.items?.length ? (
              data?.cart.items.map((item, index) => (
                <li
                  key={index}
                  className="first:border-t-0 first:mt-0 first:py-3 py-4 border-solid border-t-[1px] border-t-[#e1e1e1]"
                >
                  <div className="flex items-center">
                    <Image
                      src={item?.imgUrl}
                      alt=""
                      width={80}
                      height={80}
                      className="mr-[15px]"
                    />
                    <div className="flex items-start justify-between grow">
                      <div>
                        <p className="text-[#222222]">{item?.name}</p>
                        <div>
                          <span className="text-[13px] text-[#222222] font-semibold">
                            {item?.price}$
                          </span>
                        </div>
                      </div>
                      <div>
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
                          className="block w-max mt-[10px] mx-auto mb-0 text-[14px] transition-[color]"
                          onClick={() =>
                            handleRemoveItemFromCart(item.productId)
                          }
                        >
                          Remove
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center font-medium">
                There are no items in your bag.
              </div>
            )}
          </ul>
          {!!data?.cart?.itemCount && (
            <div className="border-t border-solid border-t-[#dfdfdf] px-[25px] py-[15px]">
              <div className="flex items-center justify-between text-black font-semibold">
                <span>Total</span>
                <span>{data?.cart?.subTotal}$</span>
              </div>
              <div className="mt-4">
                <div className="-m-[10px] flex flex-wrap ">
                  <Link
                    href={'/cart'}
                    className="m-[10px] flex-1 bg-[#4885b3] text-white relative inline-block px-[30px] text-center transition rounded-[2px] leading-[48px] hover:opacity-90"
                  >
                    View cart
                  </Link>
                  <PayButton
                    cartItems={data?.cart?.items}
                    className="m-[10px] flex-1 bg-primary text-white relative inline-block px-[30px] text-center transition rounded-[2px] leading-[48px] hover:opacity-90"
                  />
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CartIcon;
