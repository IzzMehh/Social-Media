import React, { useRef, useState } from 'react'
import {useSelector} from "react-redux"
import service from '../appwrite/Service'
import { Post,Uploading } from '../components/index'
import { useDispatch } from 'react-redux'
import {logout} from '../store/authSlice'
import authservice from '../appwrite/Auth'
import { useNavigate } from "react-router-dom"
import { regenerateId } from '../store/serviceSlice'

function Profile() {
  const userData = useSelector((state)=>state.auth.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputButton = useRef(null)
  const [uploading,setUploading] = useState(false)
  
  const serviceData = useSelector(state => state.service)

  const haveProfile = serviceData.usersProfile.some(profileImgs => profileImgs.$id === userData.$id)

  const logoutFn = async() =>{
    try {
      await authservice.logout()
      dispatch(logout())
      navigate('/login')
    
    } catch (error) {
     console.log(error) 
    }
  }


  const uploadFile = async(e) =>{
    if(!uploading){
    setUploading(true)
    if(haveProfile){
      await service.deleteProfileImage(userData.$id)
    }
    await service.uploadProfileImage(userData.$id,e.target.files[0])
    dispatch(regenerateId())
    setUploading(false)
  }
}

  return (
    <>
      {uploading ? null : <input type="file" ref={inputButton} hidden onChange={uploadFile} />}
      <div className=' text-white pt-5 md:pt-20'>
        <div className='flex'>
        <div className='w-[80px] relative'>
          <img className='w-full h-[80px] rounded-full' src={haveProfile ? String(service.getProfileImage(userData.$id))+`&${serviceData.cacheImagesid}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
          <button
          onClick={() => uploading ? null : inputButton.current.click()} 
          className='w-[100px] h-[45px] border rounded-lg hover:bg-white hover:text-black flex justify-center items-center'>{uploading ? <Uploading/> : 'Change' }</button>
        </div>
        <div className='md:ml-5 mt-5 text-2xl font-content'>
          <p>{userData.name}</p>
          <p className='text-sm'>{userData.email}</p>
        </div>
        <div className='md:ml-5 mt-5'>
          <button 
          onClick={logoutFn}
          className='p-4 border rounded-full hover:bg-white hover:text-black'>Logout</button>
        </div>
        </div>
        <div className='mt-10'>
          {serviceData && serviceData.allPosts
          .filter((post)=>post.userId === userData.$id && !serviceData.deletedPost.includes(post.$id))
          .map(post=>(
            <Post key={post.$id} {...post} postId={post.$id} profileImgs={haveProfile ?[{$id:userData.$id}] : [{$id:0}]} reduxImgId={serviceData.cacheImagesid} date={post.$createdAt} />
          ))
          }
        </div>
      </div>
    </>
  )
}

export default Profile