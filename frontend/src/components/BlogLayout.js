import { useState } from 'react'
import { Outlet, Link, useOutletContext, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useWindowDimensions from "../hooks/useWindowDimensions"
import SideContent from "./SideContent"
import { DIMENSIONS, REGEX } from "../constants/constants"

const BlogLayout = () => {
    const { pathname } = useLocation()
    const [sortOpt, setSortOpt] = useState('new')
    const [show, setShow] = useOutletContext()
    const { width } = useWindowDimensions()

    const { isMod } = useAuth()
    return (
        <div className='blog__container'>
            <div className="blog-main__container">
                <header className={`blog-nav__container ${show 
                        && 'blog-header-scroll'}`}>
                    <nav className="blog-nav__links">
                        <Link className={ REGEX.ROUTES.POSTS.test(pathname) 
                            ? 'active' : '' } to='/'>Posts</Link>
                        <Link className={ REGEX.ROUTES.AUTHORS.test(pathname) 
                            ? 'active' : '' } to='/authors'>Authors</Link>
                        { isMod
                            ? <Link>Pending</Link>
                            : undefined
                        }
                    </nav>
                    { REGEX.ROUTES.POSTS.test(pathname) 
                        ? <select
                            id='post-sort'
                            name='sort'
                            className='blog-nav__select'
                            value={sortOpt}
                            onChange={(e) => setSortOpt(e.target.value)}
                        >
                            <option value='new'>New</option>
                            <option value='trending'>Trending</option>
                        </select> 
                        : null 
                    }
                </header>
                <Outlet />
            </div>
            { width > DIMENSIONS.WIDTH.M ? <SideContent /> : '' }
        </div>
    )
}

export default BlogLayout