import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../authApiSlice'

const SignOffButton = () => {
    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    return (
        <button className="login__button" onClick={sendLogout}>Log off</button>
    )
}

export default SignOffButton