import React, { useState } from 'react'
import {Link} from "react-router-dom"
import service from '../appwrite/Service'
import moment from 'moment'
import { useSelector } from 'react-redux'

function AllPosts({userId,postId,images=[],videos=[],profileImgs=[],content,likes=[],comments,username,date,reduxImgId}) {
  const currentUserData = useSelector(state => state.auth.userData)
  console.log(likes)
  const [likesData,setLikesData] = useState(likes)

  const [updating,setUpdating] = useState(false)

  const currentPostRef = React.useRef(null)
  const copyButtonRef = React.useRef(null)
  const optionsDivRef = React.useRef(null)

  const haveProfile = () =>{
    return profileImgs.some(imgData => imgData.$id === userId)
  }
    
  const totalFiles = Number(images.length + videos.length)

  const handleLike = React.useCallback( async() => {
    if (!updating) {
      setUpdating(true);
      try {
        let updatedLikes;
        const newPostData = await service.getPost(postId)
        const newLikeData = newPostData.likes
        if (!newLikeData.includes(currentUserData.$id)) {
          updatedLikes = [...newLikeData, currentUserData.$id];
          setLikesData(updatedLikes);
        } else {
          updatedLikes = newLikeData.filter(id => id !== currentUserData.$id);
          setLikesData(updatedLikes);
        }
        await service.updatePostLikes(postId, updatedLikes);
        console.log(updatedLikes);
      } catch (error) {
        console.error(error);
      } finally {
        setUpdating(false);
      }
    }
  }, [likesData,updating]);
  
  
  const handleRedirect = (e) =>{
    if(location.pathname === `/posts/${postId}`){
      e.preventDefault()
    }
  }

  const deletePost = async() => {
    try {
      if(userId===currentUserData.$id){
        const isDeleted = await service.deletePost(postId)
        if(isDeleted){
          currentPostRef.current.remove()
        }else{
          console.log(isDeleted)
        }
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const copyLink = () => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`)
      copyButtonRef.current.innerText = 'Copied !'
      setTimeout(() => {
        copyButtonRef.current.innerHTML = `<span className='relative top-[2px]'><ion-icon name="clipboard-outline"></ion-icon></span> Copy Link`
      }, 500);
    } catch (error) {
      
    }
  }

  const optionToggle = () => {
      optionsDivRef.current.classList.contains('showOptions') ? optionsDivRef.current.classList.remove('showOptions') : optionsDivRef.current.classList.add('showOptions') 
  }

  const likeButton = React.useMemo(() =>(
    <>
    <div
    onClick={handleLike}  
    className={`text-xl cursor-pointer mr-1 ${likesData.includes(currentUserData.$id) ? 'text-red' : ''}`}><ion-icon name={likesData.includes(currentUserData.$id) ? 'heart' : 'heart-outline'}></ion-icon>
    </div>
    
    <span className=''>{likesData.length}</span>
    </>
  ),[likesData,handleLike])

  const postData  = React.useMemo(()=>(
    <div className='w-full'>
    <div className='flex justify-between'>
    <div className='text-sm md:text-base'>
        {username} · ({moment(date).format('DD/MM/YY · h:mm A ')})
    </div>
    <div className='relative'>
    <span onClick={optionToggle} className='text-lg cursor-pointer'><ion-icon name="ellipsis-vertical-outline"></ion-icon></span>
    <div ref={optionsDivRef} className='bg-white p-2 rounded-lg absolute right-0 w-[150px] transition-all opacity-0 z-[-1]'>
      <p onClick={copyLink} ref={copyButtonRef} className='text-md text-black p-2 cursor-pointer rounded-xl hover:bg-[#00000041]'><span className='relative top-[2px]'><ion-icon name="clipboard-outline"></ion-icon></span> Copy Link</p>
      {userId === currentUserData.$id && <p onClick={deletePost} className='text-md text-red-600 p-2 cursor-pointer rounded-xl hover:bg-[#00000041]'><span className='relative top-[2px]'><ion-icon name="trash"></ion-icon></span> Delete</p>}
    </div>
    </div>
    </div>
    <Link to={`/posts/${postId}`} onClick={handleRedirect}>
    <div className=''>
      {content}
    </div>
    <div className={`${(totalFiles.length > 0) ? 'h-[500px]': 'hidden'}s ${(totalFiles.length > 1) ? `grid grid-cols-2 `: 'grid grid-rows-1 grid-cols-2' } ${(totalFiles.length > 2) ? `grid grid-cols-2 grid-rows-2 `: '' } gap-2`}>
      {images && images.map((id)=>(
        <img key={id} className='h-[150px] md:h-[250px]' src={service.getFilePreview(id)}></img>
      ))}
      {videos && videos.map((id)=>(
        <video controls key={id} className='h-[150px] md:h-[250px]' src={service.getFilePreview(id)}></video>
      ))}
    </div>
    </Link>
</div>
  ),
  [])

  return (
    <>
<div className='w-full hover:bg-[#262626ad] bg-[#0c0c0c] text-white border-y z-10 py-1' ref={currentPostRef}>
         <div className='w-full flex'>
            <div className='h-[50px] rounded-full'>
                <img className='h-[40px] w-[40px] rounded-full mr-2' src={haveProfile() ? String(service.getProfileImage(userId))+`&${reduxImgId}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
            </div>
            <div className='w-full'>
              {postData}
                <div className='flex mt-2'>
                <div className='text-xl cursor-pointer mr-1'><ion-icon name="chatbox-ellipses-outline"></ion-icon></div>
                <span className='mr-5'>{comments.length}</span>
                {likeButton}
                </div>
              </div>
         </div>
    </div>

    </> 

    

  )
}

export default (AllPosts)