import React from 'react'

function NewsCard({title, content, date, src}) {
  return (
    <div className='flex rounded-2xl justify-evenly items-center border-[##202020] border-3 h-[325px] w-full'>
        <div className='flex items-center w-1/3 h-full bg-[#193042] text-center rounded-l-lg'>
            <img className='rounded-l-lg flex h-full w-full object-cover' src={src} alt="news image" />
        </div>
        <div className='flex flex-col justify-between items-center  w-2/3 h-full'>
            <div className='flex flex-col justify-evenly h-full px-6 w-full'>
                <h3 className='text-[#912211] text-xl mt-5 '>{title}</h3>
                <p className='text-[#193042] text-sm'>{content}</p>
            </div>
            <div className='items-end bottom-0 w-full bg-[#193042] text-white rounded-br-lg'>
                <span>{date}</span>
            </div>
        </div>
    </div>
  )
}

export default NewsCard