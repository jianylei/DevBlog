import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import UserItemImage from './userItem/UserItemImage';
import UserItemMain from './userItem/UserItemMain';
import FollowButton from './buttons/FollowButton';
import UnfollowButton from './buttons/UnfollowButton';

const UserItem = ({ userId }) => {
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    });

    const auth = useAuth();

    const navigate = useNavigate();

    if (user) {
        const navHandler = () => navigate(`/authors/${user.username}`);

        const followButton = () => {
            if (user.id === auth.id) return undefined;
            if (user.followers?.includes(auth.id)) {
                return <UnfollowButton username={user.username} />;
            }
            return <FollowButton username={user.username} />;
        };

        return (
            <div className="author-card__container">
                <div className="author-card-content__container">
                    <UserItemImage user={user} navHandler={navHandler} />
                    <UserItemMain user={user} navHandler={navHandler} />
                </div>
                {followButton()}
            </div>
        );
    } else return undefined;
};

const memoizedUserItem = memo(UserItem);

export default memoizedUserItem;

//<button className='follow-button' onClick={followHandler}>Follow</button>
