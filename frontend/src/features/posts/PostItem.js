import { memo } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { getPathStrFromStr, getTimeSince } from "../../utils/utils"
import { DELETED, DIMENSIONS, REGEX } from '../../constants/constants'
import useWindowDimensions from "../../hooks/useWindowDimensions"

const PostItem = ({ postId }) => {
    const { post } = useGetPostsQuery('postsList',{
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId]
        })
    })

    const { width } = useWindowDimensions()
    
    const navigate = useNavigate()

    const { pathname } = useLocation()

    if (post) {
        const postUrl = getPathStrFromStr(post.title, post.id)
        const clickHandlerPost = () => navigate(`/${postUrl}`)
        const clickHandlerAuthor = () => navigate(`/authors/${post.author}`)

        const created = new Date(post.createdAt)
        const time = getTimeSince(created)
    
        const coverImg = post.cover 
            ? `url(${post.cover})`
            : 'var(--NO-IMAGE)'

        const active = !(post.author === DELETED)
        const authorRoute = REGEX.ROUTES.AUTHOR.test(pathname)

        return (
            <div className="post-card__container">
                <div className="post-card__header">
                    { !authorRoute 
                        ? <div 
                            className={`post-card-author ${!active ? 'deleted' : '' }`}
                            onClick={!active ? undefined : clickHandlerAuthor}
                        >{post.author}&nbsp;</div>
                        : undefined
                    }

                    <p className="post-card-date" onClick={clickHandlerPost}>
                        { !authorRoute ? '• ' : ''}
                        {time}
                        </p>
                </div>
                <div className="post-card__main">
                    <div className="post-card-content__container" onClick={clickHandlerPost}>
                        <h2 className="post-card-title">{post.title}</h2>
                        { width > DIMENSIONS.WIDTH.S
                            ? <p 
                                className="post-card-sub">{post.subHeading}</p>
                            : ''
                        }
                    </div>
                    <div
                        className={`image post-card-cover ${post.cover ? 'img-overlay' : ''}`}
                        style={{backgroundImage: coverImg}}
                        onClick={clickHandlerPost}
                    />
                </div>
                <div className="post-card__footer">
                    { post.tags?.length 
                        ? <div className="post-card-topic">{post.tags[0]}</div>
                        : ''
                    }
                    <p onClick={clickHandlerPost}>
                        {post.readTime} min read&nbsp;•&nbsp;{post.views} <FontAwesomeIcon icon={faEye} />
                    </p>
                </div>
            </div>
        )
    } else return null
}

const memoizedPostItem = memo(PostItem)

export default memoizedPostItem