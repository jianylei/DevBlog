import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DELETED } from '../../../constants/constants';
import { useGetPostsQuery } from '../../../features/posts/postsApiSlice';
import { useGetUsersQuery } from '../../../features/users/usersApiSlice';
import { shuffleArray } from '../../../utils/utils';
import AuthorItem from './AuthorItem';

const SuggestedAuthors = () => {
    const [firstThree, setFirstThree] = useState([]);
    const [firstRender, setFirstRender] = useState(true);

    const { data: posts, isSuccess, isError } = useGetPostsQuery('postsList');

    const {
        data: users,
        isSuccess: isUsersSuccess,
        isError: isUsersError
    } = useGetUsersQuery('usersList');

    const navigate = useNavigate();

    let content;

    if (isError || isUsersError) content = undefined;

    if (isSuccess && isUsersSuccess) {
        const { ids, entities } = posts;
        const { entities: usersEntities } = users;

        const idArr = [];

        if (firstRender) {
            ids?.length &&
                ids.forEach((id) => {
                    const userId = entities[id].user;
                    if (!idArr.includes(userId) && entities[id].author !== DELETED)
                        idArr.push(userId);
                });

            setFirstThree(shuffleArray(idArr).slice(0, 3));
            setFirstRender(false);
        }

        const authorsList = firstThree.map((id) => (
            <AuthorItem key={id} author={usersEntities[id]} />
        ));

        content = (
            <div className="side-section">
                <h3 className="side-title">Who to follow</h3>
                <div className="side-post-items">{authorsList}</div>
                <div>
                    <button className="side-full-list-button" onClick={() => navigate('/authors')}>
                        See more suggestions
                    </button>
                </div>
            </div>
        );
    }

    return content;
};

export default SuggestedAuthors;
