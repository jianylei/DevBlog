import { useLocation } from "react-router-dom"
import { useState } from "react"
import { REGEX } from "../../constants/constants"
import AuthorSide from "./AuthorSide"
import FollowingPostsSide from "./FollowingPostsSide"
import PostSide from "./PostSide"
import PostsSide from "./PostsSide"
import useControlShow from "../../hooks/useControlShow"
import FooterSide from "./FooterSide"

const SideContent = () => {
    const [show, setShow] = useState(false)
    useControlShow(setShow)

    const { pathname } = useLocation()
    
    const ROUTES = REGEX.ROUTES

    const renderComponent = () => {
      if (ROUTES.POSTS.test(pathname)) {
        return <PostsSide />
      } else if (ROUTES.FOLLOWING.test(pathname)) {
        return <FollowingPostsSide />
      } else if (ROUTES.AUTHOR.test(pathname)
        && !ROUTES.AUTHORS.test(pathname)) {
        return <AuthorSide />
      } else if (ROUTES.POST.test(pathname)
        && !ROUTES.AUTHORS.test(pathname)) {
        return <PostSide />
      }
    }
    
    return (
        <div>
            <div className={`blog-side__container ${show && 'blog-side-scroll'}`}>
              <div className="side-flex__container">
                {renderComponent()}
                <FooterSide />
              </div>
            </div>
            
        </div>
    )
}

export default SideContent