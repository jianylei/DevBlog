import { useDispatch } from 'react-redux';
import { setOpen, setType } from '../modalSlice';
import { MODAL } from '../../../constants/constants';

const EditProfileButton = ({ header }) => {
    const dispatch = useDispatch();

    const clickHandle = () => {
        dispatch(setType({ type: MODAL.TYPE.UPDATE_PROFILE }));
        dispatch(setOpen({ open: true }));
    };

    return (
        <button
            className={header ? 'login__button' : 'side-full-list-button'}
            onClick={() => clickHandle()}
        >
            Edit profile
        </button>
    );
};

export default EditProfileButton;
