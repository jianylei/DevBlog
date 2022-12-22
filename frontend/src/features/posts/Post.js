import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"


const Post = ({ postId }) => {
    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId]
        })
    })

    const created = new Date(post.createdAt).toLocaleString('en-US', 
        { day: 'numeric', month: 'short' })

    return (
        <div className="card-container">
            <div className="card__container-top">
                { post.cover ? <img src={post.cover} /> : <div className="card-noimage" />}
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
}

export default Post