import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default async function Middleware({children}: { children: JSX.Element}){
    const navigate = useNavigate()
    const [ isLoggin, setIsLoggIn ] = useState<boolean>(false)
    
    const checkToken = () => {
        const token = Cookies.get('token')
        if(!token || token == undefined){
            setIsLoggIn(false)
            return navigate("/login")
        }
        setIsLoggIn(true)
    }

    useEffect(()=> {
        checkToken()
    },[isLoggin])
    
    return(
        <React.Fragment>
            {isLoggin && children}
        </React.Fragment>
    )
} 