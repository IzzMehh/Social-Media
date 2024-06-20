import React from "react"
import {Sidebar} from "./components/index"
import {Outlet} from "react-router-dom"

function App() {
    return(
        <>
        <div className="bg-red grid h-full grid-cols-[20%,70%]">
            <div>
                <Sidebar/>
            </div>
            <div className="overflow-y-auto px-2">
                <Outlet/>
            </div>
        </div>
        </>
        )
}

export default App
