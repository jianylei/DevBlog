import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const PostItemFooter = ({ post, navHandlerPost }) => {
    return (
        <div className="post-card__footer">
            {post.tags?.length ? <div className="post-card-topic">{post.tags[0]}</div> : ''}
            <p onClick={navHandlerPost}>
                {post.readTime} min read&nbsp;•&nbsp;{post.views} <FontAwesomeIcon icon={faEye} />
            </p>
        </div>
    );
};

export default PostItemFooter;
