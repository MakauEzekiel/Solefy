'use client';

import Link from 'next/link';
import Image from 'next/image'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

const ProductTrack = ({salesData}:any) => {
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     if (data.length > 0) {
//       setTimeout(() => {
//         setLoading(false);
//       }, 2000);
//     }}, [data.length]);
//   if (loading) {
//     return <main className="z-[999999999999999999] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
//     <div className="w-full h-full">
//         <div className="flex justify-center items-center">
//             <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
//         </div>
//     </div>
// </main>;
//   }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        autoplay: true,
        cssEase: "linear",
        slidesToShow: 3,
        autoplaySpeed: 2000,
        speed: 2000,
        responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
              },
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
              },
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
              },
          },
          {
              breakpoint: 200,
              settings: {
                  slidesToShow: 1,
              },
          },
  
        ],
      };
    
  return (
    <div className='border-b border-gray-400 pb-32 pt-4 md:pl-24 pl-8 overflow-hidden md:pr-24 pr-8'>
        <div className='w-full justify-center items-center text-center'><h2 className='text-4xl font-bold uppercase'>Popular Sales</h2></div>
        <div className='w-full mt-8'>
          <Slider {...settings} className="ml-0 w-full">
              {salesData.map((sale:any) => (
                sale.saleImages.map((imageGroup:any, index:any) => (
                  <div className="min-w-[100px] overflow-hidden p-2" key={sale.name}>
                    <Link href={`/detail/${encodeURIComponent(sale.product_id)}-${encodeURIComponent(imageGroup.color.color)}`}>
                      <Image
                        src={imageGroup.imagesUrls[1]}
                        alt={sale.name}
                        unoptimized
                        priority
                        placeholder='blur' 
                        blurDataURL={imageGroup.base64[1]}
                        className="w-full hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer"
                        width={100}
                        height={120}
                        loading="eager"
                      />
                      <div>
                        <div className="font-bold">
                          <p className="uppercase text-[16px] mt-[16px]">{sale.name}</p>
                        </div>
                        <p className="text-gray-400 text-base text-[14px]">{sale.material}</p>
                        <p className="font-bold text-xl mt-2">R{sale.price}</p>
                      </div>
                    </Link>
                  </div>
                ))
              ))}
          </Slider>
      </div>
    </div>
  )
}

function SampleNextArrow(props:any) {
    const { className='slick-arrow slick-next', style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

export default ProductTrack