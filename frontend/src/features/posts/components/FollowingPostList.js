import { useEffect } from 'react';
import PostItem from './postItem/PostItem';
import { useGetFollowingPostsQuery } from '../postsApiSlice';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';

const FollowingPostList = () => {
    const auth = useAuth();

    const {
        data: posts,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetFollowingPostsQuery(auth.id, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let content;

    if (isLoading) {
        content = <Loading />;
    }

    if (isError) {
        content = <p className="errmsg">{error?.data?.message || '503 - Service Unavailable'}</p>;
    }

    if (isSuccess) {
        const { ids } = posts;

        const postsContent =
            ids?.length && ids.map((postId) => <PostItem key={postId} postId={postId} />);

        content = <div className="blog-content__container">{postsContent}</div>;
    }

    return content;
};

export default FollowingPostList;
