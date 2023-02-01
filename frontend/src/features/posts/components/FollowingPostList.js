import PostItem from './postItem/PostItem'
import { useGetFollowingPostsQuery } from '../postsApiSlice'

const FollowingPostList = () => {
    const {
        data: posts,
        isSuccess,
        isError,
        error
    } = useGetFollowingPostsQuery('postsList', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = posts

        const postsContent = ids?.length
            && ids.map(postId => <PostItem key={postId} postId={postId} />)

        content = (
            <div className='blog-content__container'>
                {postsContent}
            </div>
        )
    }

    return content
}

export default FollowingPostList