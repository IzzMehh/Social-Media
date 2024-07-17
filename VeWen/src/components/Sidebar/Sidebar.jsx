import React from 'react'
import {Link,NavLink} from "react-router-dom"
import Button from '../Buttons/Button'

function Sidebar() {
  return(
    <div className='text-white w-full h-full border-r-2'>
      <div className='w-full h-full justify-around md:justify-center text-sm md:text-lg flex md:grid md:grid-rows-[100px,100px,100px,auto]'>
        <Link to="/home" className='hidden md:block'><img className='w-[80px]' src="logo.png" alt="" /></Link>
        <NavLink to="/home" className={({isActive})=>(`${isActive ? 'bg-[#090909] border-2 border-[#3e3e3e]' : 'bg-[#292929] border-2 border-[#3e3e3e]'} outline-none flex justify-center items-center w-[100px] md:w-[150px] md:h-[60px] hover:border-[#fff] rounded-full mb-2`)}><Button text={"Home"} svg={"home"} sideBarButton={true}/></NavLink>
        <NavLink to="/about" className={({isActive})=>(`${isActive ? 'bg-[#151515] border-2 border-[#3e3e3e]' : 'bg-[#292929] border-2 border-[#3e3e3e]'} outline-none flex justify-center items-center  w-[100px] md:w-[150px] md:h-[60px] hover:border-[#fff] rounded-full mb-2`)}><Button text={"About"} svg={"code-slash"} sideBarButton={true}/></NavLink>
        <NavLink to="/profile" className={({isActive})=>(`${isActive ? 'bg-[#151515] border-2 border-[#3e3e3e]' : 'bg-[#292929] border-2 border-[#3e3e3e]'} outline-none md:self-end flex justify-center w-[100px] items-center md:w-[150px] hover:border-[#fff]  md:h-[60px] rounded-full mb-2`)}><Button text={"Profile"} svg={"person"} sideBarButton={true}/></NavLink>
      </div>
    </div>
  )
}

export default Sidebar
