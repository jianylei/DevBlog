import { Outlet, Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const POST_REGEX = /^\/$/

const BlogLayout = () => {
    const { pathname } = useLocation()

    return (
        <div className='blog__container'>
            <div className='blog-nav__container'>
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