'use client'

import React, { useState } from 'react'
import Footer from '@/components/footer'
import Link from 'next/link'
import { db, auth, createUserWithEmailAndPassword } from '@/app/firebaseConfig'
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast'

export default function Signup() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registeredFlag, setRegisteredFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const [credentialError, setCredentialError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
      
        try {
            if(email !== '' && password !== '' && name !== '' && surname !== '') {
                // setLoading(true);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                setErrorFlag(false);
                await setDoc(doc(db, 'users', user.uid), {
                  name: name,
                  surname: surname,
                });
      
                setRegisteredFlag(true);
                await auth.signOut();
                toast.success(`Signed up successfully!`);
            } else {
                setErrorFlag(true);
                setCredentialError( 'Please fill in all required information');
            }
      
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if(errorCode === 'auth/email-already-in-use') {
              console.log('Email already in use');
              setCredentialError( 'Email already in use');
                setErrorFlag(true);
            }
            else {
                setErrorFlag(true);
                setCredentialError('Invalid credentials');
            }
        }finally {
            setIsLoading(false);
          }
      };

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
    <div className='block w-[100%] mt-[107px] min-h-[100vh]'>
        <div className='w-full grid md:grid-cols-2 md:gap-8 p-4'>
            <div className=' w-full h-full'>
                <h2 className='text-black uppercase text-6xl font-bold mt-[36px]'>log in</h2>
                <p>Do you already have an account? Enter your details to log in.</p>
                <Link href="/account/login">
                    <button type="submit" className=" mt-16 justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[220px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10 uppercase">Go to login</span>
                    </button>
                </Link>
            </div>
            {!registeredFlag && (
                <div className=' w-full h-full'>
                    <h2 className='text-black mt-[36px] text-6xl font-bold uppercase'>Sign in</h2>
                    <p className='text-[18px] font-semibold'>Enter your details to create an account.</p>
                    {errorFlag && (
                        <div className="mt-8 w-full md:w-[500px] h-[54px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">{credentialError}</strong>
                            <span className="block sm:inline"></span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full md:max-w-[500px] mt-8 " action="#">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                            <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                        </div>
                        <div>
                            <label htmlFor="surname" className="block mb-2 text-sm font-medium text-black">Surname</label>
                            <input type="text" name="surname" id="surname" onChange={e => setSurname(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Surname"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                            <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                            <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="border h-[54px] bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <button type="submit" className="mt-4 justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[120px] overflow-hidden border border-black bg-white px-3 text-black transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="spinner"></div>
                                    <span>loading...</span>
                                </div>
                            ) : (
                                <span className="relative z-10 uppercase">Sign in</span>
                            )}
                        </button>

                    </form>
                </div>
            )}
            {registeredFlag && (
                <div className='w-full h-full'>
                    <h2 className='text-black mt-[36px] text-6xl font-bold uppercase'>User created successfully</h2>
                    <p className='text-[18px] font-semibold'>You can now log in with your credentials.</p>
                    <button type="submit" className=" mt-16 justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[220px] overflow-hidden border border-black bg-white px-3 text-black transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10 uppercase">Sign in now</span>
                    </button>
                </div>
            )}
        </div>
        <Footer/>
    </div>
  )
}