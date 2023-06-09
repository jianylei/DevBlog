import { Link } from 'react-router-dom'
import useControlShow from "../../hooks/useControlShow"
import HeaderButtonCluster from './HeaderButtonCluster'

const Header = ({ showState }) => {
    const [show, setShow] = showState

    useControlShow(setShow)

    return (
        <header className={`main-header__container ${show 
            && 'main-header-scroll'}`}>
            <Link to='/'>
                <h1 className="main-header__title">DevBlog</h1>
            </Link>
            <HeaderButtonCluster />
        </header>
    )
}

export default Header