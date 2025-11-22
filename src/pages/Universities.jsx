// import React from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import UniversityCard from '../components/UniversityCard'
// import { useAuth } from '../data/AuthContext'

// function Universities() {
//   const auth = useAuth()
//   const unis = auth.universities;

  
//    return (
//     <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center w-full">
//       {/* Header */}
//       <div className="w-full px-6 sm:px-12 lg:px-20 mt-24 text-center lg:text-left">
//         <h1 className="text-4xl font-bold text-[#a3301e] tracking-tight mb-3">
//           Universities
//         </h1>
//         <p className="text-[#193042] text-base max-w-3xl mx-auto lg:mx-0">
//           Discover Hungary’s top universities where international students thrive
//           in world-class programs under the Stipendium Hungaricum scholarship.
//         </p>
//       </div>

//       {/* Grid */}
//       <div className="w-full px-6 sm:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 mb-16 justify-items-center">
//         {unis &&
//           unis.map((uni) => (
//             <div
//               key={`${uni.name}-${uni.city}`}
//               className="w-full max-w-sm transform transition duration-300 hover:-translate-y-2 hover:shadow-lg bg-white rounded-xl border border-gray-100"
//             >
//               <div className="p-6 flex flex-col items-center">
//                 <img
//                   src={`../assets/logos/${uni.name}.png`}
//                   alt={uni.name}
//                   onError={(e) => {
//                     e.target.src = "../assets/logos/University of Szeged.png";
//                     e.onerror = null;
//                   }}
//                   className="w-32 h-32 object-contain mb-4"
//                 />
//                 <h3 className="text-lg font-semibold text-[#193042] text-center">
//                   {uni.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">{uni.city}</p>
//               </div>
//             </div>
//           ))}
//       </div>

      
//     </div>
//   );
// }

// export default Universities

import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../data/AuthContext";
import { Search } from "lucide-react";
import { useState } from "react";

function Universities() {
  const { t, i18n } = useTranslation();
  const {universities, language} = useAuth();
  const unis = universities;
  const [searchQuery, setSearchQuery] = useState("");
  const isRTL = i18n.language === "ar";

  const filteredUnis = unis.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ;
    return matchesSearch;
  });


  return (
    <div
      className="min-h-screen bg-[#f8f9fa] flex flex-col items-center w-full"
      dir={i18n.dir()}
    >
      {/* Header */}
      <div
        className={`w-full px-6 sm:px-12 lg:px-20 mt-24 text-center ${
          i18n.dir() === "rtl" ? "lg:text-right" : "lg:text-left"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#a3301e] tracking-tight mb-3">
          {t("universities.title")}
        </h1>
        <p className="text-[#193042] text-base max-w-3xl mx-auto lg:mx-0 leading-relaxed">
          {t("universities.description")}
        </p>
      </div>
      <div
  className={`bg-white rounded-2xl shadow-md p-6 mt-8 mb-8 flex flex-col sm:flex-row gap-6 
  ${isRTL ? "sm:flex-row-reverse" : ""}`}
>
  {/* Search */}
  <div className="flex-1 relative">
    <Search
      className={`absolute top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
      ${isRTL ? "right-4" : "left-4"}`}
      size={22}
    />

    <input
      type="text"
      placeholder={
        language === "ar"
          ? "ابحث باسم الجامعة"
          : "Search by university name"
      }
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 
      text-gray-800 placeholder-gray-400
      shadow-sm transition-all duration-200
      focus:bg-white focus:border-[#193042] focus:ring-2 focus:ring-[#193042]/40
      outline-none
      ${isRTL ? "pr-12 text-right" : "pl-12"}`}
    />
  </div>
</div>

      

      {/* Grid */}
      <div className="w-full px-6 sm:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 mb-16 justify-items-center">
        {filteredUnis &&
          filteredUnis.map((uni) => (
            <a href={uni.link} target="_blank" className="w-full max-w-sm" rel="noopener noreferrer" >
              <div
                key={`${uni.name}-${uni.city}`}
                className="h-[320px] w-full max-w-sm transform transition duration-300 hover:-translate-y-2 hover:shadow-lg bg-white rounded-xl border border-gray-100"
              >
                <div className="p-6 flex flex-col items-center text-center  lex-grow">
                  <img
                    
                    src={ uni.name === "Balassi Institute" ? "../assets/logos/Balassi Institute.png": `../assets/logos/${uni.name}.png`}
                    alt={uni.name}
                    onError={(e) => {
                      e.target.src = "../assets/logos/Balassi Institute.png";
                      e.onerror = null;
                    }}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#193042] line-clamp-2">
                    {uni.name}
                  </h3>
                  <p className="text-sm text-gray-500">{uni.city}</p>
                </div>
              </div>
              </a>
            
          ))}
      </div>
    </div>
  );
}

export default Universities;
