import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authservice from '../appwrite/Auth';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import {Uploading, Loader} from '../components/index';
import { Error } from '../components/ui/Toasts/index'


function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploading,setUploading] = useState(false)
  const [isLogged,setLogged] = React.useState(true)
  const [error,setError] = React.useState(false)

  React.useEffect(()=>{
    authservice.getCurrentUser().then(data=>{
      if(data){
        navigate('/home')
      }else{
        setLogged(false)
      }
    })
  },[])

  const onSubmit = async (data) => {
    if(!uploading){
    try {
      setUploading(true)
      const session = await authservice.createAccount(data);
      if (session) {
        const userData = await authservice.login(data);
        if (userData) {
          dispatch(login(userData));
          navigate('/home');
        }
      }
    } catch (error) {
      setError(true)
      console.error('Signup failed:', error);
    }
  }
  };

  return (
    isLogged ? <Loader/> : <div className='w-full flex'>
      {error ? <Error message={'Signup failed'} setError={setError}/> : null}
    <div className='text-white flex justify-center w-full lg:w-[60%] '>
      <div className='mt-[50px]  flex  justify-center w-[600px]'>
        <div className='w-[90%]'>
          <div className='text-4xl font-title font-bold text-[#474BCA] mb-5'>VeWen</div>
          <div className='text-4xl font-content font-bold mb-2'>Signup now</div>
          <div className='text-xl'>Create an account 👀</div>
          
          <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
            <label htmlFor='' className='font-content text-xl font-semibold'>Username</label>
            <div className='mt-2 mb-2'>
              <input {...register('name', {
                required: 'Please Enter the Username',
                pattern: {
                  value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s]{0,29}$/igm,
                  message: 'Username must start with an alphanumeric character, not have consecutive dots, and not end with a dot.',
                },
              })} placeholder='Enter your username' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[90%]' type='text' name='name' />
            </div>
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

            <label htmlFor='' className='font-content text-xl font-semibold'>Email</label>
            <div className='mt-2 mb-2'>
              <input {...register('email', {
                required: 'Please Enter the Email',
                pattern: {
                  value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                  message: 'Invalid Email',
                },
              })} placeholder='Enter your email id' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[90%]' type='email' name='email' />
            </div>
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

            <label htmlFor='' className='font-content text-xl font-semibold'>Password</label>
            <div className='mt-2 mb-2'>
              <input {...register('password', {
                required: 'Please Enter the Password',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })} placeholder='Enter your password' className='px-3 py-2 outline-none bg-transparent border rounded-lg w-[90%]' type='password' name='password' />
            </div>
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

            <button className='bg-blue-700 w-[90%] h-[50px] rounded-md mt-3'>{uploading ? <Uploading/> : 'Sign up'}</button>
            <div className='text-sm mt-2 sm:text-base'>Already have an account? <span className='text-blue-600'>Create an account</span> <Link to='/login' className='text-[#FFA3BE]'>Login</Link></div>
          </form>
        </div>
      </div>
    </div>

    <div className='hidden lg:w-[40%] lg:block'>
      <img src='logo.png' alt='' />
    </div>
  </div>
  );
}

export default Signup;
