import { PulseLoader } from 'react-spinners'
import Post from './Post'
import { useGetPostsQuery } from './postsApiSlice'
import { STATUS } from '../../config/constants'

const PostList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList', {
        pollingInterval: 60000 * 30, // 30 minutes
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={'#FFF'} />

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = posts

        const filteredIds = ids.filter(postId => entities[postId].status === STATUS.Approved)

        const postsContent = ids?.length
            && filteredIds.map(postId => <Post key={postId} postId={postId} />)

        content = (
            <div className='content__container'>
                <div className="card-grid__container">{postsContent}</div>
            </div>
        )
    }

    return content
}

export default PostList