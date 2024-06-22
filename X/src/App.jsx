import React, { useState } from "react"
import {Sidebar,Post} from "./components/index"
import {Outlet} from "react-router-dom"

function App() {
    const [isOpen, setIsOpen] = useState(false)

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
