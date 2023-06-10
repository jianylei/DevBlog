import { getFollowersString } from '../../../utils/utils';
import FollowButton from '../../../features/users/components/buttons/FollowButton';
import UnfollowButton from '../../../features/users/components/buttons/UnfollowButton';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EditProfileButton from '../../../features/modal/components/EditProfileButton';

const Profile = ({ user }) => {
    const auth = useAuth();

    const navigate = useNavigate();

    const followButton = () => {
        if (user?.id === auth.id)
            return (
                <div>
                    <EditProfileButton />
                </div>
            );
        if (user?.followers?.includes(auth.id)) {
            return <UnfollowButton username={user?.username} side={true} />;
        }
        return <FollowButton username={user?.username} side={true} />;
    };

    const navHandler = () => navigate(`/authors/${user?.username}`);

    const profileImg = user?.image ? `url(${user?.image})` : 'var(--NO-IMAGE)';

    return (
        <div className="side-profile">
            <div
                className={`image side-image-profile ${user?.image ? 'img-overlay' : ''}`}
                style={{ backgroundImage: profileImg }}
                onClick={navHandler}
            />
            <h3 className="side-profile-name" onClick={navHandler}>
                {user?.firstName && user?.lastName
                    ? `${user?.firstName} ${user?.lastName}`
                    : user?.username}
            </h3>
            <h3 className="side-profile-followers">
                {getFollowersString(user?.followers?.length)}
            </h3>
            <p className="side-profile-about">{user?.about}</p>
            <div className="side-profile-bottom">{followButton()}</div>
        </div>
    );
};

export default Profile;
