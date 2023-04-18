import Head from 'next/head';
import Hero from '@components/Hero';
import CardItems from '@components/CardItems';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { ProductResponse } from 'shared/types/product';
import useDataQuery from 'hooks/useQueryData';
import { getAllProduct } from 'shared/services/home';

const DeliveryServices = [
  {
    id: 1,
    title: 'Choose your  coffee',
    subTitle: 'There are 20+ coffees for you',
    imgUrl: '/assets/tap.png',
  },
  {
    id: 2,
    title: 'We delivery it to you',
    subTitle: 'Choose delivery service',
    imgUrl: '/assets/coffee-cup.png',
  },
  {
    id: 3,
    title: 'Enjoy your coffee',
    subTitle: 'Choose delivery service',
    imgUrl: '/assets/food-truck.png',
  },
];

const User = [
  {
    id: 1,
    name: 'Azura',
    text: 'The coffee menu here is very much',
    imgUrl: '/assets/user1.png',
  },
  {
    id: 2,
    name: 'Naura',
    text: 'I really love the cappucino, the coffee was very smooth',
    imgUrl: '/assets/user2.png',
  },
  {
    id: 3,
    name: 'John',
    text: 'This coffee shop is very convenient',
    imgUrl: '/assets/user3.png',
  },
];

