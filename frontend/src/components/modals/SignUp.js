import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../../features/users/usersApiSlice"
import { MODAL } from "../../constants/constants"
import { useNavigate } from "react-router-dom"

const SignUp = ({ modalState, setType }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [openModal, setOpenModal] = modalState

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    useEffect(() => {
        setErrMsg('')
    }, [email, username, password, confirmPwd])

    useEffect(() => {
        if (!openModal) {
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPwd('')
            setErrMsg('')
        }
    }, [openModal])

    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPwd('')
            setErrMsg('')
        }
    }, [isSuccess, navigate])

    const canSave = [email, username, password].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPwd) setErrMsg('Passwords do not match')
        else if(canSave) {
            await addNewUser({ email, username, password })
        }
    }

    const errClass = isError || errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="modal-content__container">
            <p className={`modal-error ${errClass}`} aria-live="assertive">{error?.data?.message || errMsg}</p>
            <h2 className="modal-title">Join KeebBlog.</h2>
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
            <div className="form-nav-signup">
                Already have an account? 
                <span onClick={() => setType(MODAL.TYPE.SignIn)}>&nbsp;Sign in</span>
            </div>
        </div>
    )
}

export default SignUp