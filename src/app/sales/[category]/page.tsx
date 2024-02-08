'use client';
import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import Footer from "@/components/footer";
import { db } from '../../firebaseConfig';
import { collection, getDocs} from 'firebase/firestore';
import Image from "next/image";
import bgMen from '@/assets/menBgOne.jpg'
import bgWomen from '@/assets/womenBgOne.jpg'

async function fetchSalesFromFirestore(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({id:doc.id, ...doc.data()});
    });
    return data;
  }

export default function Products ({params}:any) {
    const category = params.category;
    const [womenSalesData, setwomenSalesData] = useState([]);
    const [menSalesData, setmenSalesData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const womenData = await fetchSalesFromFirestore('sales');
          const menData = await fetchSalesFromFirestore('sales');
          
          setwomenSalesData(womenData);
          setmenSalesData(menData);

          if(category === 'women') {
            setData(womenData);
          }
          else if(category === 'men') {
            setData(menData);
          }
          else {
            setData(womenData.concat(menData));
          }
        }
        fetchData();
      }, [category])

    useEffect(() => {
    },);
    return (
        <div className="w-full">
          <div className="w-full">
            <Image
                src={category === 'men' ? bgMen : bgWomen}
                alt="Description of the image"
                style={{objectFit:"cover"}}
                unoptimized
                className='relative w-full h-[400px] z-[0]'
            />
            <div className="w-full sticky fixed absolute mt-[-200px] pl-16">
                <h2 className="uppercase text-white text-6xl font-bold">{category} SALES</h2>
            </div>
          </div>
            <ProductList salesData={data}/>
            <Footer/>
        </div>
    )
}