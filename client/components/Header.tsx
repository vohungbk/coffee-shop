import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-2 lg:px-0">
      <div>
        <Image
          src={'assets/logo_coffe.svg'}
          alt="logo"
          width={150}
          height={30}
          className="hidden lg:block"
        />
        <Image
          src={'/assets/logo-mobile.png'}
          alt="logo"
          width={60}
          height={48}
          className="block lg:hidden"
        />
      </div>
      <div className="flex-1 text-center">
        <ul className="items-center justify-center gap-8 hidden lg:flex">
          <li className="text-[18px] hover:text-primary">
            <a className="before:bg-primary before:absolute before:h-[2px] before:w-0 hover:before:w-full before:content-[''] before:-bottom-1 before:transition-all before:duration-500 relative">
              About us
            </a>
          </li>
          <li className="text-[18px] hover:text-primary">
            <a className="before:bg-primary before:absolute before:h-[2px] before:w-0 hover:before:w-full before:content-[''] before:-bottom-1 before:transition-all before:duration-500 relative">
              Our Product
            </a>
          </li>
          <li className="text-[18px] hover:text-primary">
            <a className="before:bg-primary before:absolute before:h-[2px] before:w-0 hover:before:w-full before:content-[''] before:-bottom-1 before:transition-all before:duration-500 relative">
              Delivery
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`bg-secondary absolute w-[80%] z-10 left-[70px] sm:left-[120px] ${
          menuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transition: menuOpen
            ? 'opacity 313ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 208ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            : 'opacity 313ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 208ms cubic-bezier(0.4, 0, 0.2, 1) 104ms',
          top: '64px',
          transformOrigin: '234px 0px',
          transform: menuOpen ? 'none' : 'scale(0.75, 0.5625)',
        }}
      >
        <ul>
          <li className="text-[18px] hover:text-primary px-4 py-2 text-primary">
            <a className="before:bg-primary before:absolute before:h-[2px] before:w-0 hover:before:w-full before:content-[''] before:-bottom-1 before:transition-all before:duration-500 relative">
              About us
            </a>
          </li>
          <li className="text-[18px] hover:text-primary px-4 py-2 text-primary">
            <a className="before:bg-primary before:absolute before:h-[2px] before:w-0 hover:before:w-full before:content-[''] before:-bottom-1 before:transition-all before:duration-500 relative">
              Our Product
            </a>
          </li>
          <li className="text-[18px] hover:text-primary px-4 py-2 text-primary">
            <a className="before:bg-primary before:absolute before:h-[2px] before:w-0 hover:before:w-full before:content-[''] before:-bottom-1 before:transition-all before:duration-500 relative">
              Delivery
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <input className="bg-[#FFFFFF] rounded-[35px] py-[11px] pl-[52px] focus:outline-none text-[12px] leading-[18px] w-[150px] sm:w-[200px] lg:w-[222px]" />
          <div className="absolute left-3 top-[calc(50%_-_16px)]">
            <Image
              src={'assets/search.svg'}
              alt="logo"
              width={32}
              height={32}
            />
          </div>
        </div>
        <Image src={'assets/cart.svg'} alt="logo" width={32} height={32} />
        {menuOpen ? (
          <Image
            src={'/assets/x-icon.webp'}
            alt="logo"
            width={32}
            height={32}
            className="block lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <Image
            src={'/assets/menu_icon.png'}
            alt="logo"
            width={32}
            height={32}
            className="block lg:hidden"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
