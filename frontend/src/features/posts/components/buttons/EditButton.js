import { useNavigate } from "react-router-dom"
import { getPathStrFromStr } from "../../../../utils/utils"

const EditButton = ({ post }) => {
    const navigate = useNavigate()
    
    const navHandle = () => {
        if (post) {
            navigate('/write/'+getPathStrFromStr(post.title, post.id))
        } else {
            navigate('/')
        }
    }

    return (
        <button
            className="post-follow-button"
            onClick={navHandle}
        >
            Edit
        </button>
    )
}

export default EditButton