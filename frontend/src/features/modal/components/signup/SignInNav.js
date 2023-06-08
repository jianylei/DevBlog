import { useDispatch } from "react-redux"
import { setType } from "../../../modal/modalSlice"
import { MODAL } from "../../../../constants/constants"

const SignInNav = () => {
    const dispatch = useDispatch()

    return (
        <div className="form-nav-signup">
            Already have an account? 
            <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SIGNIN }))}>&nbsp;Sign in</span>
        </div>
    )
}

export default SignInNav