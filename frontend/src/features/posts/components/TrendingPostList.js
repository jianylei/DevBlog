import { useEffect } from 'react';
import PostItem from './postItem/PostItem';
import { useGetPostsQuery } from '../postsApiSlice';
import Loading from '../../../components/Loading';

const TrendingPostList = () => {
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
        const { ids, entities } = posts;
        const t = [...ids];
        const sorted = t?.sort((a, b) => entities[b].views - entities[a].views);

        const postsContent =
            ids?.length && sorted.map((postId) => <PostItem key={postId} postId={postId} />);

        content = <div className="blog-content__container">{postsContent}</div>;
    }

    return content;
};

export default TrendingPostList;
