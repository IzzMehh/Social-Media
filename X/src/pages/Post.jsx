import React, { useState } from 'react'
import { useParams } from 'react-router'
import service from '../appwrite/Service'
import { AllPosts } from '../components/index'
import { useSelector } from 'react-redux'
import {CommentSection, PostInput} from '../components/index'

function Post() {
    const { postId } = useParams()
    const reduxData = useSelector(state => state.auth)

    const [error,setError] = useState(null)
    const [data,setData] = useState(null)
    const [fetchingData,setFetchingData] = useState(true)
    const [updateComments,setUpdateComments] = useState(false)
    const [commentsData,setCommentData] = useState([])
    const [profileImgs,setProfileImgs] = useState([])
    
    React.useEffect(()=>{
        const getPostData = async() =>{
            try {
                const data = await service.getPost(postId)
                if(data){
                    setData(data)
                    console.log(data)
                    const comments = await service.getAllComment(postId)
                    if(comments){
                        setCommentData(comments.documents) 
                        const images = await service.isProfile()
                        if(images){
                            setError(null)
                            setProfileImgs(images.files)
                            setFetchingData(false)
                            setUpdateComments(false)
                        }
                    }
                }else{
                setError('Cannot find any post with Id: '+ postId)
                }
            } catch (error) {
            }
        }
        getPostData()
    },[fetchingData,updateComments])
  return (
    <>
    {fetchingData ? 
    <div className='text-white'>{error} </div>
     : <> 
     <AllPosts {...data} reduxImgId={reduxData.id} profileImgs={profileImgs} postId={postId} />
     <PostInput commentInput={true} reduxImgId={reduxData.id} postId={postId} fetchData={setUpdateComments} profileImgs={profileImgs}/>
     {updateComments ? null :  commentsData.map((commentData)=>(
         <CommentSection key={commentData.$id} profileImgs={profileImgs} reduxImgId={reduxData.id} {...commentData} />
     ))}
     </>
    }
    </>
  )
}

export default Post