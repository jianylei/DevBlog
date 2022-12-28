import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import parse from 'html-react-parser'
import { TABS, DELETED } from "../../config/constants"
import NoMatch from "../../components/NoMatch"


const Post = () => {
    const { state } = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[state?.id]
        })
    })

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[post?.user]
        })
    })

    if (!post) return <NoMatch tab={ TABS.Post }/>

    const created = new Date(post.createdAt).toLocaleString('en-US', 
        { day: 'numeric', month: 'short', year: 'numeric' })

    const updated = new Date(post.updatedAt).toLocaleString('en-US', 
        { day: 'numeric', month: 'short', year: 'numeric' })      


    const tags = post.tags?.map((tag, idx) => 
        <button className="post-tag-item" key={idx}>#{tag}</button>)
    
    const clickHandler = () => navigate(`/authors/${user.username}`,{state: {id: user.id}})

    const setImg = () => {
        if (post.author === DELETED) return <div className="post__header-profile-noimage deleted" />

        if (user?.image) {
            return <img src={user.image}  onClick={clickHandler} />
        }
        return <div className="post__header-profile-noimage"  onClick={clickHandler} />
    }

    return (
        <div className="post__container">
            <div className="post__header">
                <h1 className="post__header-title">{post.title}</h1>
                <p className="post__header-subHeading">{post.subHeading}</p>
                <div className="post__header-metadata__container">
                    <div className="post__header-profile__container">
                        { setImg() }
                        <div className="post__header-profile-flex__container">
                            { post.author === DELETED
                                ? <div className={"post__header-author deleted"}>
                                    {post.author}</div>
                                : <div className={"post__header-author"}
                                    onClick={clickHandler}> {post.author}</div> 
                            }
                            <div className="post__header-views">{post.readTime} min read 
                                • {post.views} <FontAwesomeIcon icon={faEye} /></div>
                        </div>
                    </div>
                    <div className="post__header-date__container">
                        <div className="post__header-date-created">Created {created}</div>
                        <div className="post__header-date-updated">Updated {updated}</div>
                    </div>
                </div>
            </div>
            <div className="post__content">
                {parse(post.content)}
            </div>
            <div className="post-tags__container">
                {tags}
            </div>
        </div>
    )
}

export default Post