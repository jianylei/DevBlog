import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../../postsApiSlice';
import { getPathStrFromStr } from '../../../../utils/utils';
import PostItemHeader from './PostItemHeader';
import PostItemMain from './PostItemMain';
import PostItemFooter from './PostItemFooter';

const PostItem = ({ postId }) => {
    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId]
        })
    });

    const navigate = useNavigate();

    if (post) {
        const postUrl = getPathStrFromStr(post.title, post.id);
        const navHandlerPost = () => navigate(`/${postUrl}`);
        const navHandlerAuthor = () => navigate(`/authors/${post.author}`);

        return (
            <div className="post-card__container">
                <PostItemHeader
                    post={post}
                    navHandlerPost={navHandlerPost}
                    navHandlerAuthor={navHandlerAuthor}
                />
                <PostItemMain post={post} navHandlerPost={navHandlerPost} />
                <PostItemFooter post={post} navHandlerPost={navHandlerPost} />
            </div>
        );
    } else return undefined;
};

const memoizedPostItem = memo(PostItem);

export default memoizedPostItem;
