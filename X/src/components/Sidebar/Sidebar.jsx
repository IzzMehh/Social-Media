import React from 'react'
import {Link,NavLink} from "react-router-dom"

function Sidebar() {
  return(
    <div className='text-white w-full h-full border-r-2'>
      <div className='w-full h-full grid  justify-center  grid-rows-[100px,100px,100px,100px,auto]'>
        <Link to="/"><img className='w-[80px]' src="logo.png" alt="" /></Link>
        <NavLink to="/home" className={({isActive})=>(`${isActive ? 'bg-blue-700' : 'bg-blue-500'} flex justify-center items-center w-[150px] h-[60px] bg-blue-500 rounded-full mb-2`)}><ion-icon name="home"></ion-icon><span className='ml-2'> Home</span></NavLink>
        <NavLink to="/about" className={({isActive})=>(`${isActive ? 'bg-blue-700' : 'bg-blue-500'} flex justify-center items-center w-[150px] h-[60px] rounded-full mb-2`)}><ion-icon name="home"></ion-icon> <span className='ml-2'> About</span></NavLink>
        <button className="flex justify-center items-center w-[150px] h-[60px] bg-blue-500 rounded-full mb-2">Post </button>
        <NavLink to="/profile" className={({isActive})=>(`${isActive ? 'bg-blue-700' : 'bg-blue-500'} self-end flex justify-center items-center w-[150px] h-[60px] bg-blue-500 rounded-full mb-2`)}><ion-icon name="person"></ion-icon><span className='ml-2'> Profile</span></NavLink>
      </div>
    </div>
  )
}

export default Sidebar
