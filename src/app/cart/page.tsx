'use client'

import React from 'react'
import Image from 'next/image'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useAppContext } from '@/context'
import { RxCross2 } from 'react-icons/rx'
import { useRouter } from 'next/navigation'

export default function Cart() {
    const { cartItems, toggleCartItemQuantity, onRemove, setIsCartOpen, totalPrice } = useAppContext();
    const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <header className="mt-[107px] uppercase text-4xl font-bold text-center">cart</header>
      <main className="flex-grow overflow-auto overflow-x-none p-4">
      {cartItems.length > 0 && cartItems.map((sale:any) => (
            sale.saleImages.map((imageGroup:any, index:any) => (
              <React.Fragment key={imageGroup.imagesUrls[1]}>
                  {(imageGroup.color.color === sale.color) && (
                        <div className='mb-2' key={sale.product_id}>
                          <hr />
                          <div className='flex items-center sm:space-x-4 w-full'>
                              <Image src={imageGroup.imagesUrls[2]} alt='' width={100} height={100} className='md:w-36 md:h-36 h-16 w-full'style={{objectFit:"cover"}} unoptimized />
                              <div className='w-full pl-2'>
                                  <p className='font-bold sm:text-2xl text-1xl'>{sale.name}</p>
                                  <p className='text-sm'>Size: Small</p>
                              </div>
                              <div className='hidden sm:block min-w-[100px]'>
                              <div className="py-2 px-3 inline-block bg-[#f2f2f2]" data-hs-input-number>
                                <div className="flex items-center gap-x-1.5">
                                <button onClick={() => toggleCartItemQuantity(imageGroup.id, 'dec')} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                  <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                </button>
                                  <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-black" type="text" value={sale.quantity} data-hs-input-number-input readOnly/>
                                  <button onClick={() => toggleCartItemQuantity(imageGroup.id, 'inc')} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                  </button>
                                </div>
                              </div>
                              </div>
                              <div>
                              <div className='sm:hidden block min-w-[100px]'>
                              <div className="py-2 px-3 inline-block bg-[#f2f2f2]" data-hs-input-number>
                                <div className="flex items-center gap-x-1.5">
                                <button onClick={() => toggleCartItemQuantity(imageGroup.id, 'dec')} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                  <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                </button>
                                  <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-black" type="text" value={sale.quantity} data-hs-input-number-input readOnly/>
                                  <button onClick={() => toggleCartItemQuantity(imageGroup.id, 'inc')} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                  </button>
                                </div>
                              </div>
                              </div>
                                <p className='text-center text-2xl font-bold'>R{sale.totalAmount}</p>
                              </div>
                              <div className='md:block hidden pr-0'>
                                <button onClick={() => onRemove(imageGroup.id)} className="pl-6 pr-6 h-[128px] bg-[#f2f2f2] w-full text-black right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-black transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-black hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black">
                                  <span className="relative z-10 uppercase">delete</span>
                                </button>
                              </div>
                              <div className='md:hidden block pr-0'>
                                <button onClick={() => onRemove(imageGroup.id)} className="pl-6 pr-6 h-[128px] bg-[#f2f2f2] w-full text-black right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-black transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-black hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black">
                                    <span className="relative z-10"><RxCross2 className='w-[25px] h-[25px]'/></span>
                                </button>
                              </div>
                          </div>
                          <hr />
                        </div>
                  )}
              </React.Fragment>
            ))
          ))}
      </main>
      <div className="w-full">
      <div className=' w-[100%] flex space-x-2 pb-4'>
            <div className='w-full pl-8'>
                <p className='text-black text-2xl font-bold'>TOTAL</p>
            </div>
            <div className='w-full pr-8'>
            <p className=' text-gray-500 text-2xl font-bold text-end'>R{totalPrice}</p>
            </div>
          </div>
          <div className='px-2'>
          <button onClick={() => router.back()} className="group relative bottom-2 md:min-h-[76px] min-h-[66px] w-[100%] overflow-hidden border border-black bg-[#f2f2f2] text-black transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-black before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-black after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
            <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-black before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-black after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
            <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white text-[18px] font-semibold">Continue Shopping</span>
          </button>
          </div>
          <button disabled={true} className="group relative bottom-0 min-h-[66px] md:min-h-[86px] w-[100%] overflow-hidden border border-black bg-black text-white transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-[#f2f2f2] before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-[#f2f2f2] after:duration-500 hover:text-black hover:before:h-full hover:after:h-full">
            <span className="top-[0] flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#f2f2f2] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#f2f2f2] after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full"></span>
            <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-black text-[18px] font-semibold">Order</span>
          </button>
      </div>
    </div>
  )
}

