// import React from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import ServiceCard from '../components/ServiceCard'

// function Services() {
//   return (
//     <div className='bg-[#f8f9fa]  flex flex-col items-center justify-center w-full'>
        
//       <div className="w-full px-20 mt-20">
//         <h1 className="text-3xl text-[#a3301e] my-7">Our Services</h1>
//       </div>
//       <div className='w-full px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-10 justify-items-center'>
//         <ServiceCard name="Airport Pickup" description="Apply for Airport pickup" />
//         <ServiceCard name="Applicants Support" description="Get some guidence from experts" />
//       </div>

//     </div>
//   )
// }

// export default Services

import React from 'react';

import ServiceCard from '../components/ServiceCard';
import { useTranslation } from 'react-i18next';

function Services() {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`bg-[#f8f9fa] flex flex-col items-center justify-center w-full ${
        i18n.dir() === 'rtl' ? 'text-right' : 'text-left'
      }`}
      dir={i18n.dir()}
    >
      

      <div className="w-full px-6 sm:px-10 md:px-20 mt-20">
        <h1 className="text-3xl font-bold text-[#a3301e] my-7">
          {t('services.title')}
        </h1>
      </div>

      <div className="w-full px-6 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-10 justify-items-center">
        <ServiceCard
          name={t('services.cards.airport_pickup.name')}
          description={t('services.cards.airport_pickup.description')}
        />
        <ServiceCard
          name={t('services.cards.applicants_support.name')}
          description={t('services.cards.applicants_support.description')}
        />
      </div>

      
    </div>
  );
}

export default Services;
