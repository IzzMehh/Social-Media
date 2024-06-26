import React from 'react'
import {Link} from "react-router-dom"
import service from '../appwrite/Service'
import moment from 'moment'
import { useSelector } from 'react-redux'

function AllPosts({userId,postId,images=[],videos=[],profileImgs=[],content,likes=[],comments,username,date,reduxImgId}) {

  const currentUserData = useSelector(state => state.auth.userData)

  const haveProfile = () =>{
    return profileImgs.some(imgData => imgData.$id == userId)
  }

  const totalFiles = Number(images.length + videos.length)

  const handleLike = async() => {
    try {
      if(!likes.includes(userId)){
        const postData = await service.getPost(postId)
        const newLikes = postData.likes 
        newLikes.push(currentUserData.$id)
        await service.updatePost(postId,newLikes,postData.comments)
      }else{
        const postData = await service.getPost(postId)
        const index = postData.likes.indexOf(currentUserData.$id)
        const newLikes = postData.likes
        newLikes.splice(index,1)
        await service.updatePost(postId,newLikes,postData.comments)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
<div>
<div className='w-full hover:bg-[#262626ad] text-white border-y py-1'>
         <div className='w-full flex'>
            <div className='h-[50px] rounded-full'>
                <img className='h-[40px] w-[40px] rounded-full mr-2' src={haveProfile() ? String(service.getProfileImage(userId))+`&${reduxImgId}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
            </div>
            <div className='w-full'>
                <div>
                    {username} · ({moment(date).format('DD/MM/YY · h:mm A ')})
                </div>
                <div className=''>
                  {content}
                </div>
                <div className={`${(totalFiles.length > 0) ? 'h-[500px]': 'hidden'}s ${(totalFiles.length > 1) ? `grid grid-cols-2 `: 'grid grid-rows-1 grid-cols-2' } ${(totalFiles.length > 2) ? `grid grid-cols-2 grid-rows-2 `: '' } gap-2`}>
                  {images && images.map((id)=>(
                    <img key={id} className='h-[250px]' src={service.getFilePreview(id)}></img>
                  ))}
                  {videos && videos.map((id)=>(
                    <video controls key={id} className='h-[250px]' src={service.getFilePreview(id)}></video>
                  ))}
                </div>
                <div className='flex mt-2'>
                <div className='text-xl cursor-pointer mr-1'><ion-icon name="chatbox-ellipses-outline"></ion-icon></div>
                <span className='mr-5'>{comments.length}</span>
                <div
                onClick={handleLike}  
                className={`text-xl cursor-pointer mr-1 ${likes.includes(currentUserData.$id) ? 'text-red' : ''}`}><ion-icon name={likes.includes(currentUserData.$id) ? 'heart' : 'heart-outline'}></ion-icon></div>
                <span className=''>{likes.length}</span>
                </div>
            </div>
         </div>
    </div>
    </div>

    </> 

    

  )
}

export default (AllPosts)