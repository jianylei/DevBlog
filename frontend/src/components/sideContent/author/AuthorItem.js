import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorItem = ({ author }) => {
    const navigate = useNavigate();

    const navHandler = () => navigate(`/authors/${author.username}`);

    const profileImg = author?.image ? `url(${author?.image})` : 'var(--NO-IMAGE)';

    return (
        <div className="side-author-item">
            <div className="side-author-item-left">
                <div
                    className={`image side-image-author ${author?.image ? 'img-overlay' : ''}`}
                    style={{ backgroundImage: profileImg }}
                    onClick={navHandler}
                />
            </div>
            <div className="side-author-item-right">
                <h4 className="side-author-item-username" onClick={navHandler}>
                    {author?.username}
                </h4>
                <p className="side-author-item-about" onClick={navHandler}>
                    {author?.about}
                </p>
            </div>
        </div>
    );
};

const memoizedAuthorItem = memo(AuthorItem);

export default memoizedAuthorItem;
