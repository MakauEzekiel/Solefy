'use client'

import React, { useEffect, useState } from 'react'
import { db, auth } from '@/app/firebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { IoMdLogOut, IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AccountDetails() {
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
    const [ButtonFlag, setButtonFlag] = useState('orders');
    const [AddAddressButton, setAddAddressButton] = useState(false);
    const [UpdateInformationButton, setUpdateInformationButton] = useState(false);
    const [addressButtonText, setAddressButtonText] = useState('');

    const router = useRouter();

  const [loading, setLoading] = useState(true);

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
                  setAddressButtonText('Update address');
                  setAddress(data.address);
                }
                else {
                  setAddressButtonText('Add an address');
                }
              }else {
                setAddressButtonText('Add an address');
              }
            }
            setLoading(false);
          } else {
            router.push('/account/login');
          }
        }
        updateData();
      }, [router]);

      useEffect( () => {
        async function updateData() {
          const user = auth.currentUser;
          if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if(data){
              if(data.address) {
                if(data.address.streetAddress !== '' && data.address.city !== '' && data.address.province !== '' && data.address.postalCode !== '') {
                  setAddressButtonText('Update address');
                  setAddress(data.address);
                }
                else {
                  setAddressButtonText('Add an address');
                }
              }
            }
            }
        }
        updateData();
          },[address]);

          useEffect( () => {
            async function updateData() {
              const user = auth.currentUser;
              if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();
                if(data){
                  setName(data.name);
                  setSurname(data.surname);
                  if(data.address && data.address.streetAddress !== '' && data.address.city !== '' && data.address.province !== '' && data.address.postalCode !== '') {
                    setAddress(data.address);
                  }
                }
                }
            }
            updateData();
              },[name, surname, email]);

      const handleSaveInformation =  async (event: any) => {
        event.preventDefault();
        setLoading(true);
      
          try {
            const user = auth.currentUser;

            if (user) {
              if(address){
                await setDoc(doc(db, 'users', user.uid), {
                  name: TempName,
                  surname: TempSurname,
                  address: {
                    streetAddress: address.streetAddress,
                    city: address.city,
                    province: address.province,
                    postalCode: address.postalCode
                  }
                });
              } else {
                await setDoc(doc(db, 'users', user.uid), {
                  name: TempName,
                  surname: TempSurname,
                });
              }
              setName(TempName);
              setSurname(TempSurname);
              setTempName('');
              setTempSurname('');
              setTempEmail('');
              toast.success(`Updated Successfully`);
              setUpdateInformationButton(false);
            }
              setLoading(false);
        
          } catch (error: any) {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode);
          }finally {
              // setLoading(false);
            }
      }

      const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
      
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
              toast.success(`Updated Successfully`);
              setAddAddressButton(false);
              setAddress({
                streetAddress: streetAddress,
                city: city,
                province: province,
                postalCode: postalCode
              });
              setStreetAddress('');
              setCity('');
              setProvince('');
              setPostalCode('');
            }
              // console.log('Address added successfully');
              setLoading(false);
        
          } catch (error: any) {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode);
          }finally {
              // setLoading(false);
            }
        }
      // };

      if (loading) {
        return <main className="z-[999999999999999999] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
            <div className="w-full h-full">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        </main>;
      }

      const handleLogout = async () => {
        try {
          await auth.signOut();
          // Redirect to login page or show a message
          router.push('/account/login');
        } catch (error) {
          console.error('Error signing out', error);
        }
      };

  return (
    <div className='w-[100%] min-h-[80vh] mt-[107px] md:px-16 md:py-16 py-8'>
        <div className='md:flex items-center md:space-x-32 w-full h-full'>
            <div className='md:w-[300px] w-full'>
              <h2 className='text-center text-3xl font-semibold'>User Profile</h2>
              <div className='w-full pt-8 md:px-0 px-16'>
                  <button onClick={() => setButtonFlag('orders')} className={`w-full md:text-center text-start mb-4 pt-4 pb-4 text-2xl font-semibold ${ButtonFlag === 'orders' ? 'border-r-[4px] border-r-black' : 'border-r-[4px] border-r-[#f2f2f2] hover:border-r-gray-600' } transition duration-600 ease-in-out`}>
                    My orders
                  </button>
                  <button onClick={() => setButtonFlag('addresses')} className={`w-full md:text-center text-start mb-4 pt-4 pb-4 text-2xl font-semibold ${ButtonFlag === 'addresses' ? 'border-r-[4px] border-r-black' : 'border-r-[4px] border-r-[#f2f2f2] hover:border-r-gray-400' } transition duration-600 ease-in-out`}>
                    My addresses
                  </button>
                  <button onClick={() => setButtonFlag('informations')} className={`w-full md:text-center text-start mb-4 pt-4 pb-4 text-2xl font-semibold ${ButtonFlag === 'informations' ? 'border-r-[4px] border-r-black' : 'border-r-[4px] border-r-[#f2f2f2] hover:border-r-gray-400' } transition duration-600 ease-in-out`}>
                    My informations
                  </button>
                  <div className='w-full justify-center items-center text-center md:mb-0 mb-8 md:mt-[86px]'>
                    <button onClick={handleLogout} className='text-1xl font-semibold border border-black md:border-[#f2f2f2] hover:border hover:border-black transition duration-500 ease-in-out px-4 py-2'>
                      <IoMdLogOut className='inline-block mr-2 mb-[4px]'/><span>Log out</span>
                    </button>
                  </div>
              </div>
            </div>
            <div className='w-full h-full'>
            <h2 className='text-3xl text-center'>Hello,<span className='font-semibold'> {name} {surname}</span></h2>
              {ButtonFlag === 'orders' && (
                <div className='w-full text-center'>
                  <div className='w-full'>
                      <h2 className='mt-8 text-2xl text-gray-600'>My orders</h2>
                      <p className='text-gray-600'>Find here your past and present orders</p>
                      <div className='w-full pt-16'>
                          <p className='text-1xl font-semibold'>Sorry, you do not have past or present orders</p>
                          <Link href="/">
                            <button type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-white relative h-[50px] w-[220px] overflow-hidden border border-black bg-black px-3 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                                <span className="relative z-10">Start Shopping</span>
                            </button>
                          </Link>
                      </div>
                  </div>
                </div>
              )}
              {(ButtonFlag === 'addresses' && !AddAddressButton) && (
                <div className='w-full text-center'>
                  <div className='w-full px-2 md:px-0'>
                      <h2 className='mt-8 text-2xl text-gray-600'>My addresses</h2>
                      <p className='text-gray-600'>Find here your registered addresses</p>
                      {(address && address.streetAddress !== '' && address.city !== '' && address.province !== '' && address.postalCode !== '') && (
                        <div className='md:min-w-[400px] w-full mt-8 border border-black py-8 flex space-x-32 w-full h-full px-8'>
                            <div className='md:min-w-[200px] w-full'>
                                <p className='uppercase text-black text-[12px] font-semibold mb-4'>Street Address</p>
                                <p className='uppercase text-black text-[12px] font-semibold mb-4'>City</p>
                                <p className='uppercase text-black text-[12px] font-semibold mb-4'>Province</p>
                                <p className='uppercase text-black text-[12px] font-semibold'>Postal Code</p>
                            </div>
                            <div className='md:min-w-[200px] w-full'>
                                <p className='text-black text-[14px] font-semibold mb-[12px]'>{address.streetAddress}</p>
                                <p className='text-black text-[14px] font-semibold mb-[12px]'>{address.city}</p>
                                <p className='text-black text-[14px] font-semibold mb-[12px]'>{address.province}</p>
                                <p className='text-black text-[14px] font-semibold mb-[12px]'>{address.postalCode}</p>
                            </div>
                        </div>
                      )}
                      <div className='w-full pt-8'>
                        {(!address || (address && address.streetAddress === '' && address.city === '' && address.province === '' && address.postalCode === '')) && (
                            <p className='text-1xl font-semibold'>Sorry, you do not have an address</p>
                        )}
                          <button onClick={() => setAddAddressButton(true)} type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-[#f2f2f2] relative h-[50px] w-[220px] overflow-hidden border border-black bg-black px-3 text-[#f2f2f2] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#f2f2f2] before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                              <span className="relative z-10">{addressButtonText}</span>
                          </button>
                      </div>
                  </div>
                </div>
              )}
              {(ButtonFlag === 'addresses' && AddAddressButton) && (
                <div className='w-full text-start pt-8'>
                  <div className='w-full'>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mb-8">Add an address</h2>
                      <div className='w-full text-start justify-start items-start'>
                        <button onClick={() => setAddAddressButton(false)} className='text-start justify-start items-start text-1xl font-semibold border border-[#f2f2f2] hover:border hover:border-black transition duration-500 ease-in-out px-4 py-2'>
                          <IoMdArrowRoundBack className='inline-block mr-2 mb-[4px]'/><span>BACK TO THE LIST</span>
                        </button>
                      </div>
                      <form onSubmit={handleSubmit} action="#" className='md:px-0 px-4'>
                      <div className="border-b border-gray-900/10 pb-12">
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="col-span-full">
                              <div>
                                  <label htmlFor="street-address" className="block mb-2 text-sm font-medium text-black text-start">Street address</label>
                                  <input type="text" name="street-address" id="street-address" onChange={e => {setStreetAddress(e.target.value);}} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <div>
                                  <label htmlFor="city" className="text-start block mb-2 text-sm font-medium text-black">City</label>
                                  <input type="text" name="city" id="city" onChange={e => setCity(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <div>
                                  <label htmlFor="region" className="text-start block mb-2 text-sm font-medium text-black">State / Province</label>
                                  <input type="text" name="region" id="region" onChange={e => setProvince(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <div>
                                  <label htmlFor="postal-code" className="text-start block mb-2 text-sm font-medium text-black">ZIP / Postal code</label>
                                  <input type="text" name="postal-code" id="postal-code" onChange={e => setPostalCode(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>
                            <button onClick={() => setAddAddressButton(true)} type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-[#f2f2f2] relative h-[50px] w-[220px] overflow-hidden border border-black bg-black px-3 text-[#f2f2f2] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#f2f2f2] before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                              <span className="relative z-10">Save my address</span>
                          </button>
                          </div>
                        </div>
                      </form>
                  </div>
                </div>
              )}
              {(ButtonFlag === 'informations' && !UpdateInformationButton) && (
                <div className='md:min-w-[700px] w-full px-2 md:px-0'>
                    <h2 className='text-2xl font-semibold mt-8'>My information</h2>
                    <p className='text-1xl font-semibold text-gray-600'>Find here your informations</p>
                    <div className='md:min-w-[400px] w-full mt-8 border border-black py-8 flex space-x-32 w-full h-full px-8'>
                        <div className='w-fit'>
                            <p className='uppercase text-black text-[12px] font-semibold mb-4'>Name</p>
                            <p className='uppercase text-black text-[12px] font-semibold mb-4'>Surname</p>
                            <p className='uppercase text-black text-[12px] font-semibold mb-4'>Email</p>
                            <p className='uppercase text-black text-[12px] font-semibold'>Phone</p>
                        </div>
                        <div className='md:min-w-[200px] w-full'>
                            <p className='text-black text-[14px] font-semibold mb-[12px]'>{name}</p>
                            <p className='text-black text-[14px] font-semibold mb-[12px]'>{surname}</p>
                            <p className='text-black text-[14px] font-semibold mb-[12px]'>{email}</p>
                            <p className='text-black text-[14px] font-semibold mb-[12px]'>066 315 8280</p>
                        </div>
                    </div>
                    <button onClick={() => setUpdateInformationButton(true)} type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-[#f2f2f2] relative h-[50px] w-[220px] overflow-hidden border border-black bg-black px-3 text-[#f2f2f2] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#f2f2f2] before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10">Edit my informations</span>
                    </button>
                </div>
              )}
              {(ButtonFlag === 'informations' && UpdateInformationButton) && (
                <div className='w-full text-start pt-8'>
                  <div className='w-full'>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mb-8">Update your information</h2>
                      <div className='w-full text-start justify-start items-start'>
                        <button onClick={() => setUpdateInformationButton(false)} className='text-start justify-start items-start text-1xl font-semibold border border-[#f2f2f2] hover:border hover:border-black transition duration-500 ease-in-out px-4 py-2'>
                          <IoMdArrowRoundBack className='inline-block mr-2 mb-[4px]'/><span>BACK TO THE LIST</span>
                        </button>
                      </div>
                      <form onSubmit={handleSaveInformation} className='px-4 md:px-0' action="#">
                      <div className="border-b border-gray-900/10 pb-12">
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            {/* <div className="col-span-full">
                              <div>
                                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black text-start">Email</label>
                                  <input type="email" name="email" id="email" onChange={e => {setTempEmail(e.target.value);}} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div> */}

                            <div className="sm:col-span-2 sm:col-start-1">
                              <div>
                                  <label htmlFor="name" className="text-start block mb-2 text-sm font-medium text-black">Name</label>
                                  <input type="text" name="name" id="name" onChange={e => setTempName(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <div>
                                  <label htmlFor="surname" className="text-start block mb-2 text-sm font-medium text-black">Surname</label>
                                  <input type="text" name="surname" id="surname" onChange={e => setTempSurname(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <div>
                                  <label htmlFor="phone" className="text-start block mb-2 text-sm font-medium text-black">Phone</label>
                                  <input type="text" name="phone" id="phone" onChange={e => setTempPhone(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=''/>
                              </div>
                            </div>
                            <button onClick={() => setUpdateInformationButton(true)} type="submit" className=" mt-8 justfity-center items-center text-center text-white hover:before:bg-redborder-[#f2f2f2] relative h-[50px] w-[220px] overflow-hidden border border-black bg-black px-3 text-[#f2f2f2] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#f2f2f2] before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                              <span className="relative z-10">Update my information</span>
                          </button>
                          </div>
                        </div>
                      </form>
                  </div>
                </div>
              )}
            </div>
        </div>
    </div>
  )
}