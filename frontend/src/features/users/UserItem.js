import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from '../users/usersApiSlice'

const UserItem = ({ userId }) => {
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate()

    if (user) {
        const clickHandler = () => navigate(`/authors/${user.username}`,{state: {id: userId}})

        return (
            <div className='card__container-author' onClick={clickHandler}>
                { user.image
                    ? <img src={user.image} />
                    : <div className="card__container-author-noimage" />
                }
                <div className='card-author-userdata'>
                    <h3 className='card-author-username'>@{user.username}</h3>
                    <p className='card-author-name'>{user.firstName+' '+user.lastName}</p>
                </div>
            </div>
        )

    } else return null
}

const memoizedUserItem = memo(UserItem)

export default memoizedUserItem