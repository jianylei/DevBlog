import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
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
        <FontAwesomeIcon className="post-edit__button" icon={faPenToSquare} onClick={navHandle} />
    )
}

export default EditButton