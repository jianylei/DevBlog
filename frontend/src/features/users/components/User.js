import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../usersApiSlice';
import NoMatch from '../../../components/NoMatch';
import { useGetPostsQuery } from '../../posts/postsApiSlice';
import { TABS } from '../../../constants/constants';
import PostItem from '../../posts/components/postItem/PostItem';
import UserHeader from './user/UserHeader';
import Loading from '../../../components/Loading';

const User = () => {
    const { username } = useParams();

    const { data: posts, isSuccess, isLoading } = useGetPostsQuery('postsList');

    const {
        data: users,
        isSuccess: usersIsSuceeded,
        isLoading: usersIsLoading
    } = useGetUsersQuery('usersList');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let content;

    if (isLoading || usersIsLoading) content = <Loading />;

    if (isSuccess && usersIsSuceeded) {
        const { ids, entities } = posts;
        const { ids: usersIds, entities: usersEntities } = users;

        const userId = usersIds.find((id) => usersEntities[id]?.username === username);
        const user = usersEntities[userId];
        if (user) {
            const filteredIds = ids.filter((postId) => entities[postId].user === userId);

            const postsList =
                ids?.length &&
                filteredIds.map((postId) => <PostItem key={postId} postId={postId} />);

            const postsContent = postsList.length ? postsList : <p>No posts available</p>;

            content = (
                <div className="blog-content__container">
                    <UserHeader user={user} />
                    {postsContent}
                </div>
            );
        } else content = <NoMatch tab={TABS.POST} />;
    }

    return content;
};

export default User;
