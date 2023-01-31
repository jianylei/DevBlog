import { useDispatch } from "react-redux"
import useAuth from "../../../../hooks/useAuth"
import { useFollowUserMutation } from "../../usersApiSlice"
import { setType, setOpen } from "../../../modal/modalSlice"
import { MODAL, REGEX } from "../../../../constants/constants"
import { useLocation } from "react-router-dom"

const FollowButton = ({ username }) => {
    const auth = useAuth()

    const dispatch = useDispatch()

    const { pathname } = useLocation()

    const [followUser, {
        isLoading
    }] = useFollowUserMutation()

    const clickHandle = () => {
        buttonClass()
        if (auth.id) {
            followUser({
                id: auth.id,
                username
            })
        } else {
            dispatch(setType({ type: MODAL.TYPE.SIGNUP }))
            dispatch(setOpen({ open: true }))
        }
    }

    const buttonClass = () => {
        if (REGEX.ROUTES.AUTHORS.test(pathname)) console.log('authors')
        if (REGEX.ROUTES.AUTHOR.test(pathname)) console.log('author')
        if (REGEX.ROUTES.POSTS.test(pathname)) console.log('posts')
    }

    return (
        <button
            className="follow-button"
            onClick={clickHandle}
            disabled={isLoading ? true : false}
        >
            Follow
        </button>
    )
}

export default FollowButton