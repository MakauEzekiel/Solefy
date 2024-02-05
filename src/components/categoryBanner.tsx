import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import leftMen from '@/assets/male_left.jpg'
import rightMen from '@/assets/male_right.jpg'
import leftFemale from '@/assets/female_left.jpg'
import rightFemale from '@/assets/female_right.jpg'

const CategoryBanner = () => {
  return (
    <main>
        <div className='relative h-[80vh]'>
        <div className='absolute inset-0 flex items-center justify-between'>
            <div className='w-1/2 h-full bg-black' >
                <Image className='w-[100%] h-full' src={rightFemale} alt={''} style={{objectFit:"cover"}} unoptimized/>
            </div>
            <div className=' z-[1] absolute w-full h-full bg-gray-900 bg-opacity-30'></div>
            <div className='w-1/2 h-full'>
                <Image className='w-[100%] h-full' src={leftFemale} alt={''} style={{objectFit:"cover"}} unoptimized/>
            </div>
        </div>
        <div className='z-[2] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#FF0000]'>
            <p className='uppercase text-white font-bold text-5xl'>FEMALE</p>
        </div>
        <div className='z-[2] w-[100%] absolute flex text-center items-center justify-center bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0 pb-24 col-2'>
            <ul className='flex space-x-32'>
                    <li className="group">
                      <Link href='/sales/women'>
                        <span className='text-[#F2F2F2] text-4xl font-semibold relative bg-right-bottom bg-gradient-to-l from-white bg-[length:120%3px] bg-no-repeat group-hover:bg-[length:0%3px] transition-all duration-500 ease-out'>WOMEN</span>
                      </Link>
                    </li>
                  </ul>
            </div>
    </div>
    <div className='relative h-[80vh]'>
        <div className='absolute inset-0 flex items-center justify-between'>
        <div className=' z-[1] absolute w-full h-full bg-gray-900 bg-opacity-30'></div>
            <div className='w-1/2 h-full' >
                <Image className='w-[100%] h-full' src={leftMen} alt={''} style={{objectFit:"cover"}} unoptimized/>
            </div>
            <div className='w-1/2 h-full bg-black'>
                <Image className='w-[100%] h-full' src={rightMen} alt={''} style={{objectFit:"cover"}} unoptimized/>
            </div>
        </div>
        <div className='z-[2] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#FF0000]'>
            <p className='uppercase text-white font-bold text-5xl'>MALE</p>
        </div>
        <div className='z-[2] w-[100%] absolute flex text-center items-center justify-center bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0 pb-24 col-2'>
            <ul className='flex space-x-32'>
                    <li className="group">
                      <Link href='/sales/men'>
                        <span className='text-white text-4xl font-semibold relative bg-right-bottom bg-gradient-to-l from-white bg-[length:120%3px] bg-no-repeat group-hover:bg-[length:0%3px] transition-all duration-500 ease-out'>
                            MEN
                        </span>
                      </Link>
                    </li>
                  </ul>
            </div>
    </div>
    </main>
    
  )
}

export default CategoryBanner