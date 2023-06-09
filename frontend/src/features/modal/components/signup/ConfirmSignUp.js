import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUsername, setType } from '../../../modal/modalSlice';
import { useResendConfirmationEmailMutation } from '../../../auth/authApiSlice';
import { MODAL } from '../../../../constants/constants';

const ConfirmSignUp = () => {
    const username = useSelector(selectCurrentUsername);

    const [resendConfirmationEmail, { isError, error }] = useResendConfirmationEmailMutation();

    const dispatch = useDispatch();

    const resendHandler = async () => {
        await resendConfirmationEmail(username);
    };

    const errClass = isError ? 'errmsg' : 'offscreen';

    return (
        <div className="modal-content__container">
            <p className={errClass}>{error?.data?.message}</p>
            <h2 className="modal-title">Verify your email address.</h2>
            <p>
                We&apos;ve emailed you a confirmation link, this can take up to 3-5 minutes. Once
                you confirm your email you can continue setting up your profile.
            </p>
            <div className="form-nav-signup">
                Email confirmed?
                <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SIGNIN }))}>
                    &nbsp;Sign in
                </span>
            </div>
            <div className="form-nav-reset">
                <span onClick={resendHandler}>Resend confirmation email</span>
            </div>
        </div>
    );
};

export default ConfirmSignUp;
