import { useLocation } from 'react-router-dom';
import { getTimeSince } from '../../../../utils/utils';
import { DELETED, REGEX } from '../../../../constants/constants';

const PostItemHeader = ({ post, navHandlerPost, navHandlerAuthor }) => {
    const { pathname } = useLocation();

    const authorRoute = REGEX.ROUTES.AUTHOR.test(pathname);

    const time = getTimeSince(new Date(post.createdAt));
    const active = !(post.author === DELETED);

    return (
        <div className="post-card__header">
            {!authorRoute ? (
                <div
                    className={`post-card-author ${!active ? 'deleted' : ''}`}
                    onClick={!active ? undefined : navHandlerAuthor}
                >
                    {post.author}&nbsp;
                </div>
            ) : undefined}

            <p className="post-card-date" onClick={navHandlerPost}>
                {!authorRoute ? '• ' : ''}
                {time}
            </p>
        </div>
    );
};

export default PostItemHeader;
