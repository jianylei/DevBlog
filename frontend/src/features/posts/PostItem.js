import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from "react-router-dom"
import { strToPathStr } from "../../config/utils"


const Post = ({ postId }) => {
    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId]
        })
    })
    
    const navigate = useNavigate()

    if (post) {
        const postUrl = strToPathStr(post.title)
        const clickHandler = () => navigate(`/${postUrl}`,{state: {id: postId}})
    
        const created = new Date(post.createdAt).toLocaleString('en-US', 
            { day: 'numeric', month: 'short' })
    
        return (
            <div className="card__container" onClick={clickHandler}>
                <div className="card__container-top">
                    { post.cover 
                        ? <img src={post.cover} alt='Post cover' /> 
                        : <div className="card-noimage" />
                    }
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-subHeading">{post.subHeading}</p>
                </div>
                <div className="card__container-bottom">
                    <div className="card-author">@{post.author}</div>
                    <div className="card-data">
                        <p>{created}</p>
                        <p>{post.readTime} min read • {post.views} <FontAwesomeIcon icon={faEye} /></p>
                    </div>
                </div>
            </div>
        )
    } else return null
}

export default Post