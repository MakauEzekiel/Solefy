import React from 'react'
import image_1 from '@/assets/black_one.avif'
import image_2 from '@/assets/black_two.avif'
import image_3 from '@/assets/black_three.avif'
import image_4 from '@/assets/black_four.avif'
import image_5 from '@/assets/black_five.avif'
import image_6 from '@/assets/black_six.avif'
import image_7 from '@/assets/black_seven.jpg'
import image_grey_1 from '@/assets/grey_one.jpg'
import image_grey_2 from '@/assets/grey_two.avif'
import image_grey_3 from '@/assets/grey_three.avif'
import image_grey_4 from '@/assets/grey_four.avif'
import image_grey_5 from '@/assets/grey_five.avif'
import image_grey_6 from '@/assets/grey_six.avif'
import image_grey_7 from '@/assets/grey_seven.avif'
import image_khaki_1 from '@/assets/khaki_one.jpg'
import image_khaki_2 from '@/assets/khaki_two.avif'
import image_khaki_3 from '@/assets/khaki_three.avif'
import image_khaki_4 from '@/assets/khaki_four.avif'
import image_khaki_5 from '@/assets/khaki_five.avif'
import image_khaki_6 from '@/assets/khaki_six.avif'
import image_khaki_7 from '@/assets/khaki_seven.avif'
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
  // console.log("product Id: "+productId);
  // console.log("product Color: "+productColor);

  const currentSaleData = await fetchProductFromFirestore('sales', productId);
  // console.log("Details: ");
  const color = 'Beige';
  const saleData = {
    name: 'volkan knit sneakers',
    price: '2000',
    saleImages: [
      {
        color: {color: 'black', colorCode: '#000000'},
        imagesUrls: [image_7, image_2, image_3, image_4, image_5, image_6, image_1],
      },
      {
        color: {color: 'grey', colorCode: '#808080'},
        imagesUrls: [image_grey_1, image_grey_2, image_grey_3, image_grey_4, image_grey_5, image_grey_6, image_grey_7],
      },
      {
        color: {color: 'khaki', colorCode: '#f0e68c'},
        imagesUrls: [image_khaki_1, image_khaki_2, image_khaki_3, image_khaki_4, image_khaki_5, image_khaki_6, image_khaki_7],
      },
    ]
  }

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