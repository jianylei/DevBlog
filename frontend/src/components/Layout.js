import { Outlet } from 'react-router-dom'
import LayoutHeader from './LayoutHeader'

const Layout = () => {
    return (
        <>
            <LayoutHeader />
            <div className='main-container'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout