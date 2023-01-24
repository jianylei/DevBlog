import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useGetUsersQuery } from "../../users/usersApiSlice"
import { useGetPostsQuery } from "../postsApiSlice"
import { TABS } from "../../../constants/constants"
import NoMatch from "../../../components/NoMatch"
import { getIdFromPathStr, getPathStrFromStr } from "../../../utils/utils"
import PostHeader from "./post/PostHeader"
import PostTitle from "./post/PostTitle"
import PostContent from "./post/PostContent"
import PostTags from "./post/PostTags"


const Post = () => {
    const { title } = useParams();
    const id = getIdFromPathStr(title)

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[id]
        })
    })

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[post?.user]
        })
    })

    if (!post || ('/'+getPathStrFromStr(post.title, post.id) !== pathname)) {
        return <NoMatch tab={ TABS.Post }/>
    }
  
    return (
        <div className='blog-content__container'>
            <PostHeader user={user} post={post} />
            <PostTitle post={post} />
            <PostContent post={post} />
            <PostTags post={post} />
        </div>
    )
}

export default Post