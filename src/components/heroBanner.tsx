import React from 'react'
import Image from 'next/image'
import bg from '@/assets/bannerBg.jpg'
import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className='w-[100%] h-[100vh] z-[-1]'>
        <Image
              src={bg}
              alt="Description of the image"
              fill
              style={{objectFit:"cover"}}
              unoptimized
              className='relative w-full h-full z-[0]'
          />
          <div className=' z-[1] absolute w-[100%] h-[100vh] bg-gray-900 bg-opacity-30'>

          </div>
            <div className='z-[2] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4'>
                  <p className='uppercase text-[16px] font-bold text-[#f2f2f2]'>Private Sales</p>
                  <p className='text-white text-6xl font-bold w-[100%]'>Up to 30% off</p>
            </div>
            <div className='z-[2] w-[100%] absolute flex text-center items-center justify-center bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0 pb-24 col-2'>
            <ul className='flex space-x-32'>
                    <li className="group">
                      <Link href='/sales/women'>
                        <span className='text-white text-4xl font-semibold relative bg-right-bottom bg-gradient-to-l from-white bg-[length:120%3px] bg-no-repeat group-hover:bg-[length:0%3px] transition-all duration-500 ease-out'>WOMEN</span>
                      </Link>
                    </li>
                    <li className="group">
                      <Link href='/sales/men'>
                        <span className='text-white text-4xl font-semibold relative bg-right-bottom bg-gradient-to-l from-white bg-[length:120%3px] bg-no-repeat group-hover:bg-[length:0%3px] transition-all duration-500 ease-out'>MEN</span>
                      </Link>
                    </li>
                  </ul>
            </div>          
    </div>
  )
}

export default HeroBanner