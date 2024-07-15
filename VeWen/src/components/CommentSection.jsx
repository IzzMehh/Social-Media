import React from 'react'
import service from '../appwrite/Service'
import moment from 'moment'

function CommentSection({userId,content,username,profileImgs=[],reduxImgId,$createdAt}) {
  const haveProfile = () =>{
    return profileImgs.some(imgData => imgData.$id == userId)
  }

  const date = $createdAt

  const currentDate = moment()
  const diffInHours = currentDate.diff(date,'hours')
  
  let dateDifference = 0

  if(diffInHours<1){
    dateDifference = currentDate.diff(date,'minutes')
    dateDifference = `${dateDifference} minutes ago`
  }
  else if(diffInHours>=1 && diffInHours<=24){
    dateDifference = currentDate.diff(date,'hours')
    dateDifference = `${dateDifference} hours ago`
  }
  else if(diffInHours>=24 && diffInHours<=168){
    dateDifference = currentDate.diff(date,'days')
    dateDifference = `${dateDifference} days ago`
  }
  else if(diffInHours>=168 && diffInHours<=168){
    dateDifference = currentDate.diff(date,'weeks')
    dateDifference = `${dateDifference} weeks ago`
  }
  else if(diffInHours>=8760){
    dateDifference = currentDate.diff(date,'years')
    dateDifference = `${dateDifference} years ago`
  }

  return (
    <div className='w-full text-white py-2 flex border-y'>
    <div className='mr-2'>
      <img className='h-[40px] w-[40px] rounded-full' src={haveProfile() ? String(service.getProfileImage(userId))+`&${reduxImgId}` : service.getProfileImage('66796078001f62ddc452')} />
    </div>

    <div>
      <div>{username} · {dateDifference}</div>
      <div>{content}</div>
    </div>
    </div>
  )
}

export default CommentSection