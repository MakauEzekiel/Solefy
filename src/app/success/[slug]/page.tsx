'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '@/lib/successUtils';
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/app/firebaseConfig';

const Success = ({params}:any) => {
  let str = params.slug;
  const { onRemoveAll } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    console.log("url: "+ params.slug);
    console.log("succssUid: "+uid);
    if(params.slug === uid) {
      console.log('Can access the success page');
      setLoading(false);
      runFireworks();
      localStorage.setItem('uid', '');
      const user = auth.currentUser;
      console.log(user);
      onRemoveAll();
    }
    else {
      console.log('Can not access the success page');
      router.push('/');
    }

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

  return (
    <div className="success-wrapper mt-[107px]">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
        <button className="relative bg-white h-12 w-40 overflow-hidden border border-gray-600 text-gray-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-gray-600 before:duration-300 before:ease-out hover:text-white hover:shadow-gray-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
            <span className="relative z-10">Continue Shopping</span>
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Success