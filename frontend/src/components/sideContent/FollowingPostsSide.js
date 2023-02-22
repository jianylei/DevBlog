import SuggestedAuthors from './author/SuggestedAuthors'
import NewPostsSide from './post/NewPostsSide'
import TrendingPostsSide from './post/TrendingPostsSide'
import SuggestedTags from './tag/SuggestedTags'

const FollowingPostsSide = () => {
    return (
        <div className='side-section__container'>
            <NewPostsSide />
            <TrendingPostsSide />
            <SuggestedTags />
            <SuggestedAuthors />
        </div>
    )
}

export default FollowingPostsSide