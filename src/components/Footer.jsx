import React from 'react'

function Footer() {
  return (
    <div className='sticky bottom-0 flex w-full items-center justify-around  h-20 bg-[#202020] text-white'>
        <div className='flex gap-2 cursor-pointer' onClick={()=>window.open("https://www.facebook.com/profile.php?id=61557650207920","_blank")}>
            <i className=" fa-brands fa-facebook pt-[2px]"></i>
            <p className='text-sm'>Facebook</p>
        </div>
        <span className="w-[2px] h-8 bg-gray-400"></span>
        
        <div
          className="flex gap-2 cursor-pointer">
          <a
          href="mailto:yemitehad.hungary@gmail.com"
          className="flex gap-2 items-center"
          >
            <i className="fa-solid fa-envelope pt-[2px]"></i>
            <p className="text-sm">Email</p>
          </a>
        </div>

        <span className="w-[2px] h-8 bg-gray-400 pt-[2px]"></span>
        
        <div className='flex gap-2 cursor-pointer' onClick={()=>window.open("https://www.youtube.com/@YemenStudentUnion-Hungary","_blank")}>
            <i className=" fa-brands fa-youtube"></i>
            <p className='text-sm'>Youtube</p>
        </div>
        
    </div>
  )
}

export default Footer