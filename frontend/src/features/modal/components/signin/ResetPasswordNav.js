import { useDispatch } from "react-redux"
import { setType } from "../../modalSlice"
import { MODAL } from "../../../../constants/constants"

const ResetPasswordNav = () => {
    const dispatch = useDispatch()

    return (
        <div className="form-nav-reset">
            Forgot password?&nbsp;
            {/* palceholder onClick() */}
            <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SIGNUP }))}>Get help.</span>
        </div>
    )
}

export default ResetPasswordNav