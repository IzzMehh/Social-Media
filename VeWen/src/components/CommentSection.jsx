import React from 'react'
import service from '../appwrite/Service'
import moment from 'moment'

function CommentSection({userId,content,username,profileImgs=[],reduxImgId,$createdAt}) {
  const haveProfile = () =>{
    return profileImgs.some(imgData => imgData.$id == userId)
  }

  return (
    <div className='w-full text-white py-2 flex border-y'>
    <div className='mr-2'>
      <img className='h-[40px] w-[40px] rounded-full' src={haveProfile() ? String(service.getProfileImage(userId))+`&${reduxImgId}` : service.getProfileImage('66796078001f62ddc452')} />
    </div>

    <div>
      <div>{username} ({moment($createdAt).format('DD/MM/YY · h:mm A ')})</div>
      <div>{content}</div>
    </div>
    </div>
  )
}

export default CommentSection