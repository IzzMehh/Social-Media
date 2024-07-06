import React, { useState } from 'react'
import { AllPosts, Loader, PostInput } from '../components/index'
import service from '../appwrite/Service'
import { useSelector,useDispatch } from 'react-redux'
import { fetchAppwriteData } from '../store/serviceSlice'

function Home() {
  const serviceData = useSelector(state => state.service)

  console.log(serviceData.allPosts)

  const [newPostsCount,setNewPostsCount] = useState(null)

  const dispatch = useDispatch()

  React.useEffect(()=>{
    setInterval(async() => {
      const posts = await service.getAllPost()
      posts.total>serviceData.allPosts.length
        ? setNewPostsCount(posts.total-serviceData.allPosts.length)
      : setNewPostsCount(null)
    }, 10000);
  },[])

  console.log(serviceData)
  return (
    <>
    <PostInput reduxImgId={serviceData.cacheImagesid} profileImgs={serviceData.usersProfile}/>
    {newPostsCount && <div
    onClick={() => {
      dispatch(fetchAppwriteData())
      setNewPostsCount(null)
    }}
     className='text-white text-center py-2 hover:bg-[#ffffff6c] cursor-pointer'>Load {newPostsCount} posts</div>}
          {serviceData.allPosts && serviceData.allPosts.map((post) => (
            <AllPosts key={post.$id} {...post} postId={post.$id} reduxImgId={serviceData.cacheImagesid} profileImgs={serviceData.usersProfile} date={post.$updatedAt}  />
          ))} 
    </>

  )
}

export default Home