import { useState } from 'react'
import {  Link, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { REGEX } from "../../constants/constants"

const BlogHeader = ({ show }) => {
    const [sortOpt, setSortOpt] = useState('new')

    const { pathname } = useLocation()

    const auth = useAuth()

    return (
        <header className={`blog-nav__container ${show 
            && 'blog-header-scroll'}`}>
            <nav className="blog-nav__links">
                <Link className={ REGEX.ROUTES.POSTS.test(pathname) 
                    ? 'active' : '' } to='/'>Latest</Link>
                <Link className={ REGEX.ROUTES.TRENDING.test(pathname) 
                    ? 'active' : '' } to='/trending'>Trending</Link>
                { auth.id
                    ? <Link className={ REGEX.ROUTES.FOLLOWING.test(pathname) 
                        ? 'active' : '' } to='/following'>Following</Link>
                    : undefined
                }

            </nav>
        </header>
    )
}

export default BlogHeader