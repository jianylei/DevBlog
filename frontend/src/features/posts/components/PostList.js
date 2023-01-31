import PostItem from './postItem/PostItem'
import { useGetPostsQuery } from '../postsApiSlice'

const PostList = () => {
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
        const { ids } = posts

        //const filteredIds = ids.filter(postId => entities[postId].status === STATUS.Approved)

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

export default PostList