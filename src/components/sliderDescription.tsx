import React from 'react'
import Image from 'next/image';
import newsOne from '@/asserts/newsOne.avif';
import newsTwo from '@/asserts/newsThree.avif';
import newsThree from '@/asserts/newsTwo.avif';
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

type Props = {
    clickNext:any,
    clickPrev:any,
    activeImage:any
}

const SliderDescription = ({clickNext, clickPrev, activeImage}:Props) => {
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
  return (
    <div className="grid place-items-start w-full bg-[#ebebeb] relative md:rounded-tr-3xl md:rounded-br-3xl">
      <div className="uppercase text-sm absolute right-4 top-2 underline-offset-4 underline text-[#000000]">
        u b a c
      </div>
      {data.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[70vh] py-0 md:px-20 px-10 text-left justfity-center items-center text-center"
              : "hidden"
          }`}
        >
          <motion.div
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
            className="w-full"
          >
            <div className="py-16 text-4xl font-extrabold text-center">{elem.name}</div>
            <div className="leading-relaxed font-medium text-base tracking-wide h-60 md:h-40 italic text-gray-600 text-center">
              {" "}
              {elem.description}
            </div>
            {/* <button className="bg-[#FB857F] text-white px-4 py-2 rounded-md my-10">
            Shop Now
          </button> */}
          <button className="justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[120px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
            <span className="relative z-10">Regard</span>
          </button>
          </motion.div>
          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              <button className="text-red hover:before:bg-redborder-black relative rounded-full h-[40px] w-[40px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                <span className="relative z-10"><FaArrowLeft className='w-[15px] h-[15px]'/></span>
              </button>
            </div>

            <div
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              <button className="text-red hover:before:bg-redborder-black relative rounded-full h-[40px] w-[40px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                <span className="relative z-10"><FaArrowRight className='w-[15px] h-[15px]'/></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SliderDescription