import React, { useState } from 'react'
import { AllPosts, Loader, PostInput } from '../components/index'
import service from '../appwrite/Service'
import { useSelector } from 'react-redux'

function Home() {
  const [postData, setPostData] = useState([])
  const [profileImgs,setProfileImgs] = useState([])
  const [fetchPost, setFetchPost] = useState(false)
  const reduxData = useSelector(state => state.auth)

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
    <PostInput fetchPostFn={setFetchPost} reduxImgId={reduxData.id} profileImgs={profileImgs}/>
      {fetchPost ?
        <>
          {postData && postData.map((post) => (
            <AllPosts key={post.$id} {...post} postId={post.$id} reduxImgId={reduxData.id} profileImgs={profileImgs} date={post.$updatedAt}  />
          ))}  
          </> :
          <Loader/>
      }
    </>

  )
}

export default Home