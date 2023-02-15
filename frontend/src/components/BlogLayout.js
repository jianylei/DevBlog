import { Outlet, useOutletContext } from "react-router-dom"
import useWindowDimensions from "../hooks/useWindowDimensions"
import SideContent from "./sideContent/SideContent"
import { DIMENSIONS } from "../constants/constants"
import BlogHeader from './header/BlogHeader'

const BlogLayout = () => {
    const [show, setShow] = useOutletContext()
    const { width } = useWindowDimensions()

    return (
        <div className='blog__container'>
            <div className="blog-main__container">
                <BlogHeader show={show} />
                <Outlet />
            </div>
            { width > DIMENSIONS.WIDTH.M ? <SideContent /> : '' }
        </div>
    )
}

export default BlogLayout