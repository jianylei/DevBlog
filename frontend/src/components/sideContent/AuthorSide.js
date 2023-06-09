import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
import Profile from './profile/Profile';

const AuthorSide = () => {
    const { username } = useParams();

    const { data: users, isSuccess, isError } = useGetUsersQuery('usersList');

    let content;

    if (isError) content = undefined;

    if (isSuccess) {
        const { ids, entities } = users;

        const userId = ids?.length && ids.find((id) => entities[id]?.username === username);

        content = <Profile user={entities[userId]} />;
    }

    return content;
};

export default AuthorSide;
