import { useDispatch } from "react-redux"
import useAuth from "../../../../hooks/useAuth"
import { useFollowUserMutation } from "../../usersApiSlice"
import { setType, setOpen } from "../../../modal/modalSlice"
import { DIMENSIONS, MODAL, REGEX } from "../../../../constants/constants"
import { useLocation } from "react-router-dom"
import useWindowDimensions from "../../../../hooks/useWindowDimensions"

const FollowButton = ({ username }) => {
    const auth = useAuth()

    const { width } = useWindowDimensions()

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
        if (REGEX.ROUTES.AUTHORS.test(pathname)) return ''
        else if (REGEX.ROUTES.AUTHOR.test(pathname)) {
            if (width <= DIMENSIONS.WIDTH.S) {
                return 'author-follow'
            }
            return 'author-follow mt-7'
        }
        else return 'post-follow'
    }

    return (
        <button
            className={`follow-button ${buttonClass()}`}
            onClick={clickHandle}
            disabled={isLoading ? true : false}
        >
            Follow
        </button>
    )
}

export default FollowButton