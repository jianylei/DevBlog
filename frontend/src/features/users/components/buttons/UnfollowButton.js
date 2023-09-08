import useAuth from '../../../../hooks/useAuth';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { useUnFollowUserMutation } from '../../usersApiSlice';
import { REGEX, DIMENSIONS } from '../../../../constants/constants';
import { useLocation } from 'react-router-dom';

const UnfollowButton = ({ username, side }) => {
    const auth = useAuth();

    const { width } = useWindowDimensions();

    const { pathname } = useLocation();

    const [unFollowUser, { isLoading }] = useUnFollowUserMutation();

    const clickHandle = () => {
        if (auth.id) {
            unFollowUser({
                id: auth.id,
                username
            });
        }
    };

    const buttonClass = () => {
        if (side) return 'author-follow';
        if (REGEX.ROUTES.AUTHORS.test(pathname)) return '';
        else if (REGEX.ROUTES.AUTHOR.test(pathname)) {
            if (width <= DIMENSIONS.WIDTH.S) {
                return 'author-follow';
            }
            return 'author-follow mt-7';
        } else return 'post-follow';
    };

    return (
        <button
            className={`follow-button unfollow-button ${buttonClass()}`}
            onClick={clickHandle}
            disabled={isLoading ? true : false}
        >
            Following
        </button>
    );
};

export default UnfollowButton;
