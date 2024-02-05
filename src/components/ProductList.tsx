import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductList = ({data}:any) => {
    // const [currentSaleCategory, setCurrentSaleCategory] = useState(true);
    // const [loading, setLoading] = useState(true);
    let currentSaleCategory = 0;
    function setCurrentSaleCategory(flag: number) {
        currentSaleCategory = flag;
    }



    // if (loading) {
    //     return <main className="z-[999999999999999999] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
    //         <div className="w-full h-full">
    //             <div className="flex justify-center items-center">
    //                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
    //             </div>
    //         </div>
    //     </main>;
    //   }
    
  return (
    <main className='w-full h-full mt-[107px] relative'>
        {/* <div className='h-[70vh] grid hidden md:flex items-center md:grid-cols-2 grid-cols-1 w-full mx-auto md:pl-16 md:pr-16 pt-16 sm:pl-8 sm:pr-8'>
            
        </div> */}
        <div className='w-full sm:p-16 sm:pt-24 pl-4 pr-4 pt-8'>
            <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 '>
            {data.map((sale:any) => (
                <React.Fragment key={sale.product_id}>
                    {(currentSaleCategory === 0) && (
                        <>
                        {setCurrentSaleCategory(3)}
                        <div className='hidden sm:flex col-span-2 text-black min-w-[100px] overflow-hidden'>
                            <Link href={`/product-details/${sale.product_id}`}>
                                <Image src={sale.image} alt="" unoptimized priority placeholder='blur' blurDataURL={sale.base64} loading="eager" width={100} height={100} className='w-full md:max-h-[448px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
                            </Link>
                        </div>
                        </>
                    )}
                    <>
                    {setCurrentSaleCategory(currentSaleCategory-1)}
                    <Link  href={`/product-details/${sale.product_id}`}>
                        <div className='sm:col-span-1 col-span-2 text-black min-w-[100px] overflow-hidden'>
                            <Image src={sale.image} alt="" unoptimized priority placeholder='blur' blurDataURL={sale.base64} loading="eager" width={100} height={100} className='w-full md:max-h-[400px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
                            <div className='max-h-[84px]'>
                                <div className='font-bold'>
                                    <p className='uppercase text-[16px] mt-[16px]'>{sale.name}</p>
                                </div>
                                <p className='text-gray-400 text-base text-[14px]'>{sale.category}</p>
                                <p className='font-bold text-xl mt-2'>{sale.price}</p>
                            </div>
                        </div>
                    </Link>
                    </>
                </React.Fragment>
            ))}
            </div>
        </div>
    </main>
  )
}

export default ProductList