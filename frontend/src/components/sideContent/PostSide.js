import { useParams } from 'react-router-dom';
import { getIdFromPathStr } from '../../utils/utils';
import { useGetPostsQuery } from '../../features/posts/postsApiSlice';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
import Profile from './profile/Profile';
import { DELETED } from '../../constants/constants';

const PostSide = () => {
    const { title } = useParams();
    const id = getIdFromPathStr(title);

    const { post, isSuccess, isError } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data, isLoading, isSuccess, isError }) => ({
            post: data?.entities[id],
            isLoading,
            isSuccess,
            isError
        })
    });

    const { user, isSuccess: isUserSucess } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data, isSuccess }) => ({
            user: data?.entities[post?.user],
            isSuccess
        })
    });

    let content;

    if (isError) content = undefined;

    if (isSuccess && isUserSucess) {
        const active = !(post?.author === DELETED);
        content = active && user ? <Profile user={user} /> : undefined;
    }

    return content;
};

export default PostSide;
