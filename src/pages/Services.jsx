import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceCard from '../components/ServiceCard'

function Services() {
  return (
    <div className='bg-[#D9D9D9] flex flex-col items-center justify-center w-full'>
        
      <div className="w-full px-20 mt-20">
        <h1 className="text-3xl text-[#a3301e] my-7">Our Services</h1>
      </div>
      <div className='w-full px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-10 justify-items-center'>
        <ServiceCard name="Airport Pickup" description="This is a description of service 1." />
        <ServiceCard name="Applicants Support" description="This is a description of service 2." />
      </div>

    </div>
  )
}

export default Services