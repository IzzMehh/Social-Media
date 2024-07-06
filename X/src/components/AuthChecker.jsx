import React from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {Loader} from './index'

function AuthChecker({children}) {
    const navigate = useNavigate()
    const loginStatus = useSelector(state => state.auth.loginStatus)
    const dispatch = useDispatch()
    const [setLoader,loader] = React.useState(true)

    React.useEffect(()=>{
        authservice.getCurrentUser()
        .then((userData) => {
            if (userData) {
                dispatch(login({ userData }))
                navigate('/home')
            }
            else {
                dispatch(logout())
                navigate('/login')
            }
        })
        setLoader(false)
    },[loginStatus])

  return setLoader ? Loader : children
}

export default AuthChecker