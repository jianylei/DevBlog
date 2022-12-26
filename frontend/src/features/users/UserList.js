import { PulseLoader } from 'react-spinners'
import UserItem from './UserItem'
import { useGetUsersQuery } from "./usersApiSlice"

const UserList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content 

    if (isLoading) content = <PulseLoader color={'#FFF'} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const usersContent = ids?.length
            && ids.map(userId => <UserItem key={userId} userId={userId} />)

        content = (
            <div className='content__container'>
                <div className="card-grid__container">{usersContent}</div>
            </div>
        )
    }
    return content
}

export default UserList