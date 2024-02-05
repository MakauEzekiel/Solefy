'use client'

import React, { useEffect, useState } from 'react'
import { TbLockCheck, TbTruckReturn } from 'react-icons/tb'
import { GiLifeSupport } from 'react-icons/gi'
import { FaFacebookF, FaPlus, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import Link from 'next/link'

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');

  const handleDrawer = (drawerType: any) => {
    setIsOpen(!isOpen);
    setType(drawerType);
  };

  useEffect(() => {
    const handleEscKeyPress = (e:any) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);
  return (
    <div className='w-[100%] relative bg-[#f2f2f2]'>
      <div className='p-8'>
        <h2 className='text-4xl font-bold'>NEWSLETTER</h2>
        <p className='mt-8 text-gray-500'>Discover in preview all our new products, our latest actions and get R30 off your first order by subscribing to our newsletter!</p>
      </div>
      <div className='md:hidden sm:block p-8 justify-center items-center w-full text-center'>
          <form className='group relative w-full'>
            <input type="email" className='w-full h-[54px] bg-[#ffffff] focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none p-8 
            leading-6 text-slate-900 placeholder-gray-300  rounded-full ring-1 ring-slate-200 shadow-sm' 
            placeholder='Type your email address here' />
            <button className='h-[64px] bg-black w-[50%] rounded-full text-white mt-2'>
                  Subscribe
            </button>
          </form>
      </div>
      <div className='md:block sm:hidden xm:hidden hidden p-8 justify-center items-center w-[600px] text-center'>
          <form className='group relative w-full'>
            <input type="email" className='w-full h-[54px] pr-[176px] bg-[#ffffff] focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none p-8 
            leading-6 text-slate-900 placeholder-gray-300  rounded-full ring-1 ring-slate-200 shadow-sm' 
            placeholder='Type your email address here' />
            <button className="h-[46px] bg-white border-black w-[30%] rounded-full mt-[9px] mr-[8px] text-black absolute right-0 top-0 overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-black hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black">
              <span className="relative z-10">Subscribe</span>
            </button>
          </form>
      </div>
      <div className='flex flex-col sm:flex-row justify-center items-center w-[100%] text-center p-8'>
          <div className='w-full  basis-1/2 border border-gray-500 pt-16 pb-16'>
            <div className='justify-center items-center w-[100%] text-center'>
              <TbLockCheck className='w-[54px] h-[54px] mb-[12px] inline-block'/>
            </div>
            <p className='text-black font-bold'>Secure payment</p>
            <p className='text-gray-600 font-semibold'>credit card</p>
          </div>
          <div className='w-full basis-1/2 border border-gray-500 pt-16 pb-16'>
          <div className='justify-center items-center w-[100%] text-center'>
              <TbTruckReturn className='w-[54px] h-[54px] mb-[12px] inline-block'/>
            </div>
            <p className='text-black font-bold'>Simplified return</p>
            <p className='text-gray-600 font-semibold'>(under 60 days)</p>
          </div>
          <div className='w-full basis-1/2 border border-gray-500 pt-16 pb-16'>
          <div className='justify-center items-center w-[100%] text-center'>
              <GiLifeSupport className='w-[54px] h-[54px] mb-[12px] inline-block'/>
            </div>
            <p className='text-black font-bold'>Support</p>
            <p className='text-gray-600 font-semibold'>to associations</p>
          </div>
      </div>
      <div className='justify-center items-center w-[100%] text-center p-8'>
      <button className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[50px] w-[50px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
        <span className="relative z-10"><FaFacebookF className='w-[25px] h-[25px]'/></span>
      </button>
      <button className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[50px] w-[50px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
        <span className="relative z-10"><FaInstagram className='w-[25px] h-[25px]'/></span>
      </button>
      <button className="text-red hover:before:bg-redborder-black relative rounded-full h-[50px] w-[50px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
        <span className="relative z-10"><FaXTwitter className='w-[25px] h-[25px]'/></span>
      </button>
      </div>
      <div className='pl-32'>
        <ul className='text-4xl font-semibold'>
          <li className="group cursor-pointer mb-8">
          <button onClick={()=> handleDrawer('faq')} className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[50px] w-[50px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
            <span className="relative z-10"><FaPlus className='w-[25px] h-[25px]'/></span>
          </button>
            Frequently Asked Questions
            </li>
          <li className="group cursor-pointer mb-8">
            <button onClick={()=> handleDrawer('help')} className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[50px] w-[50px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
              <span className="relative z-10"><FaPlus className='w-[25px] h-[25px]'/></span>
            </button>
            Help Center
            </li>
          <li className="group cursor-pointer mb-16">
            <button onClick={()=> handleDrawer('sizes')} className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[50px] w-[50px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
              <span className="relative z-10"><FaPlus className='w-[25px] h-[25px]'/></span>
            </button>
            Size Guide
            </li>
        </ul>
      </div>
      <div className='w-full bg-black bg-opacity-90 justify-center items-center w-full text-center text-white'>
        <Link href=''>
          <p>Privacy Policy</p>
        </Link>
      </div>
      {isOpen && (
        <div className="z-[9999999999] fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 right-0 w-[640px] bg-[#f2f2f2] fixed h-full overflow-auto ease-in-out transition-all duration-700 z-[99999999991] ${
          !isOpen ? "translate-x-full" : "-translate-x-[0]"
        }`}
      >
        <button onClick={handleDrawer} className="text-black mt-6 absolute right-[32px] hover:before:bg-black rounded-full h-[65px] w-[65px] overflow-hidden bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
          <span className="relative z-10"><RxCross2 className='w-[40px] h-[40px]'/></span>
        </button>
        {type === 'faq' && (
            <div className='w-full pt-8'>
            <p className='text-4xl font-semibold text-center'>Send a message</p>
            <div className='w-full p-8 pb-0'>
              <p className='text-center text-2xl font-bold'>How can we help?</p>
              <p className='text-center text-1xl font-semibold text-gray-400'>We usually respond in a few hours</p>
            </div>
            <div className='w-full p-24 pt-0 justify-center items-center'>
              <form className="space-y-4 md:space-y-6 -w-full mt-16 justtify-center items-center" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                      <input type="text" name="name" id="name" className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                  </div>
                  <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium text-black">Subject</label>
                      <input type="text" name="subject" id="subject" className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject"/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email address</label>
                      <input type="email" name="email" id="email" className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address"/>
                  </div>
                  <div>
                      <label htmlFor="comment" className="block mb-2 text-sm font-medium text-black">How can we help?</label>
                      <textarea name="comment" id="comment" placeholder="" className="border min-h-[72px] bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <button type="submit" className="justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[220px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                      <span className="relative z-10 uppercase">Send a message</span>
                  </button>
              </form>
            </div>
          </div>
        )}
        {type==='sizes' && (
          <div className='w-full pt-8'>
            <p className='text-4xl font-semibold text-center'>Size Guide</p>
            <p className='p-8 text-1xl text-gray-500 font-semibold'>Our sneakers fits very well, take your usual size. If you hesitate between two sizes, take the size above.</p>
            <div className='w-full p-8'>
              <table className='table-auto w-full text-[18px] text-gray-600'>
                  <thead className='w-full'>
                    <tr>
                        <th className=' '>Sizes</th>
                        <th>Foot size (cm)</th>
                        <th>US</th>
                        <th>UK</th>
                    </tr>
                  </thead>
                  <tbody className='w-full text-center font-semibold'>
                    <tr>
                      <td><br/>35 <br/><br/></td>
                      <td><br/>22,4<br/><br/></td>
                      <td><br/>4<br/><br/></td>
                      <td><br/>2,5<br/><br/></td>
                    </tr>
                    <tr>
                      <td>36 <br/><br/></td>
                      <td>23,4<br/><br/></td>
                      <td>5<br/><br/></td>
                      <td>3,5<br/><br/></td>
                    </tr>
                    <tr>
                      <td>37<br/><br/></td>
                      <td>23,7<br/><br/></td>
                      <td>5,5<br/><br/></td>
                      <td>4<br/><br/></td>
                    </tr>
                    <tr>
                      <td>38<br/><br/></td>
                      <td>24,4<br/><br/></td>
                      <td>6,5<br/><br/></td>
                      <td>5<br/><br/></td>
                    </tr>
                    <tr>
                      <td>39<br/><br/></td>
                      <td>25<br/><br/></td>
                      <td>7,5<br/><br/></td>
                      <td>5,5<br/><br/></td>
                    </tr>
                    <tr>
                      <td>40<br/><br/></td>
                      <td>25,7<br/><br/></td>
                      <td>8<br/><br/></td>
                      <td>6,5<br/><br/></td>
                    </tr>
                    <tr>
                      <td>41<br/><br/></td>
                      <td>26,4<br/><br/></td>
                      <td>9<br/><br/></td>
                      <td>7,5<br/><br/></td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
        )}
        {type === 'help' && (
          <div className='w-full pt-8'>
            <p className='text-4xl font-semibold text-center'>Help Center</p>
          </div>
        )}
      </aside>
    </div>
  )
}

export default Footer