import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UniversityCard from '../components/UniversityCard'
import { useAuth } from '../data/AuthContext'

function Universities() {
  const auth = useAuth()
  const unis = auth.universities
  console.log(unis);


  const universities = [
  "Andrássy University Budapest",
  "Budapest Business School",
  "Budapest University of Technology and Economics",
  "Central European University",
  "Corvinus University of Budapest",
  "Eötvös Loránd University",
  "International Business School",
  "Károli Gáspár University of the Reformed Church",
  "Liszt Ferenc Academy of Music",
  "Pázmány Péter Catholic University",
  "Semmelweis University",
  "University of Fine Arts",
  "University of Physical Education",
  "University of Public Service",
  "University of Theatre and Film Arts",
  "University of Veterinary Medicine Budapest",
  "Óbuda University",
  "University of Debrecen",
  "University of Dunaújváros",
  "Eszterházy Károly University",
  "Széchenyi István University",
  "Kaposvár University",
  "John von Neumann University",
  "University of Miskolc",
  "University of Nyíregyháza",
  "University of Pécs",
  "University of Sopron",
  "University of Szeged",
  "University of Pannonia"
];

  
  return (
    <div className='bg-[#D9D9D9] flex flex-col items-center justify-center w-full'>

      <div className="w-full px-20 mt-20">
        <h1 className="text-3xl text-[#a3301e] my-7">Universities</h1>
      </div>
      <div className='w-full px-20 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-5 mb-10 justify-items-center'>
        {unis && unis.map((uni) => <UniversityCard 
        key={`${uni.name}-${uni.city}`}
        name={uni.name}
        city={uni.city}
        src={
          <img
              src={`../assets/logos/${uni.name}.png`}
              alt={uni.name}
              onError={(e) => {
              e.target.src = "../assets/logos/University of Szeged.png";
              e.onerror = null
            }
            }
/>

        }
          />)}
        
      </div>

    </div>
  )
}

export default Universities