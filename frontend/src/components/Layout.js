import { useEffect, useState } from "react"
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { setOpen, setType } from "../features/modal/modalSlice"
import useAuth from '../hooks/useAuth'
import Modal from '../features/modal/Modal'
import { MODAL, REGEX } from '../constants/constants'
import PublishButton from "../features/posts/PublishButton"
import Header from "./Header"

const Layout = () => {
    const [show, setShow] = useState(false)
    
    return (
        <>
            <Modal />
            <Header showState={[show, setShow]} />
            <div className='main__container'>
                <Outlet context={[show, setShow]} />
            </div>
        </>
    )
}

export default Layout