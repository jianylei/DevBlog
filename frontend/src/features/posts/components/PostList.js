import { useEffect } from 'react';
import PostItem from './postItem/PostItem';
import { useGetPostsQuery } from '../postsApiSlice';
import Loading from '../../../components/Loading';

const PostList = () => {
    const {
        data: posts,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetPostsQuery('postsList', {
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

        //const filteredIds = ids.filter(postId => entities[postId].status === STATUS.Approved)

        const postsContent =
            ids?.length && ids.map((postId) => <PostItem key={postId} postId={postId} />);

        if (!postsContent.length) content = <p className="errmsg">No posts found.</p>;

        content = <div className="blog-content__container">{postsContent}</div>;
    }

    return content;
};

export default PostList;
