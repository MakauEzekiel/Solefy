'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import { SIDENAV_ITEMS } from '../constants';
import { SideNavItem } from '../types';
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';
import useScroll from '@/hooks/use-scroll';
import { MdOutlinePerson } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import { useAppContext } from '@/context';
import CartDrawer from './cartDrawer';
import { RxCross2 } from 'react-icons/rx';
import { FaSearch } from 'react-icons/fa';

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile = () => {
  const {IsCartOpen, setIsCartOpen, qty, showPopUp, setShowPopUp} = useAppContext();
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handleDrawer = () => {
    setIsCartOpen(!IsCartOpen);
    setShowPopUp(false);
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
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden transition-all duration-600 ease-in-out mt-${showPopUp && !scrolled ? '8' : '0'} ${
        isOpen ? '' : 'pointer-events-none'}`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-[#f2f2f2]"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        {SIDENAV_ITEMS.map((item, idx) => {
          const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item

          return (
            <div key={idx}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
              ) : (
                <MenuItem>
                  <Link
                    href={item.path}
                    onClick={() => toggleOpen()}
                    className={`flex w-full text-2xl ${
                      item.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}

              {!isLastItem && (
                <MenuItem className="my-3 h-px w-full bg-gray-300" />
              )}
            </div>
          );
        })}
      </motion.ul>
      {/* <button className='pointer-events-auto absolute right-20 top-[24px] z-30 text-gray-800'>person</button>
      <button className='pointer-events-auto absolute right-12 top-[24px] z-30 text-gray-800'>cart</button> */}
      <button className='group pointer-events-auto absolute right-36 top-[26px] z-30 text-gray-800'>
        <Link href='/search'>
            <FaSearch className='h-[18px] w-[18px]'/>
        </Link>
      </button>
      <button className='group pointer-events-auto absolute right-24 top-[24px] z-30 text-gray-800'>
        <Link href='/account/login'>
            <MdOutlinePerson className='h-[22px] w-[22px]'/>
        </Link>
      </button>
      <button onClick={handleDrawer} className='pointer-events-auto absolute right-14 top-[24px] z-30 text-gray-800'>
        {/* <Link href='/cart'> */}
          <AiOutlineShopping className='h-[22px] w-[22px]'/>
          {/* <span className='absolute mt-[-28px] ml-[8px] text-[]'>0</span> */}
        {/* </Link> */}
      </button>
      <MenuToggle toggle={toggleOpen} />
      {/* {IsCartOpen && (
        <div className="z-[99999999999999999999] fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
          ></div>
        </div>
      )} */}

      {/* <aside
        className={`transform top-0 right-0 w-full bg-[#f2f2f2] fixed h-full ease-in-out transition-all duration-700 z-[99999999991] ${
          !IsCartOpen ? "translate-x-full" : "-translate-x-[0]"
        }`}
      >
        <button onClick={handleDrawer} className="text-white mt-6 absolute right-[16px] z-[999999999999999999999999] hover:before:bg-white rounded-full h-[65px] w-[65px] bg-black px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
            <span className="relative z-10"><RxCross2 className='w-[40px] h-[40px]'/></span>
        </button>
        <CartDrawer/>
      </aside> */}
    </motion.nav>
  );
};

export default HeaderMobile;

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[28px] z-30"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
  
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <button
          className="flex w-full text-2xl"
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <div className="flex flex-row justify-between w-full items-center">
            <span
              className={`${pathname.includes(item.path) ? 'font-bold' : ''}`}
            >
              {item.title}
            </span>
            <div className={`${subMenuOpen && 'rotate-180'}`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </div>
        </button>
      </MenuItem>
      <div className="mt-2 ml-2 flex flex-col space-y-2">
        {subMenuOpen && (
          <>
            {item.subMenuItems?.map((subItem, subIdx) => {
              return (
                <MenuItem key={subIdx}>
                  <Link
                    href={subItem.path}
                    onClick={() => toggleOpen()}
                    className={` ${
                      subItem.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};