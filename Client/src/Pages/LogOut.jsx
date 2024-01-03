import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../Store/auth'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Logout = () => {

    const {LogoutUser} = useAuth()

    useEffect( () => {
        LogoutUser()
    },[LogoutUser])

  // if(LogoutUser){
  //   toast.success("LogOut Successful")
  // }
    
  return(
    <>
     <Navigate to="/login" />
    </>
  )
}

export default Logout
