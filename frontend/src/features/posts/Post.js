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
const now = new Date();
const tmp = new Date(post.createdAt)
const diff = now - tmp
console.log(diff/ (1000*60*60*24))

    return (
        <div className="card-container">
            <div className="card__container-top">
                <img src="http://localhost:3080/images/users/jianyonglei/bg.png" />
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

/*
             <div className="card-container-top">
                <div className="card__main">
                    <div className="card__main-author">@{post.author}</div>
                    <h3 className="card__main-title">{post.title}</h3>
                    <p className="card__main-subHeading">{post.subHeading}</p>
                </div>
                <img src="http://localhost:3080/images/users/jianyonglei/bg.png"></img>
            </div>
            <div className="card-container-bottom">
                <p>{created}</p>
                <p>{post.readTime} min read • {post.views} <FontAwesomeIcon icon={faEye} /></p>
            </div>
 */