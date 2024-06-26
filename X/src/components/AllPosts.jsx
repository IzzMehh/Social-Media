import React from 'react'
import {Link} from "react-router-dom"
import service from '../appwrite/Service'
import moment from 'moment'

function AllPosts({userId,postId,images=[],videos=[],profileImgs=[],content,likes,comments,username = 'IzzMehGaurav',date="22/12/22",reduxImgId}) {

  const haveProfile = () =>{
    return profileImgs.some(imgData => imgData.$id == userId)
  }

  const totalFiles = Number(images.length + videos.length)
  console.log(totalFiles)

  return (
    <>
<Link to={`/posts/${postId}`}>
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
                  {
                    content || `                Hot take. (Could be wrong)

                    Coding labs are awesome but as a beginner, struggle. 
                    
                    Struggle to setup and install those software. Those crying nights to install MySQL or Android are worth it. Your life will be little less scary in production. Setting up environment will teach you a lot. You can spin github workspace anytime but you don’t want to be dependent on it forever, wondering it was magical. 
                    
                    If you disagree with this, to Mirzapur ka trailer kaisa laga? 😂`
                  
                  }
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
                <Link to={'/home'} className='text-xl cursor-pointer mr-1'><ion-icon name="heart-outline"></ion-icon></Link>
                <span className=''>{likes}</span>
                </div>
            </div>
         </div>
    </div>
    </Link>

    </> 

    

  )
}

export default (AllPosts)