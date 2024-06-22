import React,{useCallback, useRef} from 'react'
import {Link} from "react-router-dom"
import { AllPosts } from '../components/index'

function PostInput() {
    const inputDiv = useRef(null)
    const fn = (e) =>{
        e.preventDefault()
        console.log('sumbited!!')
        console.log(e)
    }
    const imgSelecterFn = () =>{
        inputDiv.current.click()
    }
  return (
    <>
    <form onSubmit={fn} className={`w-full text-white border-y py-1`}>
         <div className='w-full flex'>
            <div className='h-[50px] rounded-full'>
                <img className='h-full' src="logo.png" alt="" />
            </div>
            <div className='w-full relative '>
                <textarea rows={5} maxLength={300} name="" id="" autoComplete='off' placeholder='Whats on your Mind!?' className='w-full p-2 bg-transparent  outline-none focus:border-b'></textarea>
                <div className='grid grid-cols-[20%,80%] '>
                <div className='relative text-blue-700 '>
                    <input hidden type="file" className='opacity-0 h-7 w-10 absolute' name="" ref={inputDiv} />
                    <button type='button' onClick={imgSelecterFn} className='w-10 h-7 hover:bg-[#1d1d1d]'><ion-icon name="image-outline"></ion-icon></button>
                </div>
                <div className='flex justify-end '>
                    <button type="submit" className='relative right-0 bg-blue-700 py-3 px-10 font-semibold rounded-full '>Post</button>
                </div>
                </div>
            </div>
        </div>
    </form>
    </>
    )
    }

export default PostInput