export default function Home() {
  const popularRef = useRef<HTMLDivElement>(null);
  const { data } = useDataQuery('product', () =>
    getAllProduct()
  ) as ProductResponse;

  const handleClickMoreMenu = useCallback(() => {
    window.scrollTo({
      top: popularRef?.current?.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Head>
        <title>Coffee Street</title>
        <meta
          name="description"
          content="Enjoy your coffee before your activity"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero handleClickMoreMenu={handleClickMoreMenu} product={data?.product} />
      <section className="-mt-[300px]">
        <div
          className="container m-0 sm:m-auto relative pl-3 pr-3 sm:pl-[49px] sm:pr-[64px] pb-10 pt-5 sm:pt-0 sm:pb-[67px]"
          ref={popularRef}
        >
          <p className="font-semibold text-[32px] relative before:content-[''] before:absolute before:right-0 before:-bottom-[6px] before:bg-primary before:rounded-xl before:w-[74px] before:h-1 inline-block mb-5 sm:mb-[38px] z-20">
            Popular Now
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-[38px]">
            {data?.product?.slice(0, 3)?.map((item) => (
              <div
                key={item._id}
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.7) 100%)',
                }}
                className="p-[6px] rounded-xl z-10"
              >
                <CardItems data={item} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-full lg:h-[376px] bg-accents rounded-[64px]"></div>
        </div>
      </section>
      <section
        className="mt-[120px] container m-auto px-[48px] pb-[120px] lg:pb-[208px]"
        id="delivery"
      >
        <h2 className="font-semibold text-[32px] leading-[48px] relative before:content-[''] before:absolute before:right-0 before:-bottom-[6px] before:bg-primary before:rounded-xl before:w-[123px] before:h-1 inline-block mb-8">
          How to use delivery service
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:gap-[30px]">
          {DeliveryServices.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center pt-4 pb-[27px] "
            >
              <Image src={item.imgUrl} alt="logo" width={159} height={159} />
              <p className="mt-[17px] text-secondary font-semibold text-2xl">
                {item.title}
              </p>
              <p className="text-[18px] text-secondary">{item.subTitle}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-exclude h-[484px] bg-[#F6EBDA] bg-no-repeat bg-100% bg-blend-overlay relative pt-10 sm:pt-[84px]">
        <div
          className="rounded-xl p-[5px] w-[370px] absolute lg:left-[100px] xl:left-[235px] -top-[88px] hidden lg:block"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
          }}
        >
          <Image
            src={'/assets/coffee-cup-2.png'}
            alt="logo"
            width={359}
            height={497}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" id="about">
          <div className="col-start-2 col-span-4">
            <h2 className="font-semibold text-[32px] leading-[48px] relative before:content-[''] before:absolute before:right-0 before:-bottom-[6px] before:bg-primary before:rounded-xl before:w-[43px] before:h-1 mb-[30px] inline-block">
              About us
            </h2>
            <p className="font-semibold text-2xl max-w-[348px] mb-4">
              We provide quality coffee, and ready to deliver.
            </p>
            <p className="max-w-[478px] text-light text-[18px] leading-[27px] mb-8">
              We are a company that makes and distributes delicious drinks. our
              main product is made with a secret recipe and available in stores
              worldwide.
            </p>
            <button className="py-[10px] px-6 bg-secondary rounded-[32px] text-[#F4AE26] font-bold text-[12px] leading-[18px] hover:scale-110 transition-all duration-200">
              Get your coffee
            </button>
          </div>
        </div>
      </section>
      <section
        className="py-10 sm:py-[120px] px-3 sm:px-6 lg:px-[146px] bg-white"
        id="product"
      >
        <h2 className="font-semibold text-[32px] leading-[48px] relative before:content-[''] before:absolute before:right-0 before:-bottom-[6px] before:bg-primary before:rounded-xl before:w-[121px] before:h-1 mb-[34px] inline-block">
          Special menu for you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.product
            ?.filter((item) => item?.type === 'special')
            .sort((record1, record2) => record2.star - record1.star)
            .map((item) => (
              <CardItems
                key={item._id}
                data={item}
                className="drop-shadow-custom"
              />
            ))}
        </div>
      </section>
      <section className="relative">
        <div className="bg-exclude h-[1300px] sm:h-[484px] w-full sm:w-[945px] bg-[#F6EBDA] bg-no-repeat bg-100% bg-blend-overlay rounded-br-3xl rounded-tr-3xl"></div>
        <div className="absolute top-3 lg:top-[102px] left-3 sm:left-0 lg:left-[136px] flex items-center flex-col lg:flex-row">
          <div className="flex flex-col mb-4 lg:mb-0 mr-1 sm:mr-[60px]">
            <h2 className="font-semibold text-[32px] mb-4">
              What they say about us
            </h2>
            <p className="text-light text-[18px] max-w-full sm:max-w-[352px]">
              We always provide the best service and always maintain the quality
              of coffee
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[84px]">
            {User.map((item) => (
              <div key={item.id} className="relative max-h-[280px]">
                <Image
                  src={item.imgUrl}
                  alt=""
                  width={214}
                  height={280}
                  className="h-full"
                />
                <div className="bg-[#FFCB7C] border-[6px] border-solid border-border p-3 rounded-lg max-w-[226px] absolute left-[30px] bottom-[22px] -right-[50px]">
                  <p className="text-secondary font-medium text-[18px]">
                    {item.name}
                  </p>
                  <p className="text-secondary text-[14px]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 md:py-[80px] lg:py-[120px] px-3 md:px-10 lg:px-[135px]">
        <div
          className="py-[133px] rounded-3xl flex justify-center items-center flex-col"
          style={{
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/assets/bg-newsletter.png) no-repeat center center fixed ',
            backgroundSize: 'cover',
          }}
        >
          <h2 className="text-white font-semibold text-[32px] leading-[48px] mb-[26px] p-1 sm:p-0">
            Subscribe to get 50% discount price
          </h2>
          <div className="relative w-full sm:w-auto p-2 sm:p-0">
            <input
              className="bg-white rounded-[42px] p-4 focus:outline-none text-light font-semibold leading-6 w-full sm:w-[486px]"
              placeholder="Email address"
            />
            <button
              className="absolute right-1 top-[5px] bottom-[5px] py-3 px-8 bg-secondary rounded-[32px] text-white font-semibold text-[14px]"
              style={{ boxShadow: '0px 4px 32px rgba(223, 195, 124, 0.25)' }}
            >
              Order now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
