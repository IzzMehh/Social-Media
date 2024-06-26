import React, { useRef } from 'react'
import {useForm} from "react-hook-form"
import PostInput from './PostInput'

function Post({isOpen,fn}) {
  const dialogRef = useRef(null)
  
  const {register,handleSubmit,formState:{errors}} = useForm()

  React.useEffect(()=>{
    (isOpen===true) ? dialogRef.current.showModal() : dialogRef.current.close()
  },[isOpen])
  
  const submit = (e) =>{
    e.preventDefault()
    fn()
  }

  return (
    <dialog ref={dialogRef} className='bg-[#0c0c0c] w-[50%] rounded-lg'>
      <div className='text-white text-end text-2xl '><span onClick={fn} className='hover:bg-[#ffffffba] cursor-pointer'><ion-icon name="close"></ion-icon></span></div>
    <form onSubmit={handleSubmit(submit)} className='w-full text-white'>
    <PostInput/>
    </form>
    </dialog>
  )
}

export default Post