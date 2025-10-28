import React from "react";
import PictureSlider from "../components/PictureSlider";
import CardSmall from "../components/CardSmall";

function MainPage() {
  return (
    <div className="bg-[#f8f9fa] flex flex-col items-center w-full text-gray-800">
      {/* Hero Section with Slider */}
      <section className="relative w-full flex justify-center mt-16">
        {/* bg-gradient-to-b */}
        <div className="absolute inset-0  from-[#193042]/30 to-transparent pointer-events-none" />
        <PictureSlider />
      </section>

      {/* Introduction Section */}
      <section className="w-full max-w-6xl px-6 md:px-12 mt-20 text-center">
        <h3 className="text-4xl font-bold text-[#a3301e] mb-6 tracking-wide relative inline-block after:content-[''] after:block after:w-20 after:h-[3px] after:bg-[#a3301e] after:mx-auto after:mt-2">
          Welcome to Guysh Hungary
        </h3>
        <p className="text-base sm:text-lg leading-relaxed text-[#193042] max-w-3xl mx-auto">
          We are committed to uniting Yemeni students in Hungary through 
          <span className="font-semibold text-[#a3301e]"> collaboration</span>, 
          <span className="font-semibold text-[#a3301e]"> innovation</span>, 
          and <span className="font-semibold text-[#a3301e]"> community spirit</span>.
          Explore our initiatives, events, and resources designed to empower students 
          and create a lasting impact.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="w-full max-w-6xl px-6 md:px-12 mt-16 mb-24">
        <h3 className="text-3xl font-semibold text-[#a3301e] mb-8 text-center">
          Our Services & Activities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardSmall />
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#a3301e]/40 to-transparent mb-10"></div>
    </div>
  );
}

export default MainPage;
