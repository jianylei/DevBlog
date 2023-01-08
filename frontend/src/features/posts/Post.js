import { useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import parse from 'html-react-parser'
import { TABS, DELETED, DIMENSIONS } from "../../constants/constants"
import NoMatch from "../../components/NoMatch"
import { getIdFromPathStr, getPathStrFromStr, getTimeSince } from "../../utils/utils"
import useWindowDimensions from "../../hooks/useWindowDimensions"


const Post = () => {
    const { title } = useParams();
    const id = getIdFromPathStr(title)

    const { pathname } = useLocation();

    const { width } = useWindowDimensions()

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[id]
        })
    })

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[post?.user]
        })
    })

    if (!post || ('/'+getPathStrFromStr(post.title, post.id) !== pathname)) {
        return <NoMatch tab={ TABS.Post }/>
    }

    const created = new Date(post.createdAt)
    const time = getTimeSince(created)

    const updated = new Date(post.updatedAt)  
    const updatedTime = getTimeSince(updated)

    const tags = post.tags?.map((tag, idx) => 
        <button className="tag-button" key={idx}>{tag}</button>)
    
    const clickHandler = () => navigate(`/authors/${user?.username}`)
    
    const active = !(post.author === DELETED)

    const profileImg = user?.image && active
        ? `url(${user?.image})`
        : 'var(--NO-IMAGE)'

    return (
        <div className='blog-content__container'>
            <div className="post-header__container">
                <div
                    className={`image author-card-image ${user?.image ? 'img-overlay' : ''} 
                        ${!active ? 'deleted' : ''}`}
                    style={{backgroundImage: profileImg}}
                    onClick={active ? clickHandler: undefined}
                />
                <div className="post-header-data__container">
                    <div className="post-header-data-top">
                        <div 
                            className={`post-username ${!active ? 'deleted' : ''}`}
                            onClick={active ? clickHandler : undefined}
                        >
                            {post.author}
                        </div>
                        { width <= DIMENSIONS.WIDTH.M
                            ? <button className="post-follow-button">Follow</button>
                            : undefined
                        }
                    </div>
                    <div className="post-header-data-bottom">
                        {time}&nbsp;•&nbsp;{post.readTime} min read&nbsp;
                        •&nbsp;{post.views} <FontAwesomeIcon icon={faEye} />
                    </div>
                </div>
            </div>
            <div className="post-title__container">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-subheading">{post.subHeading}</p>
                { post.cover ? 
                    <img className="post-cover" src={post.cover} />
                     : undefined
                }
            </div>
            <div className="post-content__container">
                <div className="post-content">{parse(post.content)}</div>
                <div className="post-lastEdited">Last edit: {updatedTime}</div>
            </div>
            { tags?.length 
                ? <div className="post-tags__container">{tags}</div>
                : undefined
            }
        </div>
    )
}

export default Post