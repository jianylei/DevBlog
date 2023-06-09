import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { 
    selectCurrentOpen,
    setOpen,
    setUsername as setModalUsername
} from "../../modalSlice"
import { MODAL } from "../../../../constants/constants"
import useAuth from "../../../../hooks/useAuth"
import { useGetUsersQuery } from "../../../users/usersApiSlice"

const EditProfileForm = ({ setErr, updateUserMutation, user }) => {
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [about, setAbout] = useState(user.about)
    const [image, setImage] = useState(user.image)
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')

    const [updateUser, {
        isLoading,
        isSuccess
    }] = updateUserMutation

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
        } else {
            setUsername(user.username)
            setEmail(user.email)
            setAbout(user.about)
            setImage(user.image)
        }
    }, [openModal, setErr])

    const canSave = [username].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password && password !== confirmPwd) setErr('Passwords do not match')
        else if(canSave) {
            dispatch(setModalUsername({ username }))
            await updateUser({ 
                id: user._id, 
                username, 
                password, 
                active: user.active, 
                role: user.role,
                about,
                image 
            })
            dispatch(setOpen({ open: false }))
            navigate('/', { replace: true })
            window.location.reload()
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
                    disabled
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
                <label className="modal-form__label" htmlFor="signup-about">
                    About</label>
                <textarea
                    className="modal-form__textarea"
                    id="signup-about"
                    name="about"
                    type="text"
                    autoComplete="off"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    maxLength="200"
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
                />
            </div>
            
            {   password &&
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
                />
            </div>
            }
            <button className="modal-button">Update</button>
        </form>
    )
}

export default EditProfileForm