import { useLocation } from "react-router-dom"
import { REGEX } from "../../constants/constants"
import AuthorSide from "./AuthorSide"
import FollowingPostsSide from "./FollowingPostsSide"
import PostSide from "./PostSide"
import PostsSide from "./PostsSide"

const SideContent = () => {
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
      <div className="blog-side__container">
          {renderComponent()}
      </div>
    )
}

export default SideContent