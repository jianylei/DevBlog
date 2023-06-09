import { useEffect } from 'react';
import UserItem from './UserItem';
import { useGetUsersQuery } from '../usersApiSlice';
import Loading from '../../../components/Loading';

const UserList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let content;

    if (isLoading) content = <Loading />;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message || '503 - Service Unavailable'}</p>;
    }

    if (isSuccess) {
        const { ids } = users;

        const usersContent =
            ids?.length && ids.map((userId) => <UserItem key={userId} userId={userId} />);

        content = <div className="blog-content__container">{usersContent}</div>;
    }
    return content;
};

export default UserList;
