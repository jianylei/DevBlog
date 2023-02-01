import PostItem from './postItem/PostItem'
import { useGetPostsQuery } from '../postsApiSlice'
import useAuth from '../../../hooks/useAuth'

const FollowingPostList = () => {
    const auth = useAuth()

    const {
        data: posts,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = posts

        const filteredIds = ids.filter(postId => entities[postId].follower?.includes(auth.id))

        const postsContent = ids?.length
            && filteredIds.map(postId => <PostItem key={postId} postId={postId} />)

        content = (
            <div className='blog-content__container'>
                {postsContent}
            </div>
        )
    }

    return content
}

export default FollowingPostList