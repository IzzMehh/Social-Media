import React from 'react'
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import authservice from '../appwrite/Auth'

function Login() {
  const {register,handleSubmit,formState:{errors}} = useForm()

  const con = (data) =>{
    console.log(data)
    authservice.login(data)
  }
  return (
    <div className='w-full flex'>
      <div className='text-white flex justify-center w-full lg:w-[60%] '>
        <div className='mt-[50px]  flex  justify-center w-[600px]'>
          <div className='w-[90%]'>
        <div className='text-4xl font-title font-bold text-[#474BCA] mb-5'>VeWen</div>
        <div className='text-4xl font-content font-bold mb-2'>Login now</div>
        <div className='text-xl'>Hi, Welcome back 👋 </div>
        
        <form onSubmit={handleSubmit(con)} className='mt-5'>
          <label htmlFor="" className=' font-content text-xl font-semibold'>Email</label>
          <div className='mt-2 mb-2'>
          <input {...register('email',{required:"Please Enter the Email",pattern:{
            value:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            message:'Invalid Email',
          }})} placeholder='Enter your email id' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[90%]' type="email" name="email" />
          </div>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p> }
          

          <label htmlFor="" className=' font-content text-xl font-semibold'>Password</label>
          <div className='mt-2 mb-2'>
          <input {...register('password',{required:"Please Enter the Password", 
          minLength:{
            value: 8,
            message:"Password must be at least 8 characters",
          },
          pattern:{
            value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            message:'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long'
          }})} placeholder='Enter your password' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[90%]' type="password" name="password" />
          </div>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p> }

          <button className='bg-blue-700 w-[90%] py-3 rounded-md mt-3'>Login</button>
          <div className=' text-sm mt-2 sm:text-base'>Not registered yet? <span className='text-blue-600'>Create an account</span> <Link to="/signup" className='text-[#FFA3BE]'>SignUp</Link></div>
          
        </form>
        </div>
        </div>
      </div>

      <div className='hidden lg:w-[40%] lg:block'>
        <img src="logo.png" alt="" />
      </div>
    </div>
  )
}

export default Login