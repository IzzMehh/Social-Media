import React from 'react'
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"

function Login() {
  const {register,handleSubmit,formState:{errors}} = useForm()

  const con = (data) =>{
    data.preventDefault
    console.log(data)
  }
  return (
    <div className='w-full flex'>
      <div className='text-white w-[50%]'>
        <div className='ml-[100px] mt-[50px]'>
        <div className='text-4xl font-title font-bold text-[#474BCA] mb-5'>VeWen</div>
        <div className='text-3xl font-content font-bold mb-2'>Login now</div>
        <div className='text-xl'>Hi, Welcome back 👋 </div>
        
        <form onSubmit={handleSubmit(con)} className='mt-5'>
          <label htmlFor="" className='text-black font-content text-lg font-semibold'>Email</label>
          <div className='mt-2 mb-2'>
          <input {...register('email',{required:"Please Enter the Email",pattern:{
            value:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            message:'Invalid Email',
          }})} placeholder='Enter your email id' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[300px]' type="email" name="email" id="" />
          </div>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p> }
          

          <label htmlFor="" className='text-black font-content text-lg font-semibold'>Password</label>
          <div className='mt-2 mb-2'>
          <input {...register('password',{required:"Please Enter the Password"})} placeholder='Enter your password' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[300px]' type="password" name="password" id="" />
          </div>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p> }

          <button className='bg-blue-700 w-[300px] py-3 rounded-md mt-3'>Login</button>
          <div>Not registered yet? <span className='text-blue-600'>Create an account</span> <Link to="/signup" className='text-[#FFA3BE]'>SignUp</Link></div>
          
        </form>
        </div>
      </div>

      <div className='w-[50%]'>
        <img src="logo.png" alt="" />
      </div>
    </div>
  )
}

export default Login