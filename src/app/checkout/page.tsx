'use client'

import React, { useState, useEffect } from 'react'
import { db, auth } from '@/app/firebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context'
import Image from 'next/image'
import image from '@/assets/newsThree.avif'
import { toast } from 'react-hot-toast'

export default function Checkout() {
    const { cartItems, toggleCartItemQuantity, onRemove, setIsCartOpen, totalPrice } = useAppContext();
    const [payButtonFlag, setPayButtonFlag] = useState(false);
    const [email, setEmail] = useState<any>('');
    const [tempEmail, setTempEmail] = useState<any>('');
    const [name, setName] = useState('');
    const [TempName, setTempName] = useState('');
    const [surname, setSurname] = useState('');
    const [TempSurname, setTempSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [TempPhone, setTempPhone] = useState('');
    const [address, setAddress] = useState<any>(null);
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const deliveryPrice = 75;

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (!user) {
            router.push('/account/login');
          }else {
            setLoading(false);
          }
        });
    
        return () => unsubscribe();
      }, [router]);

    useEffect(() => {
        async function updateData(){
            const user = auth.currentUser;
            if (user) {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              const data = docSnap.data();
              if(data){
                setName(data.name);
                setSurname(data.surname);
                setEmail(user.email);
                if(data.address) {
                  if(data.address.streetAddress !== '' && data.address.city !== '' && data.address.province !== '' && data.address.postalCode !== '') {
                    setAddress(data.address);
                    setStreetAddress(data.address.streetAddress);
                    setCity(data.address.city);
                    setProvince(data.address.province);
                    setPostalCode(data.address.postalCode);
                    setPayButtonFlag(true);
                  }
                }
              }
            }
          }
          updateData();
        }, []);

        const handleSubmit = async (event: any) => {
            event.preventDefault();
            setIsLoading(true);
          
              try {
                const user = auth.currentUser;
    
                if (user) {
                  // user.email = tempEmail;
                  await setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    surname: surname,
                    address: {
                      streetAddress: streetAddress,
                      city: city,
                      province: province,
                      postalCode: postalCode
                    }
                  });
                  setAddress({
                    streetAddress: streetAddress,
                    city: city,
                    province: province,
                    postalCode: postalCode
                  });
                }
                toast.success(`Address saved Successfully`);
                setPayButtonFlag(true);
            
              } catch (error: any) {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode);
              }finally {
                setIsLoading(false);
              }
            }

            if (loading) {
                return <main className="w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
                        <div className="w-full h-full">
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                            </div>
                        </div>
                    </main>;
              }

  return (
    <div className='w-full mt-[107px] p-8'>
        <div className='w-full grid md:grid-cols-2 grid-cols-1 min-h-[80vh] md:gap-8'>
            <div className=' w-full sm:p-8'>
                <p className='text-2xl font-semibold'>Delivery</p>
                <form onSubmit={handleSubmit} className='md:px-0 px-4'>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <div>
                                <label htmlFor="name" className="text-start block mb-2 text-sm font-medium text-black">Name</label>
                                <input type="text" name="name" id="name" defaultValue={name} onChange={e => setTempName(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Name'/>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <div>
                                <label htmlFor="surname" className="text-start block mb-2 text-sm font-medium text-black">Surname</label>
                                <input type="text" name="surname" id="surname" defaultValue={surname} onChange={e => setTempSurname(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Surname'/>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div>
                                <label htmlFor="street-address" className="block mb-2 text-sm font-medium text-black text-start">Street address</label>
                                <input type="text" name="street-address" id="street-address" defaultValue={streetAddress} onChange={e => setStreetAddress(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='e.g. 1234 Devinish Street'/>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <div>
                                <label htmlFor="city" className="text-start block mb-2 text-sm font-medium text-black">Town</label>
                                <input type="text" name="city" id="city" defaultValue={city} onChange={e => setCity(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Town'/>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <div>
                                <label htmlFor="province" className="text-start block mb-2 text-sm font-medium text-black">Province</label>
                                <input type="text" name="province" id="province" defaultValue={province} onChange={e => setProvince(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Province'/>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <div>
                                <label htmlFor="postal-code" className="text-start block mb-2 text-sm font-medium text-black">Postal code</label>
                                <input type="text" name="postal-code" id="postal-code" defaultValue={postalCode} onChange={e => setPostalCode(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Postal code'/>
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <div>
                                <label htmlFor="phone" className="text-start block mb-2 text-sm font-medium text-black">Phone</label>
                                <input type="text" name="phone" id="phone"  className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Phone'/>
                            </div>
                        </div>
                        <button type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-[#f2f2f2] relative h-[50px] w-[220px] overflow-hidden border border-black bg-black px-3 text-[#f2f2f2] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#f2f2f2] before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                            {isLoading ? (
                                <div className="relative z-10 flex items-center space-x-2">
                                    <div className="spinner"></div>
                                    <span>saving...</span>
                                </div>
                            ) : (
                                <span className="relative z-10 uppercase">Save my address</span>
                            )}
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='w-full sm:p-16 pt-8'>
                <div className='w-full'>
                    {cartItems.length > 0 && cartItems.map((sale:any) => (
                        sale.saleImages.map((imageGroup:any, index:any) => (
                            <React.Fragment key={index}>
                                {(imageGroup.color.color === sale.color) && (
                                    <div className='mb-2' key={sale.product_id}>
                                        <hr />
                                        <div className='flex items-center sm:space-x-4 w-full'>
                                            <Image src={imageGroup.imagesUrls[2]} alt='' width={100} height={100} className='sm:w-24 sm:h-24' style={{objectFit:"cover"}} unoptimized />
                                            <div className='w-full pl-2'>
                                                <p className='font-bold sm:text-2xl text-1xl'>{sale.name}</p>
                                                <p className='text-sm'>{sale.color} / {sale.selectedSize}</p>
                                                <p className='text-sm'>quantity: {sale.quantity}</p>
                                            </div>
                                            <div>
                                            <p className='text-center text-2xl font-bold'>R{sale.totalAmount},00</p>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    ))}
                </div>
                <form action="">
                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 pt-8'>
                        <input type="text" name="coupon" id="coupon" className="h-12 border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Discount code or gift card'/>
                        <button className="relative bg-white h-12 w-40 overflow-hidden border border-gray-600 text-gray-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-gray-600 before:duration-300 before:ease-out hover:text-white hover:shadow-gray-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                            <span className="relative z-10">To validate</span>
                        </button>
                    </div>
                </form>
                <div className='grid grid-cols-2 pt-8'>
                    <p className='text-1xl font-semibold'>Subtotal</p>
                    <p className='text-1xl font-semibold text-end'>R{totalPrice},00</p>
                    <p className='text-1xl font-semibold mt-2'>Delivery</p>
                    <p className='text-1xl font-semibold text-gray-600 text-end mt-2'>R75,00</p>
                    <p className='text-2xl font-bold mt-4'>Total</p>
                    <p className='text-2xl font-bold text-end mt-4'>R{totalPrice+deliveryPrice},00</p>    
                </div>
                <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
                    <input type="hidden" name="merchant_id" value="10000100"/>
                    <input type="hidden" name="merchant_key" value="46f0cd694581a"/>
                    <input type="hidden" name="return_url" value={`https://solefy.vercel.app/success`}/>
                    <input type="hidden" name="cancel_url" value="https://solefy.vercel.app/checkout"/>
                    <input type="hidden" name="notify_url" value="https://solefy.vercel.app/"/>
                    <input type="hidden" name="amount" value={totalPrice+deliveryPrice}/>
                    <input type="hidden" name="item_name" value="#00001"/>
                    <button disabled={!payButtonFlag} type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-[#f2f2f2] rounded relative h-[50px] w-full overflow-hidden border border-green-900 bg-green-900 px-3 text-[#f2f2f2] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#f2f2f2] before:transition-all before:duration-500 hover:text-green-800 hover:shadow-white hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10 font-semibold">Pay now</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}