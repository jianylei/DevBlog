import { Outlet, Link } from "react-router-dom"

const BlogLayout = () => {
  return (
    <div className='blog-container'>
        <div className='blog-nav__container'>
            <div className="blog-nav__links">
                <Link to='/'>Posts</Link>
                <Link>Authors</Link>
                <Link>Review</Link>
                <Link>Pending</Link>
            </div>
            <select
                id='post-sort'
                name='sort'
                className='blog-nav__select'
                value='new'
                onChange={(e) => console.log(e.target.value)}
            >
                <option value='new'>New</option>
                <option value='trending'>Trending</option>
            </select>
        </div>
        <Outlet />
    </div>
  )
}

export default BlogLayout