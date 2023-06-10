import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import { useGetPostsQuery, useUpdateViewCountMutation } from '../postsApiSlice';
import { ROLES } from '../../../constants/constants';
import NoMatch from '../../../components/NoMatch';
import { getIdFromPathStr, getPathStrFromStr } from '../../../utils/utils';
import PostHeader from './post/PostHeader';
import PostTitle from './post/PostTitle';
import PostContent from './post/PostContent';
import PostTags from './post/PostTags';
import EditButton from './buttons/EditButton';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';

const Post = () => {
    const { title } = useParams();
    const id = getIdFromPathStr(title);
    const rendered = useRef(false);

    const { pathname } = useLocation();

    const auth = useAuth();

    const { post, isLoading, isSuccess } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            post: data?.entities[id],
            isLoading,
            isSuccess
        })
    });

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[post?.user]
        })
    });

    const [updateViewCount] = useUpdateViewCountMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (
            isSuccess &&
            post &&
            '/' + getPathStrFromStr(post.title, post.id) === pathname &&
            !rendered.current
        ) {
            rendered.current = true;
            updateViewCount({ id });
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    let content;

    if (isLoading) content = <Loading />;

    if (isSuccess && post && user && '/' + getPathStrFromStr(post.title, post.id) === pathname) {
        content = (
            <div className="blog-content__container">
                <PostHeader user={user} post={post} />
                {ROLES.AUTH.includes(auth.role) || auth.id === post.user ? (
                    <EditButton post={post} />
                ) : undefined}
                <PostTitle post={post} />
                <PostContent post={post} />
                <PostTags post={post} />
            </div>
        );
    } else if (isSuccess && post && user) content = <NoMatch />;
    else content = <Loading />;

    return content;
};

export default Post;
