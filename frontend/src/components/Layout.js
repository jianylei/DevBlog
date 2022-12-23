import { Outlet } from 'react-router-dom'
import LayoutHeader from './LayoutHeader'

const Layout = () => {
    return (
        <>
            <LayoutHeader />
            <div className='main__container'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout