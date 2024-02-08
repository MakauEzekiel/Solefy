'use client'
import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import ReviewModal from './reviewModal';
import { useAppContext } from '@/context';

async function UdpateColor(saleData: any, color: any) {
    for(let i = 0; i < saleData.saleImages.length; i++) {
        if(saleData.saleImages[i].color.color === color) {
            return saleData.saleImages[i].imagesUrls;
        }
    }
    return null;
  }

const Temp = ({saleData, color}:any) => {
    const [CurrentImages, setCurrentImages] = useState<any>(null);
    const [AvailableColors, setAvailableColors] = useState<any>(null)
    const [SelectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState<any>(null);
    const [showAll, setShowAll] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [ShowModel, setShowModel] = useState(false);
    const { onAdd } = useAppContext();
    // console.log(saleData);

    useEffect(() => {
        async function updateCurrentImages() {
            const current = await UdpateColor(saleData, color);
            // const availableColors:any = UdpateAvailableColors(saleData);

            const availableColorsArray:any[] = [];
            // console.log(saleData.saleImages[0].color);
            for(let i = 0; i < saleData.saleImages.length; i++) {
                // console.log('available colors: '+ saleData.saleImages[0].color)
                availableColorsArray.push(saleData.saleImages[i].color);
            }

            // console.log('colors: '+availableColors[1].color);
            setCurrentImages(current);
            setAvailableColors(availableColorsArray);
            setSelectedColor(color);
            setSelectedSize(5);

        }
        updateCurrentImages();
      }, [color, saleData])

    const handleColorClick = async (color:any) => {
        const current = await UdpateColor(saleData, color);
        setCurrentImages(current);
        setSelectedColor(color);
    }
    const availableSizes = [5, 6, 7, 8, 9, 10, 11, 12];

    const handleSizeClick = (size:any) => {
        setSelectedSize(size);
    }

    const imagesDivRef = useRef<HTMLDivElement | null>(null);

    const buttonRef = useRef(null);

    const imagesToShow = showAll ? CurrentImages : CurrentImages?.slice(0, 1);

    const handleShowLess = () => {
        setShowAll(false);
        if(imagesDivRef.current != null)
            imagesDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }

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
    <React.Fragment>
        <div className='w-full col-span-2 mr-[150px]'>
            <div className='w-full grid grid-cols-2 gap-2' ref={imagesDivRef}>
                {CurrentImages && (
                    <>
                        {imagesToShow.map((image:any, index: number) => (
                            <React.Fragment key={index}>
                                {index === 0 && (
                                    <>
                                        <div className='col-span-2 min-w-[100px] overflow-hidden'>
                                            <Image src={image} alt='' className='w-full object-cover' width={100} height={100} unoptimized priority loading="eager"/>
                                        </div>
                                    </>
                                )}
                                {index > 1 && (
                                    <>
                                        <div className='col-span-1 min-w-[100px] overflow-hidden'>
                                            <Image src={image} alt='' className='w-full' width={100} height={100} unoptimized priority loading="eager"/>
                                        </div>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )}
            </div>
            <div className='w-full justify-center items-center text-center mt-[-24px]'>
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
        <div className='w-full pr-4'>
            <p className='text-3xl font-bold text-gray-800 uppercase'>{saleData.name}</p>
            <p className='text-1xl text-gray-400 font-semibold'>{SelectedColor}</p>
            <div className='flex w-full'>
                <AiFillStar className='mt-[6px]'/>
                <AiFillStar className='mt-[6px]'/>
                <AiFillStar className='mt-[6px]'/>
                <AiFillStar className='mt-[6px]'/>
                <AiOutlineStar className='mt-[6px]'/>
                <p className='pl-[8px] font-semibold text-1xl'>12 Reviews</p>
            </div>
            <button onClick={() => setShowModel(true)} className='text-[14px] font-semibold text-black'>write a review</button>
            <p className='mt-2 text-[18px] text-gray-800 font-bold'>R{saleData.price}.00</p>
            <hr className='border-gray-300 mt-8'/>
            <p className='text-[14px] font-semibold mt-8'>Color</p>
            <div className='mt-4 ml-8'>
                {AvailableColors && (
                    <>
                        {AvailableColors.map((color:any) => (
                            <div key={color.color} className={`inline-flex w-[25px] h-[25px] mr-[8px] ${SelectedColor === color.color ?'border border-gray-600 p-[2px]' : ''} justify-center items-center text-center rounded-full `}>
                                <button className={` bg-${color.colorCode.slice(1)} inline-block text-black text-center w-[18px] h-[18px] rounded-full transition-all duration-500 ease-in-out 
                                `}
                                    style={{backgroundColor: color.colorCode, color: color.colorCode}}
                                    aria-label={`Select color ${color.colorCode}`}
                                    onClick={()=> handleColorClick(color.color)}>
                                        .
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <hr className='border-gray-300 mt-8'/>
            <div className='grid grid-cols-2'>
                <div>
                    <p className='text-[14px] font-semibold mt-8 text-gray-500'>Select your size</p>
                </div>
                <div className='w-full text-end pr-8'>
                    <button className='text-[12px] font-semibold mt-8 text-gray-500 underline'>Size guide</button>
                </div>
            </div>
            <div className='w-full flex flex-wrap gap-2 pt-4'>
                {availableSizes.map((size) => (
                    <button key={size} className={`inline-block py-2 px-3 text-black text-center w-[50px] h-[50px] rounded-full border border-gray-300 hover:bg-black hover:text-white transition-all duration-500 ease-in-out active:bg-gray-200 
                    ${selectedSize === size ?'bg-black text-white hover:bg-black' : ''}`}
                    aria-label={`Select size ${size}`}
                    onClick={()=> handleSizeClick(size)}>
                        {size}
                    </button>
                ))}
            </div>
            <hr className='border-gray-300 mt-8'/>
            <p className='text-center text-[14px] font-semibold text-gray-600 mt-8'>Delivery between February 10 and February 15</p>
            <div className='w-full justify-center items-center text-center pt-4'>
                <button onClick={() => onAdd(saleData, 1, SelectedColor)} className="group relative rounded-full min-h-[64px] w-[80%] overflow-hidden border border-white bg-black text-white transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-[#f2f2f2] before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-[#f2f2f2] after:duration-500 hover:text-black hover:before:h-full hover:after:h-full">
                <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#f2f2f2] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#f2f2f2] after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full"></span>
                <span className="relative bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-black text-[18px] font-semibold">Add to cart</span>
                </button>
            </div>
            <p className='text-center text-[14px] font-bold text-gray-800 mt-2'>Free shipping & Returns from R3000.00 purchase.</p>
            <div className='pt-8'>
                    <ul className='text-1xl font-semibold'>
                    <li className="group cursor-pointer mb-2">
                    <button onClick={()=> handleDrawer('description')} className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[38px] w-[38px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10"><FaPlus className='w-[15px] h-[15px]'/></span>
                    </button>
                        Description
                        </li>
                    <li className="group cursor-pointer mb-2">
                        <button onClick={()=> handleDrawer('shipping')} className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[38px] w-[38px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10"><FaPlus className='w-[15px] h-[15px]'/></span>
                        </button>
                        Shipping & Returns
                        </li>
                        <li className="group cursor-pointer mb-2">
                        <button onClick={()=> handleDrawer('reviews')} className="text-red mr-[12px] hover:before:bg-redborder-black relative rounded-full h-[38px] w-[38px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10"><FaPlus className='w-[15px] h-[15px]'/></span>
                        </button>
                        Reviews
                        </li>
                      </ul>
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
            className={`transform top-0 right-0 w-full sm:w-[640px] bg-[#f2f2f2] fixed h-full overflow-auto ease-in-out transition-all duration-700 z-[99999999991] ${
            (!isOpen) ? "translate-x-full" : "-translate-x-[0]"
            }`}
        >
            <button onClick={handleDrawer} className="text-black mt-6 absolute right-[32px] hover:before:bg-black rounded-full h-[65px] w-[65px] overflow-hidden bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
            <span className="relative z-10"><RxCross2 className='w-[40px] h-[40px]'/></span>
            </button>
            {type === 'description' && (
                <div className='w-full pt-8'>
                <p className='text-4xl font-semibold text-center'>Description</p>
                <div className='w-full p-8'>
                    <h2 className='uppercase text-2xl font-bold'>Product story</h2>
                    <p className='text-1xl text-gray-600 font-semibold mt-8'>The freshest look for any occassiion, the Anzarun Lite Trainers are NIKE most refined shoe yet. 
                      Featuring the breezy Anzarun DNA mesh upper, a cushy SoftFoam+ sockliner and discreet NIKE branding 
                      throughout, you are sure to look great, wharever the day takes you.
                    </p>
                    <h2 className='uppercase text-2xl font-bold mt-8'>Features & Benefits</h2>
                    <ul className='list-disc pl-8 pt-8 text-gray-600'>
                        <li>
                          SoftFoam+ NIKE comfort sockliner for instant step-in and long-lasting comfort that provides soft cushioning every step of your day.
                        </li>
                    </ul>
                    <h2 className='uppercase text-2xl font-bold mt-8'>Details</h2>
                    <ul className='list-disc pl-8 pt-8 text-gray-600'>
                        <li>Low boot</li>
                        <li>Anzarun DNA mesh upper</li>
                        <li>EVA midsole for comfort</li>
                        <li>Rubber outsole for grip</li>
                        <li>NIKE Logo on toe and tongue</li>
                        <li>NIKE Formstrip at lateral side</li>
                    </ul>
                </div>
              </div>
            )}
            {type === 'shipping' && (
                <div className='w-full pt-8'>
                <p className='text-4xl font-semibold text-center'>Shipping & Returns</p>
                <div className='w-full p-8'>
                <h2 className='uppercase text-2xl font-bold'>Preparation</h2>
                    <p className='text-1xl font-semibold text-gray-600 mb-8'>Your order will be prepared under 1 to 3 working days.</p>
                    <h2 className='uppercase text-2xl font-bold'>Delivery</h2>
                    <p className='text-1xl font-semibold'>Delivery is offered in South Africa from R1500 of purchase.</p>
                    <p className='text-1xl font-semibold text-gray-600 mb-8'>Once prepared, your order will be sent under 24 to 72 working hours at your residence or in point relay according to your preference.</p>
                    <h2 className='uppercase text-2xl font-bold'>Return</h2>
                    <p className='text-1xl font-semibold'>The return is offered in metropolitan South Africa.</p>
                    <p className='text-1xl font-semibold text-gray-600'>You have 60 days from reception of your shoes to benefit from the free return. The returned items must respect the following conditions:</p>
                    <ul className='list-disc pl-8 pt-4 text-gray-600 font-semibold'>
                      <li>they must not have been worn outside</li>
                      <li>they must be in a new condition</li>
                    </ul>
                </div>
              </div>
            )}
            {type === 'reviews' && (
                <div className='w-full pt-8'>
                <p className='text-4xl font-semibold text-center'>Reviews</p>
                <div className='p-8 w-full'>
                  <div className='w-full pt-8'>
                    <div className='w-full grid grid-cols-2 gap-2'>
                      <div className='w-full'><h2 className='text-2xl font-bold'>Ezekiel</h2></div>
                      <div className='w-full pt-[3px]'><h2 className='text-center text-1xl text-gray-400'>2024/01/30</h2></div>
                    </div>
                    <div className='flex w-full'>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiOutlineStar className='mt-[4px]'/>
                    </div>
                    <div className='w-full pt-4'>
                      <p className='font-semibold text-gray-600'>I like the quality of the rubber. They are very comfortable. I am really satisfied with the sneakers.</p>
                    </div>
                  </div>
                  <div className='w-full pt-8'>
                    <div className='w-full grid grid-cols-2 gap-2'>
                      <div className='w-full'><h2 className='text-2xl font-bold'>Jacob</h2></div>
                      <div className='w-full pt-[3px]'><h2 className='text-center text-1xl text-gray-400'>2024/01/31</h2></div>
                    </div>
                    <div className='flex w-full'>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiOutlineStar className='mt-[4px]'/>
                        <AiOutlineStar className='mt-[4px]'/>
                    </div>
                    <div className='w-full pt-4'>
                      <p className='font-semibold text-gray-600'>I like the quality of the rubber. They are very comfortable. I am really satisfied with the sneakers.</p>
                    </div>
                  </div>
                  <div className='w-full pt-8'>
                    <div className='w-full grid grid-cols-2 gap-2'>
                      <div className='w-full'><h2 className='text-2xl font-bold'>John</h2></div>
                      <div className='w-full pt-[3px]'><h2 className='text-center text-1xl text-gray-400'>2024/02/04</h2></div>
                    </div>
                    <div className='flex w-full'>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                        <AiFillStar className='mt-[4px]'/>
                    </div>
                    <div className='w-full pt-4'>
                      <p className='font-semibold text-gray-600'>I like the quality of the rubber. They are very comfortable. I am really satisfied with the sneakers.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </aside>
        </div>
        <ReviewModal isVisible={ShowModel} onClose = {()=>setShowModel(false)}/>
    </React.Fragment>
  )
}

export default Temp