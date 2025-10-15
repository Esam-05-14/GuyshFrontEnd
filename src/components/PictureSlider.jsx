import React from 'react'
import { useState } from 'react';
function PictureSlider() {


  const images = [
    "../public/guysh1.jpg",
    "../public/guysh2.jpg",
  ];

  const [index, setIndex] = useState(0); 
  const prevSilde = () =>{
    setIndex((prev) => (prev === 0 ? images.length -1 : prev -1))
  } 
  const nextSilde = () =>{
    setIndex((next) => (next === images.length -1 ? 0 : next + 1))
  } 
  return (
    <>
        <div className='flex w-[99%] h-[300px] mt-8 bg-[#193042] rounded'>
            <div className='flex w-1/24 h-full justify-center items-center'>
            <button onClick={prevSilde}
              className="flex w-1/24 h-full justify-center items-center hover:bg-[#1f4a60] transition">
              <span className='text-white text-3xl '>&lt;  </span>
            </button>            
            </div>
            <div className='flex w-11/12 h-full bg-[#202020] text-[#d9d9d991] text-4xl items-center justify-center font-serif'>
                <img src={images[index]} alt="image"
                className="w-full h-full object-cover rounded" />
            </div>
            <div className='flex w-1/24 h-full justify-center items-center'>
              <button onClick={nextSilde} className="flex w-1/24 h-full justify-center items-center hover:bg-[#1f4a60] transition">
                <span className='text-white text-3xl '>&gt;  </span>
              </button>
            </div>
        </div>
    </>
  )
}

export default PictureSlider