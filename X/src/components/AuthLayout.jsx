import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import authservice from '../appwrite/Auth'

function AuthLayout({children}) {
    const navigate = useNavigate()
    const [isLogged,setLogged] = React.useState()

    React.useEffect(()=>{
        authservice.getCurrentUser().then((data)=>{
            if(data){
                setLogged(true)
            }else{
                setLogged(false)
                navigate('/login')
            }
        })
    },[])

  return isLogged ? {children} : null
}

export default AuthLayout