import React, { useRef, useState } from 'react'
import {useSelector} from "react-redux"
import service from '../appwrite/Service'
import { AllPosts,Loader,Uploading } from '../components/index'
import { useDispatch } from 'react-redux'
import {logout} from '../store/authSlice'
import authservice from '../appwrite/Auth'
import { useNavigate } from "react-router-dom"

function Profile() {
  const data = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userPosts,setUserPosts] = useState([])

  const [haveProfile, setHaveProfile] = useState(false)

  const inputButton = useRef(null)

  const [loading,setLoding] = useState(true) 
  const [uploading,setUploading] = useState(false)

  const fetchData = () =>{
    service.getUserPost(data.userData.$id).then((userPosts)=>{
      setUserPosts(userPosts.documents.reverse())

      return service.isProfile()
    }).then(profileData => {
      setHaveProfile(profileData.files.some(imgData => imgData.$id === data.userData.$id))
      setLoding(false)
      setUploading(false)
    })
  }

  React.useEffect(()=>{
    fetchData()
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


  const uploadFile = async(e) =>{
    if(!uploading){
    setUploading(true)
    if(haveProfile){
      await service.deleteProfileImage(data.userData.$id)
    }
    await service.uploadProfileImage(data.userData.$id,e.target.files[0])
    fetchData()
  }
}

  return (
    <>
    {
      loading ? <Loader/> :     <>
      {uploading ? null : <input type="file" ref={inputButton} hidden onChange={uploadFile} />}
      <div className=' text-white ml-10 pt-20'>
        <div className='flex'>
        <div className='w-[80px] relative'>
          <img className='w-full h-[80px] rounded-full' src={haveProfile ? String(service.getProfileImage(data.userData.$id))+`&${data.id}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
          <button
          onClick={() => uploading ? null : inputButton.current.click()} 
          className='w-[100px] h-[45px] border rounded-lg hover:bg-white hover:text-black flex justify-center items-center'>{uploading ? <Uploading/> : 'Change' }</button>
        </div>
        <div className='ml-10 mt-5 text-2xl font-content'>
          <p>{data.userData.name}</p>
          <p className='text-sm'>{data.userData.email}</p>
        </div>
        <div className='ml-10 mt-5'>
          <button 
          onClick={logoutFn}
          className='p-4 border rounded-full hover:bg-white hover:text-black'>Logout</button>
        </div>
        </div>
        <div className='mt-10'>
          {userPosts && userPosts.map((post)=>(
          <AllPosts {...post} postId={post.$id} profileImgs={haveProfile ?[{$id:data.userData.$id}] : [{$id:0}]} reduxImgId={data.id} date={post.$updatedAt} />
          ))}
          
        </div>
      </div>
      </>
    }
    </>
  )
}

export default Profile