'use client'

import Footer from '@/components/footer'
import React, {useState} from 'react'
import { collection, query, where, getDocs, orderBy, startAt, endAt } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import ProductList from '@/components/ProductList'

export default function Search() {
    const [SearchText, setSearchText] = useState('');
    const [Sales, setSales] = useState<any>([]);
    const [SearchResultsText, setSearchResultsText] = useState('Search');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        try {
            if(SearchText === '') {
                setSearchResultsText('Search');
                setSales([]);
                setLoading(false);
            }
            else {
                const collectionRef = collection(db, 'sales');
                const startAtName = SearchText.toLowerCase();
                const endAtName = startAtName + '\uf8ff';
                const q = query(collectionRef, orderBy("name"), startAt(startAtName), endAt(endAtName));
                const querySnapshot = await getDocs(q);
                const sales: any[] = [];
                querySnapshot.forEach((doc) => {
                    sales.push(doc.data());
                });
                if(sales.length > 0) {
                    // let totalResults = sales.length;
                    let totalResults = 0;
                    for(let i = 0; i < sales.length; i++) {
                        totalResults += sales[i].saleImages.length;
                    }
                    setSearchResultsText(totalResults.toString() + 'Results Found')
                    setSales(sales);
                    setLoading(false);
                    setSearchText('');
                }
                else {
                    setSearchResultsText('No Results Found');
                    setSales([]);
                    setLoading(false);
                    setSearchText('');
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    if (loading) {
        return <main className="z-[999999999999999999] w-[100%] absolute  text-center item-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
            <div className="w-full h-full">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        </main>;
      }
  return (
    <div className='mt-[107px] pt-8 pl-4'>
        <div className='w-full min-h-[80vh]'>
            <h2 className='uppercase text-6xl font-bold mb-16'>{SearchResultsText}</h2>
            <form onSubmit={handleSubmit}  action="#">
                <div>
                    <input type="text" name="search" id="search" onChange={e => setSearchText(e.target.value)} className="h-[54px] border-b border-bottom-dotted bg-[#f2f2f2] text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-b-primary-600 block sm:w-[50%] w-[96%] p-2.5 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-b-blue-500" placeholder="Search..."/>
                </div>
                <button type="submit" className="mt-12 justfity-center items-center text-center text-red hover:before:bg-redborder-black relative h-[40px] w-[120px] overflow-hidden border border-black bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10 uppercase">search</span>
                </button>
            </form>
            <div className='w-full mt-[-120px] ml-[-8px]'>
                <ProductList salesData={Sales} />
            </div>
        </div>
        <Footer/>
    </div>
  )
}