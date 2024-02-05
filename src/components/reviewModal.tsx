'use client'

import React from 'react'
import StarRate from './starRate';

const ReviewModal = ({isVisible, onClose}:any) => {
  if(!isVisible) return null;
  return (
    <div className='z-[99999999999999999999999999999999999999999999999999999999999999999999] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center flex'>
      <div className='sm:w-[600px] w-[90%] flex flex-col'>
        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>
          x
        </button>
        <div className='bg-[#f2f2f2] p-2 rounded-sm overflow-y-auto max-h-[80vh]'>
        <div className='w-full pt-4'>
            <div className='w-full p-4 pb-0'>
              <p className='text-center text-2xl font-bold'>Review</p>
              <p className='text-center text-[12px] font-semibold text-gray-400'>Your feedback will help other shoppers make good choices, and we will use it to improve our products.</p>
            </div>
            <div className='w-full p-4 pt-0 justify-center items-center'>
              <form className="space-y-4 md:space-y-6 -w-full justtify-center items-center" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                      <input type="text" name="name" id="name" className="h-[36px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email address</label>
                      <input type="email" name="email" id="email" className="h-[36px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address"/>
                  </div>
                  <div>
                      <label htmlFor="subject" className="mb-2 text-sm font-medium text-black">rating</label>
                      <div className='flex'>
                        <StarRate/>
                      </div>
                      {/* <input type="number" name="subject" id="subject" className="h-[36px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject"/> */}
                  </div>
                  <div>
                      <label htmlFor="comment" className="block mb-2 text-sm font-medium text-black">Review</label>
                      <textarea name="comment" id="comment" placeholder="" className="border min-h-[56px] bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <button type="submit" className="justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[36px] w-[220px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                      <span className="relative z-10 uppercase">Send a message</span>
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal