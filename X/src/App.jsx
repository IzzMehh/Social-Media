import React, { useState } from "react"
import {Sidebar,Post} from "./components/index"
import {Outlet, useNavigate} from "react-router-dom"
import authservice from "./appwrite/Auth"
import {useDispatch,useSelector} from "react-redux"
import { logout,login } from "./store/authSlice"

function App() {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authStatus = useSelector((state)=>state.auth.loginStatus)

    React.useEffect(()=>{
        authservice.getCurrentUser()
        .then((userData)=>{
            if(userData){
                dispatch(login({userData}))
            }
            else{
                dispatch(logout())
                navigate('/login')
            }
        })
    },[navigate,authStatus])


    const openPost = () =>{
      setIsOpen(preval => !preval)
      console.log(isOpen)
    }
    return(
        <>
        <div className="bg-red grid h-full grid-cols-[20%,70%]">
        <Post isOpen={isOpen} fn={openPost}/>
            <div>
                <Sidebar fn={openPost}/>
            </div>
            <div className="overflow-y-auto px-2">
                <Outlet/>
            </div>
        </div>
        </>
        )
}

export default App
