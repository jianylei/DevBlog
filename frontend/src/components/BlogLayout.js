import { Outlet, Link, useOutletContext } from "react-router-dom"
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react'

const POST_REGEX = /^\/$/
const AUTHOR_REGEX = /^\/authors(\/)?$/

const BlogLayout = () => {
    const { pathname } = useLocation()
    const [sortOpt, setSortOpt] = useState('new')
    const [show, setShow] = useOutletContext()

    return (
        <div className='blog__container'>
            <div className="blog-main__container">
                <header className={`blog-nav__container ${show 
                        && 'blog-header-scroll'}`}>
                    <nav className="blog-nav__links">
                        <Link className={ POST_REGEX.test(pathname) 
                            ? 'active' : '' } to='/'>Posts</Link>
                        <Link className={ AUTHOR_REGEX.test(pathname) 
                            ? 'active' : '' } to='/authors'>Authors</Link>
                        <Link>Pending</Link>
                    </nav>
                    { POST_REGEX.test(pathname) 
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
            <div className="blog-side__container"></div>
        </div>
    )
}

export default BlogLayout

/*

        <div className='blog__container'>
            <div className={`blog-nav__container ${!show && 'hidden'}`}>
                <div className="blog-nav__links">
                    <Link className={ POST_REGEX.test(pathname) 
                        ? 'active' : '' } to='/'>Posts</Link>
                    <Link className={ AUTHOR_REGEX.test(pathname) 
                        ? 'active' : '' } to='/authors'>Authors</Link>
                    <Link>Pending</Link>
                    <Link>Review</Link>
                </div>
                { POST_REGEX.test(pathname) 
                    ? <select
                        id='post-sort'
                        name='sort'
                        className='blog-nav__select'
                        value='new'
                        onChange={(e) => console.log(e.target.value)}
                    >
                        <option value='new'>New</option>
                        <option value='trending'>Trending</option>
                    </select> 
                    : null 
                }
            </div>

        </div>
*/