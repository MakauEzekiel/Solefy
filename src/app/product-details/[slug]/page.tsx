
import React from 'react'

import { db } from '@/app/firebaseConfig';
import { collection, getDocs, getDoc, doc} from 'firebase/firestore';
import Footer from '@/components/footer'
import SaleView from '@/components/saleView'
import SaleDetails from '@/components/saleDetails'
import ProductTrack from '@/components/productTrack'

async function fetchSalesFromFirestore(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({id:doc.id, ...doc.data()});
    });
    return data;
  }

  async function fetchProductFromFirestore(collectionName: string, productId: string) {
    const docRef = doc(db, collectionName, productId);
    const docSnap = await getDoc(docRef);

    return { id: docSnap.id, ...docSnap.data() };
  }

// eslint-disable-next-line @next/next/no-async-client-component
const ProductDetails = async ({params}:any) => {
    const currentSaleData = await fetchProductFromFirestore('men_sales', params.slug);
    const salesData = await fetchSalesFromFirestore('men_sales');

  return (
    <div className='w-full bg-[#f2f2f2] '>
        <div className='w-full mt-[107px] grid-cols-3 grid gap-8 pl-[2px] pt-8 pb-16 bg-[#f2f2f2]'>
             <SaleView saleData = {currentSaleData}/>
             <SaleDetails saleData = {currentSaleData}/>
        </div>
        <ProductTrack data={salesData}/>
        <Footer/>
    </div>
  )
}

export default ProductDetails