import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../../features/auth/authApiSlice"
import { setCredentials } from "../../features/auth/authSlice"
import { selectCurrentOpen, setOpen, setType } from "./modalSlice"
import { MODAL } from "../../constants/constants"

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const openModal = useSelector(selectCurrentOpen)

    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    useEffect(() => {
        if (!openModal) {
            setUsername('')
            setPassword('')
            setErrMsg('')
        }
    }, [openModal])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { accessToken } = await login({username, password}).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            dispatch(setOpen({ open: false }))

        } catch (err) {
            if (!err.status) setErrMsg('No server response')
            else if (err.status === 400) setErrMsg('Missing username or password')
            else if (err.status === 401) setErrMsg(err.data?.message || 'Unauthorized')
            else setErrMsg(err.data?.message)
        }
    }

    const errClass = errMsg ? 'errmsg' : 'offscreen'

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="modal-content__container">
            <p className={`modal-error ${errClass}`} aria-live="assertive">{errMsg}</p>
            <h2 className="modal-title">Welcome back.</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-form-item__container">
                    <label className="modal-form__label" htmlFor="signin-username">
                        Username</label>
                    <input
                        className="modal-form__input"
                        id="signin-username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="modal-form-item__container">
                    <label className="modal-form__label" htmlFor="signin-password">
                        Password</label>
                    <input
                        className="modal-form__input"
                        id="signin-password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="modal-button">Sign In</button>
            </form>
            <div className="form-nav-signup">
                No account? 
                <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SignUp }))}>&nbsp;Create one</span>
            </div>
            <div className="form-nav-reset">
                Forgot password?&nbsp;
                <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SignUp }))}>Get help.</span>
            </div>
        </div>
    )
}

export default SignIn