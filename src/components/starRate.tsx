import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRate = () => {
    const [rating, setRating] = useState<any>(null);
    const [rateColor, setRateColor] = useState<any>(null)
  return (
    <>
        {[...Array(5)].map((star, index) => {
            const currentRate = index+1;
            return (
                // <>
                <div className='flex' key={index}>
                <label className='flex w-[38px]'>
                    <input className='flex hidden peer' type='radio' name='rate' value={currentRate}
                    onClick={() => {console.log("Current Rate: "+currentRate); setRating(currentRate)}}/>
                    <FaStar className='flex' size={36} color={currentRate <= (rateColor || rating) ? 'yellow' : 'grey'}/>
                </label>
                </div>
                // </>
                
            )
        })}
    </>
  )
}

export default StarRate