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
  // console.log(params.slug);
  let str = params.slug;
  let parts = str.split("-");
  let productId = parts[0]; // This will be "4adsg3qhDiaHoLUfurcv"
  let productColor = parts[1];

  const currentSaleData = await fetchProductFromFirestore('sales', productId);
  return (
    <div className='w-full bg-[#f2f2f2] '>
        <div className='w-full mt-[107px] sm:grid-cols-3 grid-cols-2 grid sm:gap-8 sm:pl-[2px] pt-8 pb-16 bg-[#f2f2f2]'>
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