"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import newsOne from '@/asserts/newsOne.avif';
import newsTwo from '@/asserts/newsThree.avif';
import newsThree from '@/asserts/newsTwo.avif';
import SliderDescription from './sliderDescription';
import { motion } from "framer-motion";


const Slider = () => {
    const data = [
        {
            name: 'MESCLAT Capsule',
            description: 'A 100% French fabric made from hemp and wool',
            img: newsOne
        },
        {
            name: 'Our Recycling Program',
            description: 'How does it work ?',
            img: newsTwo
        },
        {
            name: 'Behind the scenes of VOLKAN KNIT design',
            description: 'After two years of development, discover our new sneaker',
            img: newsThree
        },
    ]
    const [activeImage, setActiveImage] =useState(0);
    const clickNext = () => {
        activeImage === data.length - 1
         ? setActiveImage(0)
         : setActiveImage(activeImage + 1);
    };
    const clickPrev = () => {
        activeImage === 0
         ? setActiveImage(data.length - 1)
         : setActiveImage(activeImage - 1);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            clickNext();
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [activeImage]);

  return (
    // <main className='bg-gradient-to-r from-[#a49d9b] w-full min-h-screen mx-auto grid place-items-center'>
        <main className="grid hidden md:flex place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl">
            <div className={`w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0`}>
                
                {data.map((item, idx)=> (
                     <div
                     key={idx}
                     className={`${
                       idx === activeImage
                         ? "block w-full h-[70vh] object-cover transition-all duration-500 ease-in-out"
                         : "hidden"
                     }`}
                   >
                    <motion.nav
                initial={{
                    opacity: idx === activeImage ? 0 : 0.5,
                    scale: idx === activeImage ? 0.5 : 0.3,
                  }}
                  animate={{
                    opacity: idx === activeImage ? 1 : 0.5,
                    scale: idx === activeImage ? 1 : 0.3,
                  }}
                  transition={{
                    ease: "linear",
                    duration: 2,
                    x: { duration: 1 },
                  }}
                  className="h-full">
                    <Image
                        src={item.img}
                        alt=''
                        width={400}
                        height={400}
                        unoptimized
                        className="w-full h-full object-cover md:rounded-tl-3xl md:rounded-bl-3xl"
                        />
                </motion.nav>
                    </div>
                ) )}
                
            </div>
            <SliderDescription
                    activeImage={activeImage}
                    clickNext={clickNext}
                    clickPrev={clickPrev}/>

        </main>
    // </main>
  )
}

export default Slider