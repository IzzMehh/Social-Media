import React from 'react'
import {Link} from "react-router-dom"
import service from '../appwrite/Service'

function AllPosts({userId,postId,images=[],content,likes,comments,username = 'IzzMehGaurav'}) {

  return (
    <>
<Link to={`/posts/${postId}`}>
<div className='w-full hover:bg-[#262626ad] text-white border-y py-1'>
         <div className='w-full flex'>
            <Link to={`/user/${userId}`} className='h-[50px] rounded-full'>
                <img className='h-full' src="logo.png" alt="" />
            </Link>
            <div className='w-full'>
                <div>
                    {username}
                </div>
                <div className=''>
                  {
                    content || `                Hot take. (Could be wrong)

                    Coding labs are awesome but as a beginner, struggle. 
                    
                    Struggle to setup and install those software. Those crying nights to install MySQL or Android are worth it. Your life will be little less scary in production. Setting up environment will teach you a lot. You can spin github workspace anytime but you don’t want to be dependent on it forever, wondering it was magical. 
                    
                    If you disagree with this, to Mirzapur ka trailer kaisa laga? 😂`
                  
                  }
                </div>
                <div className={`${(images.length > 0) ? 'h-[500px]': 'hidden'}} ${(images.length > 1) ? `grid grid-cols-2 `: 'grid grid-rows-1 ' } ${(images.length > 2) ? `grid-rows-2 `: '' } gap-2`}>
                  {images && images.map((id)=>(
                    <img className='h-full' src={service.getFilePreview(id)}></img>
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

export default AllPosts