import React,{useCallback, useRef, useState} from 'react'
import { AllPosts,PostInput } from '../components/index'
import service from '../appwrite/Service'

function Home() {
    const inputDiv = useRef(null)

    const [postData,setPostData] = useState([])
    const fn = useCallback((e) =>{
        e.preventDefault()
        console.log('sumbited!!')
        console.log(e)
    },[])
    const imgSelecterFn = () =>{
        inputDiv.current.click()
    }

    React.useEffect(()=>{
      service.getAllPost().then((posts)=>{
        setPostData(posts.documents)
      })
      
      console.log(postData)
    },[])

  return (
    <>
    <PostInput/>
    {postData && postData.map((post)=>(
    <AllPosts {...post} postId={post.$id} />
    ))}
    </>

  )
}

export default Home