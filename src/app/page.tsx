'use client';

import HeroBanner from "@/components/heroBanner";
import { db } from './firebaseConfig';
import { collection, getDocs} from 'firebase/firestore';
import { useEffect, useState } from "react";
import CategorySlider from "@/components/categorySlider";
import CategoryBanner from "@/components/categoryBanner";
import Footer from "@/components/footer";
import ProductTrack from "@/components/productTrack";
import Slider from "@/components/slider";
import Motivation from "@/components/motivation";

async function fetchSalesFromFirestore(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({id:doc.id, ...doc.data()});
  });
  return data;
}

export default function Home() {
  const [SalesData, setSalesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const Data = await fetchSalesFromFirestore('sales');
      
      setSalesData(Data);
    }
    fetchData();
  }, [])
  
  return (
    <main className='block w-[100%]'>
      <HeroBanner/>
      <CategorySlider salesData={SalesData}/>
      <CategoryBanner/>
      <ProductTrack salesData={SalesData}/>
      <main className="hidden md:block bg-gradient-to-r from-[#f2f2f2] to-[#f2f2f2] w-full min-h-screen mx-auto grid place-items-center">
        <h2 className='uppercase text-4xl font-bold'>NEWS</h2>
        <Slider/>
      </main>
      <Motivation/>
      <Footer/>
    </main>
  );
}
