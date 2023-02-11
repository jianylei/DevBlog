import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { 
    selectCurrentOpen,
    setType,
    setEmail as setModalEmail
} from "../../../modal/modalSlice"
import { MODAL } from "../../../../constants/constants"

const SignUpForm = ({ setErr, addNewUserMutation }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')

    const [addNewUser, {
        isLoading,
        isSuccess
    }] = addNewUserMutation

    const openModal = useSelector(selectCurrentOpen)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        setErr('')
    }, [email, username, password, confirmPwd, setErr])

    useEffect(() => {
        if (!openModal) {
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPwd('')
            setErr('')
        }
    }, [openModal, setErr])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setType({ type: MODAL.TYPE.CONFIRM }))
        }
    }, [isSuccess, navigate, dispatch, setErr])

    const canSave = [email, username, password].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPwd) setErr('Passwords do not match')
        else if(canSave) {
            dispatch(setModalEmail({ email }))
            await addNewUser({ email, username, password })
        }
    }

    return (
        <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-form-item__container">
                <label className="modal-form__label" htmlFor="signup-email">
                    Email</label>
                <input
                    className="modal-form__input"
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="modal-form-item__container">
                <label className="modal-form__label" htmlFor="signup-username">
                    Username</label>
                <input
                    className="modal-form__input"
                    id="signup-username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="modal-form-item__container">
                <label className="modal-form__label" htmlFor="signup-password">
                    Password</label>
                <input
                    className="modal-form__input"
                    id="signup-password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="modal-form-item__container">
                <label className="modal-form__label" htmlFor="signup-password">
                    Confirm password</label>
                <input
                    className="modal-form__input"
                    id="signup-confirm"
                    name="confirm"
                    type="password"
                    autoComplete="off"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    required
                />
            </div>
            <button className="modal-button">Sign Up</button>
        </form>
    )
}

export default SignUpForm