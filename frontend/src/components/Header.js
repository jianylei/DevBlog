import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {  REGEX } from '../constants/constants'
import PublishButton from "../features/posts/PublishButton"
import useControlShow from "../hooks/useControlShow"
import SignInButton from '../features/modal/SignInButton'
import SignUpButton from '../features/modal/SignUpButton'
import SignOffButton from '../features/auth/SignOffButton'
import WriteButton from '../features/posts/WriteButton'

const Header = ({ showState }) => {
    const [show, setShow] = showState
  
    const { role } = useAuth()

    const navigate = useNavigate()

    const { pathname } = useLocation()

    useControlShow(setShow)

    const navRight = () => {
        if (!role) {
            return (
                <nav className="main-header__nav">
                    <SignInButton />
                    <SignUpButton />
                </nav>
            )
        }

        return (
            <nav className="main-header__nav">
                { REGEX.ROUTES.WRITE.test(pathname)
                    ? <PublishButton />
                    : <WriteButton />
                }
                <SignOffButton />
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