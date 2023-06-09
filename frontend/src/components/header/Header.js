import { Link } from 'react-router-dom'
import EditProfile from '../../features/modal/components/editProfile/EditProfile'
import EditProfileButton from '../../features/modal/components/EditProfileButton'
import useControlShow from "../../hooks/useControlShow"
import HeaderButtonCluster from './HeaderButtonCluster'

const Header = ({ showState }) => {
    const [show, setShow] = showState

    useControlShow(setShow)

    return (
        <header className={`main-header__container ${show 
            && 'main-header-scroll'}`}>
            <Link to='/'>
                <h1 className="main-header__title">DevSpot</h1>
            </Link>
            <EditProfileButton />
            <HeaderButtonCluster />
        </header>
    )
}

export default Header