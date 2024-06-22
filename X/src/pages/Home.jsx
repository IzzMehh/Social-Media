import React,{useCallback, useRef} from 'react'
import {Link} from "react-router-dom"
import { AllPosts,PostInput } from '../components/index'

function Home() {
    const inputDiv = useRef(null)
    const fn = useCallback((e) =>{
        e.preventDefault()
        console.log('sumbited!!')
        console.log(e)
    },[])
    const imgSelecterFn = () =>{
        inputDiv.current.click()
    }
  return (
    <>
    <PostInput/>

    <AllPosts/>
    <AllPosts/>
    <AllPosts/>
    <AllPosts/>
    <AllPosts/>
    <AllPosts/>
    <AllPosts/>
    <AllPosts/>
    </>

  )
}

export default Home