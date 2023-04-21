import Image from 'next/image';

import AddToCart from './Cart/AddToCart';
import Header from './Header';
import { Product } from 'shared/types/product';

type Props = {
  handleClickMoreMenu: () => void;
  product: Product[];
};

const Hero = ({ handleClickMoreMenu, product }: Props) => {
  const item = product?.[0];

  return (
    <div className="bg-[#F7EBDA] pt-9 relative">
      <div className="container my-0 mx-auto relative z-10 pb-[396px]">
        <Header />
        <section className="mt-[82px] flex items-center justify-center lg:justify-between flex-wrap">
          <div className="max-w-[489px] px-4 sm:px-0 mb-4 sm:mb-0">
            <h1 className="font-semibold text-[48px] leading-[72px] text-secondary mb-6 text-center sm:text-left">
              Enjoy your <span className="text-primary">coffee</span>
              <br /> before your activity
            </h1>
            <p className="text-light text-[18px] leading-[27px] max-w-[393px] mb-8">
              Boost your productivity and build your mood with a glass of coffee
              in the morning
            </p>
            <div className="flex items-center gap-4 sm:gap-[26px]">
              <button
                className="flex items-center gap-[10px] bg-secondary rounded-[33px] py-4 px-8 hover:scale-110 transition-all duration-300"
                style={{ boxShadow: '0px 4px 32px rgba(223, 195, 124, 0.25)' }}
              >
                <span className="text-white font-semibold">Order now</span>
                {product && <AddToCart product={item} />}
              </button>
              <button
                className="bg-transparent text-primary px-8 py-[10px]"
                onClick={handleClickMoreMenu}
              >
                More menu
              </button>
            </div>
          </div>
          <div className="rounded-full bg-[#2F2105] aspect-square w-full h-auto sm:w-[416px] sm:h-[416px] flex items-center justify-center relative">
            <Image
              src={'assets/coffee.svg'}
              alt="logo"
              width={350}
              height={350}
            />
            <div
              style={{
                background:
                  'linear-gradient(92.95deg, rgba(255, 255, 255, 0.4) 0.82%, rgba(255, 255, 255, 0.7) 96.47%)',
              }}
              className="backdrop-blur-[2px] rounded-[42px] p-[6px] absolute top-[25px] left-0 sm:-left-[74px]"
            >
              <div className="bg-white rounded-[42px] text-center py-[14px] px-[27px] text-secondary font-semibold text-2xl min-w-[225px]">
                {item?.name}
              </div>
            </div>
            <div
              style={{
                background:
                  'linear-gradient(92.95deg, rgba(255, 255, 255, 0.4) 0.82%, rgba(255, 255, 255, 0.7) 96.47%)',
              }}
              className="backdrop-blur-[2px] rounded-[42px] p-[6px] absolute top-[140px] sm:top-[88px] right-0 sm:-right-[36px]"
            >
              <div className="bg-white rounded-[42px] text-center py-[14px] px-[27px] text-secondary font-semibold text-2xl min-w-[150px] flex justify-center gap-1">
                {item?.star}
                <Image
                  src={'assets/star.svg'}
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div
              style={{
                background:
                  'linear-gradient(92.95deg, rgba(255, 255, 255, 0.4) 0.82%, rgba(255, 255, 255, 0.7) 96.47%)',
              }}
              className="backdrop-blur-[2px] rounded-[42px] p-[6px] absolute bottom-[23px] left-[15px]"
            >
              <div className="bg-white rounded-[42px] py-[14px] px-[27px] text-secondary font-semibold text-2xl min-w-[150px] flex justify-center">
                {item?.price}$
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-hero-pattern-top bg-no-repeat absolute top-0 -right-20">
        <Image
          src={'assets/bg_img_hero.svg'}
          width={600}
          height={400}
          alt=""
          className="invisible"
        />
      </div>
      <div className="bg-hero-pattern-bottom bg-no-repeat absolute bottom-4 left-0">
        <Image
          src={'assets/bg_img_hero_bottom.svg'}
          width={600}
          height={400}
          alt=""
          className="invisible"
        />
      </div>
    </div>
  );
};

export default Hero;
