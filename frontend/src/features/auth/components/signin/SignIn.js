import { useState } from "react"
import { useLoginMutation } from "../../authApiSlice"
import SignInForm from "./SignInForm"
import SignUpNav from "./SignUpNav"
import ResetPasswordNav from "./ResetPasswordNav"

const SignIn = () => {
    const [errMsg, setErrMsg] = useState('')

    const [login, { isLoading }] = useLoginMutation()

    const errClass = errMsg ? 'errmsg' : 'offscreen'

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="modal-content__container">
            <p className={errClass} aria-live="assertive">{errMsg}</p>
            <h2 className="modal-title">Welcome back.</h2>
            <SignInForm setErrMsg={setErrMsg} login={login} />
            <SignUpNav />
            <ResetPasswordNav />
        </div>
    )
}

export default SignIn