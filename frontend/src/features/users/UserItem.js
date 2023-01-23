import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { setOpen, setType } from '../modal/modalSlice'
import useAuth from '../../hooks/useAuth'
import { MODAL } from '../../constants/constants'

const UserItem = ({ userId }) => {
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const { role } = useAuth()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    if (user) {
        const clickHandler = () => navigate(`/authors/${user.username}`)

        const followHandler = () => {
            if (role) {
    
            } else {
                dispatch(setType({ type: MODAL.TYPE.SignUp }))
                dispatch(setOpen({ open: true }))
            }
        }

        const profileImg = user.image 
        ? `url(${user.image})`
        : 'var(--NO-IMAGE)'

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
                <button className='follow-button' onClick={followHandler}>Follow</button>
            </div>
        )

    } else return null
}

const memoizedUserItem = memo(UserItem)

export default memoizedUserItem