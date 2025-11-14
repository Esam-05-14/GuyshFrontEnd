// import React from 'react'

// function NewsCard({title, content, date, src}) {
//   return (
//     <div className='flex rounded-2xl justify-evenly items-center border-[##202020] border-3 h-[325px] w-full'>
//         <div className='flex items-center w-1/3 h-full bg-[#193042] text-center rounded-l-lg'>
//             <img className='rounded-l-lg flex h-full w-full object-cover' src={src} alt="news image" />
//         </div>
//         <div className='flex flex-col justify-between items-center  w-2/3 h-full'>
//             <div className='flex flex-col justify-evenly h-full px-6 w-full'>
//                 <h3 className='text-[#912211] text-xl mt-5 '>{title}</h3>
//                 <p className='text-[#193042] text-sm'>{content}</p>
//             </div>
//             <div className='items-end bottom-0 w-full bg-[#193042] text-white rounded-br-lg'>
//                 <span>{date}</span>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default NewsCard
import React from "react";

function NewsCard({ title, content, date, src }) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden w-full hover:shadow-xl transition-all duration-300 border border-gray-200">
      
      {/* Image Section */}
      <div className="w-full sm:w-1/3 h-56 sm:h-[325px]">
        <img
          className="w-full h-full object-cover"
          src={src}
          alt="news image"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between w-full sm:w-2/3 p-6">
        
        {/* Title & Content */}
        <div>
          <h3 className="text-[#912211] text-2xl font-semibold mb-3 leading-tight">
            {title}
          </h3>

          {/* Truncated content (3 lines) */}
          <p className="text-[#193042] text-md leading-relaxed line-clamp-5 text-justify tracking-wide ">
            {content}
          </p>
        </div>

        {/* Date Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-end">
          <span className="text-xs bg-[#193042] text-white py-1 px-3 rounded-lg">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;


// import React from "react";
// import { useTranslation } from "react-i18next";

// function NewsCard({ title, content, date, src }) {
//   const { t, i18n } = useTranslation();

//   return (
//     <div
//       dir={i18n.dir()}
//       className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
//     >
//       {/* Image */}
//       <div className="sm:w-1/3 w-full h-56 sm:h-auto">
//         <img
//           src={src}
//           alt={t("news.image_alt")}
//           className={`w-full h-full object-cover ${
//             i18n.dir() === "rtl" ? "rounded-r-2xl" : "rounded-l-2xl"
//           }`}
//         />
//       </div>

//       {/* Content */}
//       <div className="flex flex-col justify-between sm:w-2/3 w-full p-5">
//         <div>
//           <h3 className="text-[#912211] text-2xl font-semibold mb-3">
//             {title}
//           </h3>
//           <p className="text-[#193042] text-sm leading-relaxed line-clamp-4">
//             {content}
//           </p>
//         </div>

//         {/* Footer */}
//         <div
//           className={`mt-4 bg-[#193042] text-white text-sm py-2 px-4 ${
//             i18n.dir() === "rtl"
//               ? "rounded-tl-lg self-start"
//               : "rounded-tr-lg self-end"
//           }`}
//         >
//           {date}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewsCard;
