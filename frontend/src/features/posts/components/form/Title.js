import { useDispatch, useSelector } from 'react-redux'
import { setTitle as setPostTitle, selectCurrentPostErr } from '../../postSlice'

const Title = ({ state, err, resetInputErr }) => {
    const [title, setTitle] = state
    const [isError, errMsg] = useSelector(selectCurrentPostErr)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setTitle(e.target.value)
        dispatch(setPostTitle({ title: e.target.value }))
        resetInputErr()
    }

    return (
        <div className={`form-input__container ${err ? 'errborder' : ''}`}>
            { isError && errMsg
                ? <div className="errmsg">{errMsg}</div>
                : undefined
            }
            <input
                className="form__input"
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                autoComplete="off"
                value={title}
                onChange={handleChange}
            />
            <span className="title-span"></span>
        </div>
    )
}

export default Title