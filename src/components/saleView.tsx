'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'

const SaleView = ({saleData}:any) => {
    const currentSaleData = saleData;
    const [showAll, setShowAll] = useState(false);

    const imagesDivRef = useRef<HTMLDivElement | null>(null);

    const buttonRef = useRef(null);

    const imagesToShow = showAll ? currentSaleData.images : currentSaleData.images.slice(0, 2);

    const handleShowLess = () => {
        setShowAll(false);
        if(imagesDivRef.current != null)
            imagesDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='w-full col-span-2'>
            <div className='col-span-2 w-full columns-2 gap-1 space-y-1 mx-auto p-5 bg-[#f2f2f2]'  ref={imagesDivRef}>
                {imagesToShow.map((image:any, index: string | number) => (
                    <div className='w-full bg-[#f2f2f2]' key={image}>
                        <Image src={currentSaleData.images[index]} alt="" priority unoptimized placeholder='blur' blurDataURL={currentSaleData.base64} width={100} height={120} loading="eager" className='w-full object-cover cursor-pointer'/>
                    </div>
                ))}
                
            </div>
            <div className='w-full justify-center items-center text-center mt-[-46px]'>
            {showAll ? 
                    <button onClick={handleShowLess} className="relative bg-white h-12 w-40 overflow-hidden border border-gray-600 text-gray-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-gray-600 before:duration-300 before:ease-out hover:text-white hover:shadow-gray-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                        <span className="relative z-10">Show Less</span>
                    </button> :
                    <button onClick={() => setShowAll(true)} className="relative bg-white h-12 w-40 overflow-hidden border border-gray-600 text-gray-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-gray-600 before:duration-300 before:ease-out hover:text-white hover:shadow-gray-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                        <span className="relative z-10">Show More</span>
                    </button>
                }
            </div>
        </div>   
    )
}

export default SaleView

