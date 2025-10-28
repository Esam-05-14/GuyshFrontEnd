// export default function EventCard({ name , description , location , date , src } ) {

  
//     return (
//     <div className="max-w-4xl space-y-6 p-4max-w-3xl mx-auto rounded-md border border-gray-300 shadow-sm overflow-hidden bg-white">
//       {/* Top Section */}
//       <div className="flex p-4 gap-4">
//         {/* Event Image Placeholder */}
//         <div className="flex items-center justify-center w-32 h-32 bg-gray-800 text-white rounded-md text-center text-sm">
//           <img src={src} alt="image of event" className=" h-full w-full rounded" />
//         </div>

//         {/* Event Details */}
//         <div className="flex-1">
//           <h2 className="text-xl font-semibold text-red-700">{name}</h2>
//           <p className="text-sm text-gray-700 mt-1 leading-relaxed">
//             {description || "This is a brief description of the event. It provides an overview of what to expect and any important details attendees should know."}

//           </p>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-2 text-sm">
//         <div className="flex items-center gap-2">
//           <span>📍</span>
//           <span>{location}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span>🕒</span>
//           <span>{date}</span>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EventCard({ name, description, location, date, src }) {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl space-y-6 p-4 max-w-3xl mx-auto rounded-md border border-gray-300 shadow-sm overflow-hidden bg-white">
      {/* Top Section */}
      <div className="flex p-4 gap-4">
        {/* Event Image */}
        <div className="flex items-center justify-center w-32 h-32 bg-gray-800 text-white rounded-md text-center text-sm">
          <img src={src} alt={t('events.image_alt', { name })} className="h-full w-full rounded" />
        </div>

        {/* Event Details */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-red-700">{name}</h2>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
            {description || t('events.default_description')}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-2 text-sm">
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🕒</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
