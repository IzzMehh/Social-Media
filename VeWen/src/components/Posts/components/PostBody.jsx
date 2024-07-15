import React from 'react'
import {Link} from "react-router-dom"
import moment from 'moment'
import service from '../../../appwrite/Service'
import { useSelector, useDispatch } from 'react-redux'
import { addInDeletedList } from '../../../store/serviceSlice'



function PostBody({username,date,userId,postId,handleRedirect,content,images,videos,optionToggle,optionsDivRef,copyLink,copyButtonRef,setDeleted}) {
    const totalFiles = Number(images.length + videos.length)
    const currentUserData = useSelector(state=>state.auth.userData)
    const dispatch = useDispatch()

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

    const deletePost = async() =>{
      try {
        if (userId === currentUserData.$id) {
            const isDeleted = await service.deletePost(postId)
            if (isDeleted) {
                setDeleted(true)
                dispatch(addInDeletedList(postId))
            }
        }
    } catch (error) {
        console.log(error)
    }
    }

    const postBodyContent = React.useMemo(()=>(
      <div className='w-full'>
        <div className='flex justify-between'>
        <div className='text-sm md:text-base'>
            {username} · {dateDifference}
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
    ),[])

    return postBodyContent
}

export default PostBody