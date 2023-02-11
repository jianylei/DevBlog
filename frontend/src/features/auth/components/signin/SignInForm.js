import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../authSlice"
import { selectCurrentOpen, setOpen } from "../../../modal/modalSlice"

const SignInForm = ({ setErrMsg, login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const openModal = useSelector(selectCurrentOpen)

    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [username, password, setErrMsg])

    useEffect(() => {
        if (!openModal) {
            setUsername('')
            setPassword('')
            setErrMsg('')
        }
    }, [openModal, setErrMsg])

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
            else if (err.status === 401) {
                if (err.data?.username) {
console.log('asdasda')
                } else {
                    setErrMsg(err.data?.message || 'Unauthorized')
                }
                
            }
            else setErrMsg(err.data?.message)
        }
    }

    return (
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
    )
}

export default SignInForm