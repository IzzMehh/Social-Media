import React, { useState } from 'react'
import { AllPosts, Loader, PostInput } from '../components/index'
import service from '../appwrite/Service'

function Home() {
  const [postData, setPostData] = useState([])
  const [fetchPost, setFetchPost] = useState(true)

  React.useEffect(() => {
    try {
      service.getAllPost().then((posts) => {
        setPostData(posts.documents.reverse())
        setFetchPost(false)
      })
    } catch (error) {
      console.log(error)
      setFetchPost(true)
    }
  }, [fetchPost])

  return (
    <>
      {fetchPost ?
        <Loader/> :
        <>
          <PostInput fetchPostFn={setFetchPost} />
          {postData && postData.map((post) => (
            <AllPosts {...post} postId={post.$id} date={post.$updatedAt}  />
          ))}
        </>
      }
    </>

  )
}

export default Home