import { useState } from 'react';
import { useUpdateUserMutation } from '../../../users/usersApiSlice';
import EditProfileForm from './EditProfileForm';
import useAuth from '../../../../hooks/useAuth';
import { useGetUsersQuery } from '../../../users/usersApiSlice';

const EditProfile = () => {
    const [errMsg, setErrMsg] = useState('');

    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();

    const { id } = useAuth();

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    });

    const errClass = isError || errMsg ? 'errmsg' : 'offscreen';

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="modal-content__container">
            <p className={errClass} aria-live="assertive">
                {error?.data?.message || errMsg}
            </p>
            <h2 className="modal-title">Edit Profile.</h2>
            <EditProfileForm
                setErr={setErrMsg}
                user={user}
                updateUserMutation={[
                    updateUser,
                    {
                        isLoading,
                        isSuccess
                    }
                ]}
            />
        </div>
    );
};

export default EditProfile;
