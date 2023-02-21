import SuggestedAuthors from './author/SuggestedAuthors'
import NewPostsSide from './post/NewPostsSide'
import TrendingPostsSide from './post/TrendingPostsSide'
import SuggestedTags from './tag/SuggestedTags'

const TrendingSide = () => {
    return (
        <div className='side-section__container'>
            <NewPostsSide />
            <SuggestedTags />
            <SuggestedAuthors />
        </div>
    )
}

export default TrendingSide