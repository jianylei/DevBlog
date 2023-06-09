import { useDispatch } from "react-redux"
import { setCover as setPostCover } from "../../postSlice"
import { imgFileToBase64 } from "../../../../utils/postFormUtils"

const Cover = ({ state }) => {
    const [cover , setCover] = state

    const dispatch = useDispatch()

    const onChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setCover(URL.createObjectURL(e.target.files[0]))
          imgFileToBase64(e.target.files[0], (cover) => {
            setCover(cover)
            dispatch(setPostCover({ cover }))
          })
        }
    }

    const handleRemove = () => {
        dispatch(setPostCover(''))
        setCover('')
    }

    const coverImg = cover
        ? `url(${cover})`
        : 'var(--NO-IMAGE)'
    
    return (
        <label className="form-cover__container" htmlFor="cover">
            <input 
            id='cover'
            type='file'
            accept="image/*"
            onChange={onChange}
            hidden
            />
            <div
                className={`image post-card-cover ${cover ? 'img-overlay' : ''}`}
                style={{backgroundImage: coverImg}}
            >
            <button
                type="button"
                className={`form-input-unselect ${cover ? 'show' : undefined}`}
                onClick={handleRemove}
            >
                remove
            </button>
            </div>
        </label>
    )
}

export default Cover