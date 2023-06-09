import { useDispatch } from "react-redux"
import { setOpen, setType } from "../modalSlice"
import { MODAL } from '../../../constants/constants'

const EditProfileButton = () => {
    const dispatch = useDispatch()

    const clickHandle = () => {
        dispatch(setType({ type: MODAL.TYPE.UPDATE_PROFILE }))
        dispatch(setOpen({ open: true }))
    }

    return (
        <button className="login__button" onClick={() => clickHandle()}>
            Edit Profile
        </button>
    )
}

export default EditProfileButton