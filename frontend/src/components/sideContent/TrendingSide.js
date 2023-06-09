import SuggestedAuthors from './author/SuggestedAuthors';
import NewPostsSide from './post/NewPostsSide';

const TrendingSide = () => {
    return (
        <div className="side-section__container">
            <NewPostsSide />
            <SuggestedAuthors />
        </div>
    );
};

export default TrendingSide;
