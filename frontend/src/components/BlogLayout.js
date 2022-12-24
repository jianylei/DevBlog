import { Outlet, Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react'

const POST_REGEX = /^\/$/

const BlogLayout = () => {
    const { pathname } = useLocation()
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
  
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') { 
              if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                setShow(false)
              } else { // if scroll up show the navbar
                setShow(true)
              }
              // remember current page location to use in the next move
              setLastScrollY(window.scrollY)
            }
        }
    
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar)
    
            // cleanup function
            return () => {
            window.removeEventListener('scroll', controlNavbar)
            }
        }
    }, [lastScrollY])

    return (
        <div className='blog__container'>
            <div className={`blog-nav__container ${!show ?? 'hidden'}`}>
                <div className="blog-nav__links">
                    <Link className={ POST_REGEX.test(pathname) 
                        ? 'active' : '' } to='/'>Posts</Link>
                    <Link>Authors</Link>
                    <Link>Review</Link>
                    <Link>Pending</Link>
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
            <Outlet />
        </div>
    )
}

export default BlogLayout