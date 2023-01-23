import { useDispatch } from "react-redux"
import { setType } from "../../modal/modalSlice"
import { MODAL } from "../../../constants/constants"

const SignUpNav = () => {
    const dispatch = useDispatch()

    return (
        <div className="form-nav-signup">
            No account? 
            <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SignUp }))}>&nbsp;Create one</span>
        </div>
    )
}

export default SignUpNav