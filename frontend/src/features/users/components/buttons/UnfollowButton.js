import { useDispatch } from "react-redux"
import useAuth from "../../../../hooks/useAuth"
import { useUnFollowUserMutation } from "../../usersApiSlice"

const UnfollowButton = ({ username }) => {
    const auth = useAuth()

    const [unFollowUser, {
        isLoading
    }] = useUnFollowUserMutation()

    const clickHandle = () => {
        if (auth.id) {
            unFollowUser({
                id: auth.id,
                username
            })
        }
    }

    return (
        <button
            className="follow-button"
            onClick={clickHandle}
            disabled={isLoading ? true : false}
        >
            Unfollow
        </button>
    )
}

export default UnfollowButton