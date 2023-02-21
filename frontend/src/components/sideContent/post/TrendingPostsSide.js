import { useNavigate } from 'react-router-dom'
import { useGetPostsQuery } from '../../../features/posts/postsApiSlice'
import PostItem from './PostItem'

const TrendingPostsSide = () => {
    const {
        data: posts,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList')

    const navigate = useNavigate()

    let content

    if (isError) content = <div></div>

    if(isSuccess) {
        const { ids, entities } = posts

        const t = [...ids]
        const filteredIds = t.sort((a, b) => entities[b].views - entities[a].views)

        const postsContent = ids?.length
        && filteredIds.map(postId => <PostItem key={postId} post={entities[postId]} />)

        const slicedContent = postsContent.slice(0, 3)
        
        content = (
            <div className='side-section'>
                <h3 className='side-title'>What's trending</h3>
                <div className='side-post-items'>
                    {slicedContent}
                </div>
                <div>
                    <button
                        className='side-full-list-button'
                        onClick={() => navigate('/trending')}
                    >
                        See the full list
                    </button>
                </div>
            </div>
        )
    }

    return content
}

export default TrendingPostsSide