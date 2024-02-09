import React from 'react'
import Temp from '@/components/temp'
import Footer from '@/components/footer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

async function fetchProductFromFirestore(collectionName: string, productId: string) {
  const docRef = doc(db, collectionName, productId);
  const docSnap = await getDoc(docRef);

  return { id: docSnap.id, ...docSnap.data() };
}

const Details = async ({params}:any) => {
  let str = params.slug;
  let parts = str.split("-");
  let productId = parts[0];
  let productColor = parts[1];

  const currentSaleData = await fetchProductFromFirestore('sales', productId);
  return (
    <div className='w-full bg-[#f2f2f2] '>
        <div className='w-full md:mt-[107px] md:grid-cols-3 grid-cols-1 grid md:gap-8 sm:pl-[2px] md:pt-8 pb-16 bg-[#f2f2f2]'>
             <Temp saleData={currentSaleData} color={productColor} />
        </div>
        <div className='w-full'>
              <p className='text-4xl text-black font-semibold text-center'>You may also like</p>
        </div>
        <Footer/>
    </div>
  )
}

export default Details