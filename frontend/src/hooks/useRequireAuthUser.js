import { useEffect, useState } from "react"
import { useLocation, Navigate, useNavigate } from "react-router-dom"
import useAuth from "./useAuth"

const useRequireAuthUser = (val) => {
    const auth = useAuth()
    const location = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
      if (auth.id !== val) {
        console.log('asdasdasd')
        navigate('/')
        //<Navigate to='/' state={{ from: location }} replace />
      }
    }, [auth])

    return auth
}

export default useRequireAuthUser