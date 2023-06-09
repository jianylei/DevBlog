import SuggestedAuthors from './author/SuggestedAuthors';
import TrendingPostsSide from './post/TrendingPostsSide';

const PostsSide = () => {
    return (
        <div className="side-section__container">
            <TrendingPostsSide />
            <SuggestedAuthors />
        </div>
    );
};

export default PostsSide;
