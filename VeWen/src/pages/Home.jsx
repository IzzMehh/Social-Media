import React, { useState } from 'react'
import { PostInput } from '../components/index'
import service from '../appwrite/Service'
import { useSelector,useDispatch } from 'react-redux'
import { fetchAppwriteData } from '../store/serviceSlice'
import Post from '../components/Posts/Post'

function Home() {
  const serviceData = useSelector(state => state.service);
  const dispatch = useDispatch();

  const [newPostsCount, setNewPostsCount] = useState(null);
  
  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const posts = await service.getAllPost();
        if (posts.total > serviceData.allPosts.length) {
          const a = Number(posts.total) - Number(serviceData.allPosts.length);
          setNewPostsCount(a);
        } else {
          setNewPostsCount(null);
        }
      } catch (error) {
        console.log(error);
      }
    }, 10000);
  
    return () => clearInterval(interval);
  }, [serviceData.allPosts.length]);
  

  return (
    <>
    <PostInput reduxImgId={serviceData.cacheImagesid} profileImgs={serviceData.usersProfile} placeholder="Whats on your Mind!?"/>
    {newPostsCount && <div
    onClick={() => {
      dispatch(fetchAppwriteData())
      setNewPostsCount(null)
    }}
     className='text-white text-center py-2 hover:bg-[#ffffff6c] cursor-pointer'>Load {newPostsCount} posts</div>}
     {serviceData.allPosts &&
     serviceData.allPosts.filter(postData => !serviceData.deletedPost.includes(postData.$id)).map((post) => (
     <Post key={post.$id} {...post} postId={post.$id} reduxImgId={serviceData.cacheImagesid} profileImgs={serviceData.usersProfile} date={post.$createdAt}/>
    ))}

    </>

  )
}

export default Home