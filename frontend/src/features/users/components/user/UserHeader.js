import useWindowDimensions from "../../../../hooks/useWindowDimensions"
import { DIMENSIONS } from "../../../../constants/constants"
import useAuth from "../../../../hooks/useAuth"
import FollowButton from "../buttons/FollowButton"
import UnfollowButton from "../buttons/UnfollowButton"

const UserHeader = ({ user }) => {
    const { width } = useWindowDimensions()

    const auth = useAuth()

    const profileImg = user.image 
        ? `url(${user.image})`
        : 'var(--NO-IMAGE)'

    const followerCnt = user?.followers?.length || 0

    const followButton = () => {
        if (user.id === auth.id) return undefined
        if (user.followers?.includes(auth.id)) {
            return <UnfollowButton username={user.username} />
        }
        return <FollowButton username={user.username} />
    }

    return (
        <div className="author-header__container">
            <div className="author-header-userdata">
                { width <= DIMENSIONS.WIDTH.S
                    ? <div
                        className={`image author-card-image ${user.image ? 'img-overlay' : ''}`}
                        style={{backgroundImage: profileImg}}
                    />
                    : undefined
                }
                <div className="author-name__container">
                    <h1 className="author-name">
                        { user.username }
                    </h1>
                    { width <= DIMENSIONS.WIDTH.S
                        ? <p className="author-followers">{followerCnt} Followers</p>
                        : undefined
                    }
                </div>
            </div>
            { width <= DIMENSIONS.WIDTH.M
                    ? followButton()
                    : undefined
            }
        </div>
    )
}

export default UserHeader

// <button className="follow-button author-page-button">Follow</button>