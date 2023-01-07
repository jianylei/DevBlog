import { useLocation, useParams } from "react-router-dom"
import { useEffect } from "react"
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice"
import { TABS } from "../../constants/constants"
import NoMatch from "../../components/NoMatch"
import { useGetPostsQuery } from "../posts/postsApiSlice"
import { useGetPostByUsernameQuery } from "../posts/postsApiSlice"
import { useGetUserByUsernameQuery } from "../users/usersApiSlice"
import { useSelector } from "react-redux"
import { DIMENSIONS } from "../../constants/constants"
import PostItem from '../posts/PostItem'
import useWindowDimensions from "../../hooks/useWindowDimensions"

const User = () => {
    const { username } = useParams()
    const { width } = useWindowDimensions()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList')

    const {
        data: users,
        isLoading: usersIsLoading,
        isSuccess: usersIsSuceeded,
        isError: usersIsError,
        error: usersError
    } = useGetUsersQuery('usersList')
    
    let content

    if (isSuccess && usersIsSuceeded) {
        const { ids, entities } = posts
        const { ids: usersIds, entities: usersEntities } = users

        const userId = usersIds.find(id => usersEntities[id]?.username === username)
        const user = usersEntities[userId]

        const filteredIds = ids.filter(postId => entities[postId].user === userId)

        const postsContent = ids?.length
            && filteredIds.map(postId => <PostItem key={postId} postId={postId} />)

        const followerCnt = user?.followers?.length || 0

        const profileImg = user.image 
            ? `url(${user.image})`
            : 'var(--NO-IMAGE)'

        content = (
            <div className='blog-content__container'>
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
                                { user.firstName && user.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.username
                                }
                                { width <= DIMENSIONS.WIDTH.S
                                        ? <p className="author-followers">{followerCnt} Followers</p>
                                        : undefined
                                }
                            </h1>
                        </div>
                    </div>
                    { width <= DIMENSIONS.WIDTH.M
                            ? <button className="follow-button author-page-button">Follow</button>
                            : undefined
                    }
                </div>
                {postsContent}
            </div>
        )
    }

    return content
}

export default User