'use client';

import HeroBanner from "@/components/heroBanner";
import { db } from './firebaseConfig';
import { collection, getDocs} from 'firebase/firestore';
import { useEffect, useState } from "react";
import CategorySlider from "@/components/categorySlider";
import CategoryBanner from "@/components/categoryBanner";
import Footer from "@/components/footer";

async function fetchSalesFromFirestore(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({id:doc.id, ...doc.data()});
  });
  return data;
}

export default function Home() {
  const [menSalesData, setmenSalesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const menData = await fetchSalesFromFirestore('men_sales');
      
      setmenSalesData(menData);
    }
    fetchData();
  }, [])
  
  return (
    <main className='block w-[100%]'>
      <HeroBanner/>
      <CategorySlider womenSalesData={menSalesData} menSalesData={menSalesData}/>
      <CategoryBanner/>
      <Footer/>
    </main>
  );
}
