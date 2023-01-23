import useAuth from '../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import { REGEX } from '../constants/constants'
import SignInButton from '../features/modal/SignInButton'
import SignUpButton from '../features/modal/SignUpButton'
import SignOffButton from '../features/auth/SignOffButton'
import WriteButton from '../features/posts/WriteButton'
import PublishButton from "../features/posts/PublishButton"

const HeaderButtonCluster = () => {
    const { role } = useAuth()

    const { pathname } = useLocation()

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

export default HeaderButtonCluster