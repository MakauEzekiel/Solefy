'use client'

import React, { useEffect, useState } from 'react'
import Footer from '@/components/footer'
import Link from 'next/link'
import { auth, signInWithEmailAndPassword } from '@/app/firebaseConfig'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentialError, setCredentialError] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/account');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <main className="w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
            <div className="w-full h-full">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        </main>;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setErrorFlag(false);
      console.log('signed in successfully');
      router.push('/account');
    } catch (error:any) {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/invalid-credential') {
            setErrorFlag(true);
            setCredentialError('Invalid credentials');
        }
    }
  };
  return (
    <div className='block w-[100%] mt-[107px] min-h-[100vh]'>
        <div className='w-full grid grid-cols-2 grid gap-8 p-4'>
            <div className=' w-full h-full'>
                <h2 className='text-black mt-[36px] text-6xl font-bold uppercase'>log in</h2>
                <p className='text-[18px] font-semibold'>Enter your details to enter the site.</p>
                {errorFlag && (
                    <div className="mt-8 w-[500px] h-[54px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Invalid Credential!</strong>
                        <span className="block sm:inline"> Please check your email and password.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-[500px] mt-8 " action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className="h-[54px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="border h-[54px] bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[120px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10 uppercase">log in</span>
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-600">
                        Don’t have an account yet? <Link href="/account/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </form>
            </div>
            <div className=' w-full h-full'>
                <h2 className='text-black uppercase text-6xl font-bold mt-[36px]'>sign in</h2>
                <p>Do not have an account? Create one by entering your details.</p>
                <Link href="/account/signup">
                    <button type="submit" className=" mt-16 justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[50px] w-[220px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10 uppercase">Go to registration</span>
                    </button>
                </Link>
            </div>
        </div>
        <Footer/>
    </div>
  )
}