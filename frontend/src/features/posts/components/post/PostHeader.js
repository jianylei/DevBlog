import { useNavigate } from "react-router-dom"
import useWindowDimensions from "../../../../hooks/useWindowDimensions"
import { getTimeSince } from "../../../../utils/utils"
import { DELETED, DIMENSIONS, ROLES } from "../../../../constants/constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import useAuth from "../../../../hooks/useAuth"
import EditButton from "../buttons/EditButton"

const PostHeader = ({ user, post }) => {
    const { width } = useWindowDimensions()

    const { id, role } = useAuth()

    const navigate = useNavigate()

    const navHandler = () => navigate(`/authors/${user?.username}`)

    const time = getTimeSince(new Date(post.createdAt))

    const active = !(post.author === DELETED)

    const profileImg = user?.image && active
        ? `url(${user?.image})`
        : 'var(--NO-IMAGE)'

    const headerButton = () => {
        if (post.user !== id) {
            return <button className="post-follow-button">Follow</button>
        }
        
        return undefined
    }

    return (
        <div className="post-header__container">
            <div
                className={`image post-image ${user?.image ? 'img-overlay' : ''} 
                    ${!active ? 'deleted' : ''}`}
                style={{backgroundImage: profileImg}}
                onClick={active ? navHandler: undefined}
            />
            <div className="post-header-data__container">
                <div
                    className="post-header-data-top"
                    style={ post.user !== id
                        ? {justifyContent: 'flex-start'}
                        : {justifyContent: 'space-between'}
                    }
                >
                    <div 
                        className={`post-username ${!active ? 'deleted' : ''}`}
                        onClick={active ? navHandler : undefined}
                    >
                        {post.author}
                    </div>
                    { width <= DIMENSIONS.WIDTH.M
                        ? headerButton()
                        : undefined
                    }
                </div>
                <div className="post-header-data-bottom">
                    {time}&nbsp;•&nbsp;{post.readTime} min read&nbsp;
                    •&nbsp;{post.views} <FontAwesomeIcon icon={faEye} />
                </div>
            </div>
        </div>
    )
}

export default PostHeader