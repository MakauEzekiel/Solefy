import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductList = ({salesData}:any) => {
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (salesData.length > 0 || salesData.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }}, [salesData.length]);

    if (loading) {
        return <main className=" w-full text-center item-center justify-center mt-[107px] pt-32 pb-16">
            <div className="w-full">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        </main>;
      }
    
  return (
    <main className='w-full h-full mt-[107px] relative'>
        <div className='w-full sm:p-16 sm:pt-24 pl-4 pr-4 pt-32'>
            <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 '>
            {salesData.map((sale:any, idx:any) => (
                sale.saleImages.map((imageGroup:any, index:any) => (
                    <React.Fragment key={imageGroup.imagesUrls[1]}>
                        {(index === 0) && (
                            <>
                            <div className='hidden sm:block sm:col-span-2 text-black min-w-[100px] overflow-hidden'>
                                <Link href={`/detail/${encodeURIComponent(sale.product_id)}-${encodeURIComponent(imageGroup.color.color)}`}>
                                    <Image src={imageGroup.imagesUrls[2]} alt="" unoptimized priority loading="eager" width={100} height={100} className='w-full md:max-h-[448px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
                                </Link>
                            </div>
                            </>
                        )}
                        <>
                        <Link  href={`/detail/${encodeURIComponent(sale.product_id)}-${encodeURIComponent(imageGroup.color.color)}`}>
                            <div className='sm:col-span-1 col-span-2 text-black min-w-[100px] overflow-hidden'>
                                <Image src={imageGroup.imagesUrls[1]} alt="" unoptimized priority loading="eager" width={100} height={100} className='w-full md:max-h-[400px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
                                <div className='max-h-[84px]'>
                                    <div className='font-bold'>
                                        <p className='uppercase text-[16px] mt-[16px]'>{sale.name}</p>
                                    </div>
                                    <p className='text-gray-400 text-base text-[14px]'>{sale.material}</p>
                                    <p className='font-bold text-xl mt-2'>{sale.price}</p>
                                </div>
                            </div>
                        </Link>
                        </>
                    </React.Fragment>
                ))
              ))}
            </div>
        </div>
    </main>
  )
}

export default ProductList