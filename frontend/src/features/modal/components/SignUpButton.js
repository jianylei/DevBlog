import { useDispatch } from "react-redux"
import { setOpen, setType } from "../modalSlice"
import { MODAL } from '../../../constants/constants'

const SignUpButton = () => {
    const dispatch = useDispatch()

    const clickHandle = () => {
        dispatch(setType({ type: MODAL.TYPE.SignUp }))
        dispatch(setOpen({ open: true }))
    }

    return (
        <button className="login__button" onClick={() => clickHandle()}>
            Sign Up
        </button>
    )
}

export default SignUpButton