import React, { useState } from 'react'
import {useSelector} from "react-redux"
import service from '../appwrite/Service'
import { AllPosts } from '../components'

function Profile() {
  const data = useSelector((state)=>state.auth.userData) ||
  console.log(data)
  console.log('lol')
  const [userPosts,setUserPosts] = useState([])

  React.useEffect(()=>{
    service.getUserPost(data.$id).then((userData)=>{
      setUserPosts(userData)
      console.log(userPosts)
    })
  },[])

  return (
    <>
    <div className='bg-red-300 text-white ml-20 pt-20'>
      <div className='flex'>
      <div className='w-[100px]'>
        <img className='rounded-full' src="https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?rs=1&pid=ImgDetMain" alt="" />
      </div>
      <div className='ml-20 text-2xl font-content'>
        <p>{data.name}</p>
        <p className='text-sm'>{data.email}</p>
      </div>
      </div>
      <div className='text-center text-xl'>
        <div>Posts:</div>
        {userPosts && userPosts.map((posts)=>{
          <AllPosts props={posts}/>
        })}
        
      </div>
    </div>
    </>
  )
}

export default Profile