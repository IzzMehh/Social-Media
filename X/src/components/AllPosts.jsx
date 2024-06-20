import React from 'react'
import {Link} from "react-router-dom"

function AllPosts({userId,postId,content,likes,comments,userName = 'IzzMehGaurav'}) {

  return (
    <>
<Link to={`/posts/${postId}`}>
<div className='w-full hover:bg-[#262626ad] text-white border-y py-1'>
         <div className='w-full flex'>
            <Link to={`/user/${userId}`} className='h-[50px] rounded-full'>
                <img className='h-full' src="logo.png" alt="" />
            </Link>
            <div className='w-full'>
                <Link to={`/user/${userId}`}>
                    {userName}
                </Link>
                <div className=''>
                  {
                    content || `                Hot take. (Could be wrong)

                    Coding labs are awesome but as a beginner, struggle. 
                    
                    Struggle to setup and install those software. Those crying nights to install MySQL or Android are worth it. Your life will be little less scary in production. Setting up environment will teach you a lot. You can spin github workspace anytime but you don’t want to be dependent on it forever, wondering it was magical. 
                    
                    If you disagree with this, to Mirzapur ka trailer kaisa laga? 😂`
                  
                  }
                </div>
                <div className='flex mt-2'>
                <Link to={`/user/${userId}`} className='text-xl cursor-pointer mr-1'><ion-icon name="chatbox-ellipses-outline"></ion-icon></Link>
                <span className='mr-5'>{comments || 999}</span>
                <Link to={''} className='text-xl cursor-pointer mr-1'><ion-icon name="heart-outline"></ion-icon></Link>
                <span className=''>{likes || 9999}</span>
                </div>
            </div>
         </div>
    </div>
    </Link>

    </>

    

  )
}

export default AllPosts