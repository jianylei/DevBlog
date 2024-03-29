import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, selectCurrentType, selectCurrentOpen } from '../modalSlice';
import { MODAL } from '../../../constants/constants';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';
import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import ConfirmSignUp from './signup/ConfirmSignUp';
import EditProfile from './editProfile/EditProfile';

const Modal = () => {
    const wrapperRef = useRef(null);

    const dispatch = useDispatch();

    const currType = useSelector(selectCurrentType);
    const currOpen = useSelector(selectCurrentOpen);

    useEffect(() => {
        if (currOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => (document.body.style.overflow = 'unset');
    }, [currOpen]);

    const handleClick = () => dispatch(setOpen({ open: false }));

    useOutsideAlerter(wrapperRef, handleClick);

    let content;

    if (currType === MODAL.TYPE.SIGNIN) {
        content = <SignIn />;
    } else if (currType === MODAL.TYPE.SIGNUP) {
        content = <SignUp />;
    } else if (currType === MODAL.TYPE.CONFIRM) {
        content = <ConfirmSignUp />;
    } else if (currType === MODAL.TYPE.UPDATE_PROFILE) {
        content = <EditProfile />;
    }

    return (
        <div className={`modal__container ${currOpen ? 'modal-open' : ''}`}>
            <section ref={wrapperRef} className="modal">
                <button className="modal-close" onClick={() => dispatch(setOpen({ open: false }))}>
                    x
                </button>
                {content}
            </section>
        </div>
    );
};

export default Modal;
