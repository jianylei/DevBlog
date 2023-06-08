import { useDispatch } from "react-redux"
import { setType } from "../../modalSlice"
import { MODAL } from "../../../../constants/constants"

const SignUpNav = () => {
    const dispatch = useDispatch()

    return (
        <div className="form-nav-signup">
            No account? 
            <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SIGNUP }))}>&nbsp;Create one</span>
        </div>
    )
}

export default SignUpNav