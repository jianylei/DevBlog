import { useState } from 'react';
import { useAddNewUserMutation } from '../../../users/usersApiSlice';
import SignUpForm from './SignUpForm';
import SignInNav from './SignInNav';

const SignUp = () => {
    const [errMsg, setErrMsg] = useState('');

    const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();

    const errClass = isError || errMsg ? 'errmsg' : 'offscreen';

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="modal-content__container">
            <p className={errClass} aria-live="assertive">
                {error?.data?.message || errMsg}
            </p>
            <h2 className="modal-title">Join KeebBlog.</h2>
            <SignUpForm
                setErr={setErrMsg}
                addNewUserMutation={[
                    addNewUser,
                    {
                        isLoading,
                        isSuccess
                    }
                ]}
            />
            <SignInNav />
        </div>
    );
};

export default SignUp;
