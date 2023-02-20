import SuggestedAuthors from './author/SuggestedAuthors'
import TrendingPostsSide from './post/TrendingPostsSide'
import SuggestedTags from './tag/SuggestedTags'

const PostsSide = () => {
    return (
        <div className='side-section__container'>
            <TrendingPostsSide />
            <SuggestedTags />
            <SuggestedAuthors />
        </div>
    )
}

export default PostsSide