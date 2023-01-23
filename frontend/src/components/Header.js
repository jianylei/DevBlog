import { useEffect, useState } from "react"
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { setOpen, setType } from "../features/modal/modalSlice"
import useAuth from '../hooks/useAuth'
import Modal from '../features/modal/Modal'
import { MODAL, REGEX } from '../constants/constants'
import PublishButton from "../features/posts/PublishButton"
import useControlShow from "../hooks/useControlShow"

const Header = ({ showState }) => {
    const [show, setShow] = showState
    const [lastScrollY, setLastScrollY] = useState(0)
  
    const { username, role } = useAuth()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useControlShow(setShow)

    const clickHandle = (t) => {
        dispatch(setType({ type: t }))
        dispatch(setOpen({ open: true }))
    }

    const navRight = () => {
        if (!role) {
            return (
                <nav className="main-header__nav">
                    <button className="login__button" onClick={() => clickHandle(MODAL.TYPE.SignIn)}>
                        Sign In</button>
                    <button className="signup__button" onClick={() => clickHandle(MODAL.TYPE.SignUp)}>
                        Sign Up</button>
                </nav>
            )
        }

        return (
            <nav className="main-header__nav">
                { REGEX.ROUTES.WRITE.test(pathname)
                    ? <PublishButton />
                    : <button className="login__button" onClick={() => navigate('/write')}>Write</button>
                }
                <button className="login__button" onClick={sendLogout}>Log off</button>
            </nav>
        )
    }

    return (
        <header className={`main-header__container ${show 
            && 'main-header-scroll'}`}>
            <Link to='/'>
                <h1 className="main-header__title">DevSpot</h1>
            </Link>
            {navRight()}
        </header>
    )
}

export default Header