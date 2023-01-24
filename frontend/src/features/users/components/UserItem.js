import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetUsersQuery } from '../usersApiSlice'
import { setOpen, setType } from '../../modal/modalSlice'
import useAuth from '../../../hooks/useAuth'
import { MODAL } from '../../../constants/constants'
import UserItemImage from './userItem/UserItemImage'
import UserItemMain from './userItem/UserItemMain'

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
        const navHandler = () => navigate(`/authors/${user.username}`)

        const followHandler = () => {
            if (role) {
    
            } else {
                dispatch(setType({ type: MODAL.TYPE.SignUp }))
                dispatch(setOpen({ open: true }))
            }
        }

        return (
            <div className='author-card__container'>
                <UserItemImage user={user} navHandler={navHandler} />
                <UserItemMain user={user} navHandler={navHandler} />
                <button className='follow-button' onClick={followHandler}>Follow</button>
            </div>
        )
    } else return undefined
}

const memoizedUserItem = memo(UserItem)

export default memoizedUserItem