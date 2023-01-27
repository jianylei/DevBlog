import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useGetUsersQuery } from "../../users/usersApiSlice"
import { useGetPostsQuery } from "../postsApiSlice"
import { TABS } from "../../../constants/constants"
import NoMatch from "../../../components/NoMatch"
import { getIdFromPathStr, getPathStrFromStr } from "../../../utils/utils"
import PostHeader from "./post/PostHeader"
import PostTitle from "./post/PostTitle"
import PostContent from "./post/PostContent"
import PostTags from "./post/PostTags"
import EditButton from "./buttons/EditButton"
import useRequireAuthUser from "../../../hooks/useRequireAuthUser"


const Post = () => {
    const { title } = useParams();
    const id = getIdFromPathStr(title)

    const { pathname } = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { post, isLoading, isSuccess } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data, isLoading, isSuccess, isError }) => ({
            post: data?.entities[id],
            isLoading,
            isSuccess, 
            isError
        })
    })

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[post?.user]
        })
    })

    let content
    if (!isLoading && (!post || ('/'+getPathStrFromStr(post.title, post.id) !== pathname))) {
        content = <NoMatch tab={ TABS.Post }/>
    }
    
    if (isSuccess && post) {
        content = (
            <div className='blog-content__container'>
                <PostHeader user={user} post={post} />
                <PostTitle post={post} />
                <PostContent post={post} />
                <PostTags post={post} />
            </div>
        )
    }

    return content
}

export default Post