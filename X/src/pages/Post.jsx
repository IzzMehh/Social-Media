import React, { useState } from 'react'
import { useParams } from 'react-router'
import service from '../appwrite/Service'
import { useSelector } from 'react-redux'
import {CommentSection, PostInput} from '../components/index'
import {Post as PostFormate} from '../components/index'

function Post() {
    const { postId } = useParams()
    const serviceData = useSelector(state=>state.service)

    // console.log(serviceData)
    const [error,setError] = useState(null)
    const [data,setData] = useState(null)
    const [fetchingData,setFetchingData] = useState(true)
    const [updateComments,setUpdateComments] = useState(false)
    const [commentsData,setCommentData] = useState(serviceData.allComments.filter(comment => comment.postId === postId))
    const [profileImgs,setProfileImgs] = useState(serviceData.usersProfile)
    const [postData,setPostData] = useState(serviceData.allPosts.filter(post=>post.$id===postId))
    
    React.useEffect(()=>{
      setPostData(serviceData.allPosts.filter(post=>post.$id===postId))
      setProfileImgs(serviceData.usersProfile)
      setCommentData(serviceData.allComments.filter(comment => comment.postId === postId))
    },[serviceData])

  return (
    <>
    {postData.length > 0 ? postData && profileImgs && commentsData ? <> 
    {postData[0] ? <PostFormate {...postData[0]} date={postData[0].$createdAt} reduxImgId={serviceData.cacheImagesid} profileImgs={profileImgs} postId={postId} /> : null}
     <PostInput commentInput={true} reduxImgId={serviceData.cacheImagesid} postId={postId} fetchData={setUpdateComments} profileImgs={profileImgs}/>
     {updateComments ? null : commentsData.map((commentData)=>(
         <CommentSection key={commentData.$id} profileImgs={profileImgs} reduxImgId={serviceData.cacheImagesid} {...commentData} />
     ))}
     </> : null
     : <div className='text-white'>Cannot find post with the id- {postId}</div>}
    </>
  )
}

export default Post