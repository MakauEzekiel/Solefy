'use client'

import React, {useState} from 'react'
import { db, auth } from '@/app/firebaseConfig'
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import StarRate from './starRate';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ReviewModal = ({isVisible, onClose, productId}:any) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Comment, setComment] = useState('');
  const [Rating, setRating] = useState<any>(null);
    const [rateColor, setRateColor] = useState<any>(null);
    const [ErrorFlag, setErrorFlag] = useState(false);

    const handleSubmit = async (event: any) => {
      event.preventDefault();
    
      try {
        if(Name !== '' && Email !== '' && Comment !== '' && Rating !== null){
          await addDoc(collection(db, 'reviews'), {
            name: Name,
            email: Email,
            comment: Comment,
            rating: Rating,
            productId: productId,
            date: serverTimestamp()
          });
          setName('');
          setEmail('');
          setComment('');
          setRating(null);
          onClose()
          toast.success(`Thank you for your feedback!`);
        }else {
          setErrorFlag(true);
        }
      } catch (error:any) {
          
      }
    };

  if(!isVisible) return null;
  return (
    <div className='z-[99999999999999999999999999999999999999999999999999999999999999999999] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center flex'>
      <div className='sm:w-[600px] w-[90%] flex flex-col'>
        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>
          x
        </button>
        <div className='bg-[#f2f2f2] p-2 rounded-sm overflow-y-auto max-h-[80vh]'>
        <div className='w-full pt-4'>
            <div className='w-full p-4 pb-0'>
              <p className='text-center text-2xl font-bold'>Review</p>
              <p className='text-center text-[12px] font-semibold text-gray-400'>Your feedback will help other shoppers make good choices, and we will use it to improve our products.</p>
            </div>
            <div className='w-full p-4 pt-0 justify-center items-center'>
            {ErrorFlag && (
                    <div className="mt-8 w-full md:w-[500px] h-[74px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Invalid!</strong>
                        <span className="block sm:inline"> Please fill in all the fields.</span>
                    </div>
                )}
              <form  onSubmit={handleSubmit} className="space-y-4 md:space-y-6 -w-full justtify-center items-center" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                      <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} className="h-[36px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email address</label>
                      <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className="h-[36px] border border-top-dotted bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address"/>
                  </div>
                  <div>
                      <label htmlFor="subject" className="mb-2 text-sm font-medium text-black">rating</label>
                      <div className='flex'>
                      <>
                        {[...Array(5)].map((star, index) => {
                            const currentRate = index+1;
                            return (
                              <div className='flex' key={index}>
                              <label className='flex w-[38px]'>
                                  <input className='flex hidden peer' type='radio' name='rate' value={currentRate}
                                  onClick={() => {console.log("Current Rate: "+currentRate); setRating(currentRate)}}/>
                                  <FaStar className='flex' size={36} color={currentRate <= (rateColor || Rating) ? 'yellow' : 'grey'}/>
                              </label>
                              </div>                                
                            )
                        })}
                    </>
                      </div>
                  </div>
                  <div>
                      <label htmlFor="comment" className="block mb-2 text-sm font-medium text-black">Review</label>
                      <textarea name="comment" id="comment" onChange={e => setComment(e.target.value)} placeholder="" className="border min-h-[56px] bg-white text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <button type="submit" className="justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[36px] w-[220px] overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                      <span className="relative z-10 uppercase">Send a message</span>
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal

// import { collection, query, where, getDocs } from "firebase/firestore";

// // ...

// const q = query(collection(db, "reviews"), where("productId", "==", yourProductId));
// const querySnapshot = await getDocs(q);

// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });
