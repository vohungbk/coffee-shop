import Image from 'next/image';
import AddToCart from './Cart/AddToCart';
import Category from './Category';
import { Product } from 'shared/types/product';
type Props = {
  data: Product;
  className?: string;
};

const CardItems = ({ data, className }: Props) => {
  return (
    <div
      className={`bg-white rounded-xl px-[18px] pt-6 pb-5 z-10 relative ${className}`}
    >
      <div className="relative">
        <div
          style={{
            background:
              'linear-gradient(92.95deg, rgba(255, 255, 255, 0.4) 0.82%, rgba(255, 255, 255, 0.7) 96.47%)',
          }}
          className="backdrop-blur-[2px] rounded-[27px] p-1 absolute top-[7px] left-[10px] z-10"
        >
          <div className="bg-white rounded-[50px] text-center py-[6px] px-[10px] text-secondary font-bold min-w-[60px] flex justify-center gap-1 leading-4">
            <span className="leading-4">{data?.star}</span>
            <Image src={'assets/star.svg'} alt="logo" width={14} height={14} />
          </div>
        </div>
        <div className="relative h-[226px]">
          <Image
            src={data.imgUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>
      </div>
      <div className="mt-5">
        <div
          className={`flex items-center justify-between ${
            data.category?.length ? 'mb-3' : 'mb-1'
          }`}
        >
          <p className="text-secondary font-semibold text-2xl">{data.name}</p>
          <p className="text-secondary font-bold text-2xl">{data.price} K</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {data.category?.length ? (
              data.category?.map((item, index) => (
                <Category text={item} key={index} />
              ))
            ) : (
              <span className="text-light font-semibold max-w-[171px]">
                {data?.description}
              </span>
            )}
          </div>
          <AddToCart padding="p-[13px]" imageWidth={17} imageHeight={17} product={data}/>
        </div>
      </div>
    </div>
  );
};

export default CardItems;
