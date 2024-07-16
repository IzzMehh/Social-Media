import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import service from '../../appwrite/Service'
import {PostBody,Likes} from './components/index'
import likesHandler from './functions/LikesHandler'
import { fetchAppwriteData, fetchAllPostData } from '../../store/serviceSlice'


function Post({userId,postId,images=[],videos=[],profileImgs=[],content,likes=[],comments=[],username,date,reduxImgId}) {
  const currentUserData = useSelector(state => state.auth.userData)
  const [likesData,setLikesData] = useState(likes)

  const [updating,setUpdating] = useState(false)
  const [isDeleted,setDeleted] = useState(false)

  const currentPostRef = React.useRef(null)
  const copyButtonRef = React.useRef(null)
  const optionsDivRef = React.useRef(null)

  const dispatch = useDispatch()

  const haveProfile = () =>{
    return profileImgs.some(imgData => imgData.$id === userId)
  }

  const handleLike = React.useCallback(() => {
    if (!updating) {
      setUpdating(true);
      likesHandler(setLikesData,postId,currentUserData).then(()=>{
        dispatch(fetchAllPostData())
        setUpdating(false)
      })
    }
  }, [likesData,updating]);

  const handleRedirect = (e) =>{
    if(location.pathname === `/posts/${postId}`){
      e.preventDefault()
    }
  }

  const copyLink = () => {
      navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`)
      copyButtonRef.current.innerText = 'Copied !'
      setTimeout(() => {
        copyButtonRef.current.innerHTML = `<span className='relative top-[2px]'><ion-icon name="clipboard-outline"></ion-icon></span> Copy Link`
      }, 500);
  }

  const optionToggle = () => {
      optionsDivRef.current.classList.contains('showOptions') ? optionsDivRef.current.classList.remove('showOptions') : optionsDivRef.current.classList.add('showOptions') 
  }

  return (
    isDeleted ? null :
    <>
<div className='w-full hover:bg-[#262626ad] bg-[#0c0c0c] text-white border-y z-10 py-1' ref={currentPostRef}>
         <div className='w-full flex'>
            <div className='h-[50px] rounded-full'>
                <img className='h-[40px] w-[40px] rounded-full mr-2' src={haveProfile() ? String(service.getProfileImage(userId))+`&${reduxImgId}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
            </div>
            <div className='w-full'>
              <PostBody username={username} date={date} userId={userId} postId={postId} handleRedirect={handleRedirect} content={content} images={images} videos={videos} optionToggle={optionToggle} optionsDivRef={optionsDivRef} copyLink={copyLink} copyButtonRef={copyButtonRef} setDeleted={setDeleted}/>
                <div className='flex mt-2'>
                <div className='text-xl cursor-pointer mr-1'><ion-icon name="chatbox-ellipses-outline"></ion-icon></div>
                <span className='mr-5'>{comments.length}</span>
                <Likes likesData={likesData} handleLike={handleLike}/>
                </div>
              </div>
         </div>
    </div>

    </> 

    

  )
}

export default Post