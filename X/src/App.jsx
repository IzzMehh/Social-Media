import React, { useState } from "react"
import { Sidebar } from "./components/index"
import { Outlet, useNavigate } from "react-router-dom"
import authservice from "./appwrite/Auth"
import { useDispatch, useSelector } from "react-redux"
import { logout, login} from "./store/authSlice"
import {Loader} from "./components/index"
import { fetchAppwriteData } from "./store/serviceSlice"

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authStatus = useSelector((state) => state.auth.loginStatus)

    const [isLogged, setIsLogged] = useState(false)


    React.useEffect(() => {
        dispatch(fetchAppwriteData()).then(() => {
            authservice.getCurrentUser().then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                    setIsLogged(true);
                } else {
                    dispatch(logout());
                    navigate('/login');
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }).catch((error) => {
            console.error("Error fetching appwrite data:", error);
        });
    }, [authStatus]);
    

    return (
        <>
            <div className="h-full grid max-md:grid-rows-[90%,10%] md:grid-cols-[20%,80%]">
                <div className="max-md:order-2">
                    <Sidebar/>
                </div>
                <div className="overflow-y-auto px-2">
                    {isLogged ? <Outlet /> : <Loader/>}
                </div>
            </div>
        </>
    )
}

export default App
