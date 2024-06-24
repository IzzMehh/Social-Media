import React, { useState } from 'react'
import {useSelector} from "react-redux"
import service from '../appwrite/Service'
import { AllPosts } from '../components'
import { useDispatch } from 'react-redux'
import {logout} from '../store/authSlice'
import authservice from '../appwrite/Auth'
import { useNavigate } from "react-router-dom"

function Profile() {
  const data = useSelector((state)=>state.auth.userData)
  console.log(data)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userPosts,setUserPosts] = useState([])

  React.useEffect(()=>{
    service.getUserPost(data.$id).then((userPosts)=>{
      setUserPosts(userPosts.documents.reverse())
      console.log(userPosts)
    })
  },[])

  const logoutFn = async() =>{
    try {
      await authservice.logout()
      dispatch(logout())
      navigate('/login')
    
    } catch (error) {
     console.log(error) 
    }
  }

  return (
    <>
    <div className=' text-white ml-10 pt-20'>
      <div className='flex'>
      <div className='w-[100px]'>
        <img className='rounded-full' src="https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?rs=1&pid=ImgDetMain" alt="" />
      </div>
      <div className='ml-10 mt-5 text-2xl font-content'>
        <p>{data.name}</p>
        <p className='text-sm'>{data.email}</p>
      </div>
      <div className='ml-10 mt-5'>
        <button 
        onClick={logoutFn}
        className='p-4 border rounded-full hover:bg-white hover:text-black'>Logout</button>
      </div>
      </div>
      <div className='mt-10'>
        {userPosts && userPosts.map((post)=>(
        <AllPosts {...post} postId={post.$id} />
        ))}
        
      </div>
    </div>
    </>
  )
}

export default Profile