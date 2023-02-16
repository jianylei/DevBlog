import React from 'react'
import { useGetPostsQuery } from '../../../features/posts/postsApiSlice'
import PostItem from './PostItem'

const NewPostsSide = () => {
    const {
        data: posts,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList')

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
            <div className='side-section__container'>
                <h3 className='side-title'>Lastest Posts</h3>
                <div className='side-post-items'>
                    {slicedContent}
                </div>
                <div><button className='side-full-list-button'>See the full list</button></div>
                
            </div>
        )
    }

    return content
}

export default NewPostsSide