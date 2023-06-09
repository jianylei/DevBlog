import { useDeletePostMutation } from '../../postsApiSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DeleteButton = ({ id }) => {
    const navigate = useNavigate();

    const [deletePost, { isSuccess, isError, error }] = useDeletePostMutation();

    useEffect(() => {
        if (isSuccess) navigate('/', { replace: true });
    }, [isSuccess, navigate]);

    if (isError) {
        console.log(error);
    }

    const clickHandle = () => {
        deletePost({ id });
    };

    return (
        <button className="login__button" onClick={clickHandle}>
            Delete
        </button>
    );
};

export default DeleteButton;
