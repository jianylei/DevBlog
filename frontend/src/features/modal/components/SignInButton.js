import { useDispatch } from 'react-redux';
import { setOpen, setType } from '../modalSlice';
import { MODAL } from '../../../constants/constants';

const SignInButton = () => {
    const dispatch = useDispatch();

    const clickHandle = () => {
        dispatch(setType({ type: MODAL.TYPE.SIGNIN }));
        dispatch(setOpen({ open: true }));
    };

    return (
        <button className="login__button" onClick={() => clickHandle()}>
            Sign In
        </button>
    );
};

export default SignInButton;
