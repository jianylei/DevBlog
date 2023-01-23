import { useState } from 'react'
import {  Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { REGEX } from "../constants/constants"

const BlogHeader = ({ show }) => {
    const [sortOpt, setSortOpt] = useState('new')

    const { pathname } = useLocation()

    const { isMod } = useAuth()

    return (
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
    )
}

export default BlogHeader