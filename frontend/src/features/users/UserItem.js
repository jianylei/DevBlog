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

    const profileImg = user.image 
        ? `url(${user.image})`
        : 'var(--NO-IMAGE)'

    if (user) {
        const clickHandler = () => navigate(`/authors/${user.username}`)

        return (
            <div className='author-card__container'>
                <div
                    className={`image author-card-image ${user.image ? 'img-overlay' : ''}`}
                    style={{backgroundImage: profileImg}}
                    onClick={clickHandler}
                />
                <div className='author-card-details__container' onClick={clickHandler}>
                    <h3 className='author-card-username'>{user.username}</h3>
                    <p className='author-card-about'>{user.about}</p>
                </div>
                <button className='follow-button'>Follow</button>
            </div>
        )

    } else return null
}

const memoizedUserItem = memo(UserItem)

export default memoizedUserItem