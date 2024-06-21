import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider,createRoutesFromElements, createBrowserRouter , Route} from "react-router-dom"
import {Home,Login,Signup} from './pages/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<App/>}>
      <Route path='home' element={<Home/>}/>
      {/* <Route path='login' element={<Login/>}/> */}
    </Route>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
