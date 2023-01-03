import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from "react-router-dom"
import { getPathStrFromStr, getTimeSince } from "../../config/utils"
import { DELETED } from '../../config/constants'
import useWindowDimensions from "../../hooks/useWindowDimensions"


const PostItem = ({ postId }) => {
    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId]
        })
    })

    const { width } = useWindowDimensions()
    
    const navigate = useNavigate()

    if (post) {
        const postUrl = getPathStrFromStr(post.title, post.id)
        const clickHandler = () => navigate(`/${postUrl}`,{state: {id: postId}})
    
        const created = new Date(post.createdAt)
        const time = getTimeSince(created)
    
        const coverImg = post.cover 
            ? `url(${post.cover})`
            : 'var(--NO-IMAGE)'

        return (
            <div className="post-card__container">
                <div className="post-card__header">
                    <div className={`post-card-author ${post.author === DELETED 
                        ? 'deleted' : '' }`}>{post.author}</div>
                    <p className="post-card-date" onClick={clickHandler}>&nbsp;•&nbsp;{time}</p>
                </div>
                <div className="post-card__main" onClick={clickHandler}>
                    <div className="post-card-content__container">
                        <h2 className="post-card-title">{post.title}</h2>
                        { width > 728
                            ? <p className="post-card-sub">{post.subHeading}</p>
                            : ''
                        }
                    </div>
                    <div
                        className={`image post-card-cover ${post.cover ? 'img-overlay' : ''}`}
                        style={{backgroundImage: coverImg}}
                    />
                </div>
                <div className="post-card__footer">
                    { post.tags?.length 
                        ? <div className="post-card-topic">{post.tags[0]}</div>
                        : ''
                    }
                    <p onClick={clickHandler}>
                        {post.readTime} min read&nbsp;•&nbsp;{post.views} <FontAwesomeIcon icon={faEye} />
                    </p>
                </div>
            </div>
        )
    } else return null
}

const memoizedPostItem = memo(PostItem)

export default memoizedPostItem