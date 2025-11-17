import React, { useState, useEffect } from 'react';

function PictureSlider() {
  const images = ["/home_page1.JPG","/home_page2.JPG", "/guysh2.jpg"];
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3000ms = 3s
    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  return (
    <div className="flex w-[99%] h-[300px] mt-8 bg-[#193042] rounded overflow-hidden relative">
      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 bottom-0 w-[5%] flex justify-center items-center hover:bg-[#1f4a60]/60 transition"
      >
        <span className="text-white text-3xl">&lt;</span>
      </button>

      {/* Image */}
      <img
        src={images[index]}
        alt={`slide-${index}`}
        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
      />

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 bottom-0 w-[5%] flex justify-center items-center hover:bg-[#1f4a60]/60 transition"
      >
        <span className="text-white text-3xl">&gt;</span>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? 'bg-white' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default PictureSlider;
