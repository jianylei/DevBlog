import { useNavigate } from 'react-router-dom'
import { useGetPostsQuery } from '../../../features/posts/postsApiSlice'
import PostItem from './PostItem'

const NewPostsSide = () => {
    const {
        data: posts,
        isSuccess,
        isError,
    } = useGetPostsQuery('postsList')

    const navigate = useNavigate()

    let content

    if (isError) content = <div></div>

    if(isSuccess) {
        const { ids, entities } = posts

        const postsContent = ids?.length
            && ids.map(postId => <PostItem key={postId} post={entities[postId]} />)

        const slicedContent = postsContent.slice(0, 3)
        
        content = (
            <div className='side-section'>
                <h3 className='side-title'>Lastest Posts</h3>
                <div className='side-post-items'>
                    {slicedContent}
                </div>
                <div>
                    <button
                        className='side-full-list-button'
                        onClick={() => navigate('/')}
                    >
                        See the full list
                    </button>
                </div>
            </div>
        )
    }

    return content
}

export default NewPostsSide