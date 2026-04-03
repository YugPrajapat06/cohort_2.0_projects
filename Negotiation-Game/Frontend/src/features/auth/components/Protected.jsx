import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'

const Protected = ({children}) => {
    const { handleGetMe } = useAuth()
    const {user , loading } = useSelector(state => state.auth)

    useEffect(()=>{
        handleGetMe()
    },[])

    if(loading){
        return(
                <h1 style={{textAlign:"center",fontSize:"0.8rem"}}>Loading...</h1>
        )
    }
    if(!user){
        // return 
        return null
    }
  return (
    children
  )
}

export default Protected
