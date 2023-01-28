import useAuth from '../../hooks/useAuth'
import { useLocation, useParams } from 'react-router-dom'
import { REGEX } from '../../constants/constants'
import SignInButton from '../../features/modal/components/SignInButton'
import SignUpButton from '../../features/modal/components/SignUpButton'
import SignOffButton from '../../features/auth/components/SignOffButton'
import WriteButton from '../../features/posts/components/buttons/WriteButton'
import PublishButton from "../../features/posts/components/buttons/PublishButton"
import UpdateButton from '../../features/posts/components/buttons/UpdateButton'
import DeleteButton from '../../features/posts/components/buttons/DeleteButton'
import { getIdFromPathStr } from '../../utils/utils'

const HeaderButtonCluster = () => {
    const { role } = useAuth()

    const { pathname } = useLocation()

    const { title } = useParams()

    if (!role) {
        return (
            <nav className="main-header__nav">
                <SignInButton />
                <SignUpButton />
            </nav>
        )
    }

    const routeButton = () => {
        if (REGEX.ROUTES.WRITE.test(pathname)) return <PublishButton />
        else if (REGEX.ROUTES.EDIT.test(pathname)) {

            return <>
                <DeleteButton id={getIdFromPathStr(title)} />
                <UpdateButton />
            </>
        }
        return <WriteButton />
    }

    return (
        <nav className="main-header__nav">
            {routeButton()}
            <SignOffButton />
        </nav>
    )
}

export default HeaderButtonCluster