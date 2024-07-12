import React from 'react'
import { useNavigate } from 'react-router'

function Default() {
    const navigate = useNavigate()

    React.useEffect(()=>{
        navigate('/home')
    },[])
    return null
}

export default Default