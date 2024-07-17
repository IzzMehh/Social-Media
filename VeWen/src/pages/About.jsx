import React from 'react'
import { Github } from '../components/index'

function About() {
  return (
    <div className='text-white font-content'>
    <div>
        <h1 className='text-4xl text-white text-center'>About Our App</h1>
    </div>
    <div className='mb-5'>
        <p className='text-2xl'>Hey there! 👋</p>
        <p>Welcome to our awesome open-source project! We're all about making things better together. This web app is powered by Appwrite on the backend, which means it's super secure, reliable, and ready to rock.</p>
    </div>

    <div className='mb-5'>
        <h2 className='text-2xl'>Why Open Source?</h2>
        <p>Because we believe in the power of community! Our code is out there for anyone to see, contribute to, and improve. It's like a big, friendly neighborhood where everyone's welcome.</p>
    </div>

    <div className='mb-5'>
        <h2 className='text-2xl'>What's Appwrite?</h2>
        <p>Appwrite is the engine that keeps our app running smoothly. It's an open-source backend server that handles all the heavy lifting for us, from databases to authentication, so we can focus on building cool features.</p>
    </div>

    <div className='mb-5'>
        <h2 className='text-2xl'>Join Us!</h2>
        <p>We'd love for you to dive into the code, give feedback, or even contribute your own genius ideas. Let's make something amazing together!</p>
        <div className='mt-5'>
        <Github/>
        </div>
    </div>

    </div>
  )
}

export default About