import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentEmail, selectCurrentOpen, setType } from "../../../modal/modalSlice"
import { useResendConfirmationEmailMutation } from "../../../auth/authApiSlice"
import { MODAL } from "../../../../constants/constants"

const ConfirmSignUp = () => {
    const openModal = useSelector(selectCurrentOpen)

    const email = useSelector(selectCurrentEmail)

    const [resendConfirmationEmail, {
        isError,
        error
    }] = useResendConfirmationEmailMutation()

    const dispatch = useDispatch()

    //useEffect(() => () => setEmail(''), [])

    const resendHandler = async () => {
        console.log(email)
        await resendConfirmationEmail(email)
    }

    const errClass = isError ? 'errmsg' : 'offscreen' 

    return (
        <div className="modal-content__container">
            {email}
            <button onClick={() => console.log(email)}>adasd</button>
            <p className={errClass}>{error?.data?.message}</p>
            <h2 className="modal-title">Verify your email address.</h2>
            <p>
                We've emailed you a confirmation link, this can take up
                to 3-5 minutes. Once you confirm your email 
                you can continue setting up your profile.
            </p>
            <div className="form-nav-signup">
                Email confirmed? 
                <span onClick={() => dispatch(setType({ type: MODAL.TYPE.SIGNIN }))}>&nbsp;Sign in</span>
            </div>
            <div className="form-nav-reset">
                {/* palceholder onClick() */}
                <span onClick={resendHandler}>
                    Resend confirmation email
                </span>
            </div>
        </div>
    )
}

export default ConfirmSignUp