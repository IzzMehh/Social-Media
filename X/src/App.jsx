import React from "react"
import {Sidebar} from "./components/index"
import {Outlet} from "react-router-dom"

function App() {
    return(
        <>
        <div className="bg-red grid h-full grid-cols-[300px,auto,auto]">
            <div>
                <Sidebar/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
        </>
        )
}

export default App
