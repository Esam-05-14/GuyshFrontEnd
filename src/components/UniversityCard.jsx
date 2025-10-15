import React from 'react'

function UniversityCard({key, name, city , src }) {
  return (
    <div className='flex flex-col rounded-2xl justify-evenly items-center border-[##202020] border-3 h-[259px] w-[350px]'>
        <h3 className="text-[#912211] text-xl mt-5">{name}</h3>
        <div className='w-28 h-27 object-contain rounded-lg bg-white p-2'>
            {src}
        </div>
        <p className="text-[#193042] px-5">{city}</p>
    </div>
  )
}

export default UniversityCard