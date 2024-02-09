'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx'
import useScroll from '../hooks/use-scroll';
import { cn } from '../lib/utils';
import { AiOutlineShopping} from 'react-icons/ai';
import { MdOutlineCancel} from 'react-icons/md';
import { MdOutlinePerson} from 'react-icons/md';
import CartDrawer from './cartDrawer';
import { useAppContext } from '@/context';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  // const { openCart, setOpenCart } = useAppContext(); 
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const {IsCartOpen, setIsCartOpen, qty, showPopUp, setShowPopUp} = useAppContext();

  const handleDrawer = () => {
    setIsCartOpen(!IsCartOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e:any) => {
      if (e.keyCode === 27 && IsCartOpen) {
        setIsCartOpen(false);
      }
    };

    if (IsCartOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [IsCartOpen, setIsCartOpen]);

  return (
    <main>
          <div
            className={cn(
              `sticky inset-x-0 top-[0] z-30 w-full transition-all duration-600 ease-in-out fixed`,
              {
                'bg-[#f2f2f2] transition-all duration-1000 ease-in-out': scrolled,
                ' text-black transition-all duration-1000 ease-in-out ': selectedLayout,
              },
            )}
          >
            {(showPopUp && !scrolled) && (
                <div className={cn(
                  ` text-white bg-black bg-opacity-90 w-full transition-all pt-[2px] pb-[2px] duration-600 ease-in-out fixed`,
                  {
                    'display-none': scrolled,
                    'display-none ': selectedLayout,
                  },
                )}>
                  <div className='flex justify-between items-center text-center'>
                    <p></p>
                    <p className='font-semibold text-[12px]'>FREE DELIVERY FROM R120 AND FREE RETURNS WITHIN 60 DAYS</p>
                    <button className='mr-[12px]' onClick={() => setShowPopUp(false)}><MdOutlineCancel/></button>
                  </div>
                </div>
            )}
            <div className={` mt-${showPopUp && !scrolled ? '8' : '0'} flex h-[75px]  items-center justify-between px-4 transition-all duration-600 ease-in-out`}>
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex flex-row space-x-3 items-center justify-center"
                >
                  <h2 className={cn(
                `letter-spacing-4 text-[22px] text-[#D4D4D8] font-black transition-all duration-600 ease-in-out`,
                {
                  'letter-spacing-4 text-[#000000] text-[22px] font-black transition-all duration-1000 ease-in-out ': scrolled,
                  'letter-spacing-4 text-[#000000] text-[22px] font-black transition-all duration-1000 ease-in-out': selectedLayout,
                },
              )}>S O L E F Y</h2>
                </Link>
              </div>

              <div className={cn(
                `flex-grow flex justify-center hidden md:flex text-[#FFFFFF] text-[12px] font-bold transition-all duration-600 ease-in-out`,
                {
                  'text-[#000000] font-bold transition-all duration-1000 ease-in-out ': scrolled,
                  'text-[#000000] font-bold transition-all duration-1000 ease-in-out': selectedLayout,
                },
              )}>
                  <ul className='flex space-x-8'>
                    <li className="group">
                      <Link href='/sales/women'>
                        <span className='relative bg-right-bottom bg-gradient-to-l from-white bg-[length:0%3px] bg-no-repeat group-hover:bg-[length:120%3px] transition-all duration-500 ease-out'>WOMEN</span>
                      </Link>
                    </li>
                    <li className="group">
                      <Link href='/sales/men'>
                        <span className='relative bg-right-bottom bg-gradient-to-l from-white bg-[length:0%3px] bg-no-repeat group-hover:bg-[length:120%3px] transition-all duration-500 ease-out'>MEN</span>
                      </Link>
                    </li>
                    <li className="group">
                      <Link href='/sales/all'>
                        <span className='relative bg-right-bottom bg-gradient-to-l from-white bg-[length:0%3px] bg-no-repeat group-hover:bg-[length:120%3px] transition-all duration-500 ease-out'>SALES</span>
                      </Link>
                    </li>
                    <li className='group'>
                      <Link href='/account/login'>
                          <MdOutlinePerson className='h-[22px] w-[22px]'/>
                      </Link>
                    </li>
                    <button className='mt-[-3px]' onClick={handleDrawer}>
                      <AiOutlineShopping className='h-[22px] w-[22px]'/>
                      <span className='absolute mt-[-28px] ml-[8px] text-[]'>{qty}</span>
                    </button>
                  </ul>


              </div>

              <div className="hidden md:block">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-center">
                  <Link href='/search'>
                    <FaSearch/>
                  </Link>
                </div>
              </div>
            </div>
            {IsCartOpen && (
        <div className="z-[9999999999] fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 right-0 w-[740px] bg-[#f2f2f2] fixed h-full overflow-auto ease-in-out transition-all duration-700 z-[99999999991] ${
          !IsCartOpen ? "translate-x-full" : "-translate-x-[0]"
        }`}
      >
        <button onClick={handleDrawer} className="text-black mt-6 absolute right-[32px] hover:before:bg-black rounded-full h-[65px] w-[65px] overflow-hidden bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
            <span className="relative z-10"><RxCross2 className='w-[40px] h-[40px]'/></span>
        </button>
        <CartDrawer/>
      </aside>
          </div>
    </main>
  );
};

export default Header;