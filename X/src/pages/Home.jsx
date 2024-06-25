import React, { useState } from 'react'
import { AllPosts, Loader, PostInput } from '../components/index'
import service from '../appwrite/Service'

function Home() {
  const [postData, setPostData] = useState([])
  const [profileImgs,setProfileImgs] = useState([])
  const [fetchPost, setFetchPost] = useState(false)

  React.useEffect(() => {
    try {
      service.getAllPost().then((posts) => {
        setPostData(posts.documents.reverse())
        setFetchPost(true)

        return service.isProfile()
      }).then((profileImgs)=>{
        setProfileImgs(profileImgs.files)
      })
    } catch (error) {
      console.log(error)
      setFetchPost(false)
      setProfileImgs(false)
    }
  }, [fetchPost])
  

  return (
    <>
      {fetchPost ?
        <>
          <PostInput fetchPostFn={setFetchPost}  profileImgs={profileImgs}/>
          {postData && postData.map((post) => (
            <AllPosts {...post} postId={post.$id} profileImgs={profileImgs} date={post.$updatedAt}  />
          ))}  
          </> :
          <Loader/>
      }
    </>

  )
}

export default Home