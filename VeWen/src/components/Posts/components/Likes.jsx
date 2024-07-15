import React from 'react'
import { useSelector } from 'react-redux'

function Likes({likesData,handleLike}) {
  const currentUserData = useSelector(state=>state.auth.userData)

  const isLiked = likesData.includes(currentUserData.$id)

  return (
    <>
    <div
    onClick={handleLike}  
    className={`text-xl cursor-pointer mr-1 ${isLiked ? 'text-red-600' : null}`}><ion-icon name={isLiked ? 'heart' : 'heart-outline'}></ion-icon>
    </div>
    <span className=''>{likesData.length}</span>
    </>
  )
}

export default Likes