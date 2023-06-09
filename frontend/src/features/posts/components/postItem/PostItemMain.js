import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { DIMENSIONS } from '../../../../constants/constants';

const PostItemMain = ({ post, navHandlerPost }) => {
    const { width } = useWindowDimensions();

    const coverImg = post.cover ? `url(${post.cover})` : 'var(--NO-IMAGE)';

    return (
        <div className="post-card__main">
            <div className="post-card-content__container" onClick={navHandlerPost}>
                <h2 className="post-card-title">{post.title}</h2>
                {width > DIMENSIONS.WIDTH.S ? (
                    <p className="post-card-sub">{post.subHeading}</p>
                ) : (
                    ''
                )}
            </div>
            <div
                className={`image post-card-cover ${post.cover ? 'img-overlay' : ''}`}
                style={{ backgroundImage: coverImg }}
                onClick={navHandlerPost}
            />
        </div>
    );
};

export default PostItemMain;
