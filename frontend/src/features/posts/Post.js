import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useGetPostsQuery } from "./postsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import parse from 'html-react-parser'
import { TABS } from "../../config/constants"
import NoMatch from "../../components/NoMatch"
import { useGetUsersQuery } from "../users/usersApiSlice"

const Post = () => {
    const { state } = useLocation()

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
            user: data?.entities
        })
    })
const test = () => console.log(user)
    if (!post) return <NoMatch tab={ TABS.Post }/>

    const created = new Date(post.createdAt).toLocaleString('en-US', 
        { day: 'numeric', month: 'short', year: 'numeric' })

    const updated = new Date(post.updatedAt).toLocaleString('en-US', 
        { day: 'numeric', month: 'short', year: 'numeric' })      


    const tags = post.tags?.map((tag, idx) => 
        <button className="post-tag-item" key={idx}>#{tag}</button>)

    return (
        <div className="post__container"><button onClick={test}></button>
            <div className="post__header">
                <h1 className="post__header-title">{post.title}</h1>
                <p className="post__header-subHeading">{post.subHeading}</p>
                <div className="post__header-metadata__container">
                    <div className="post__header-profile__container">
                        <div className="post__header-profile-noimage"></div>
                        <div className="post__header-profile-flex__container">
                            <div className="post__header-author">@{post.author}</div>
                            <div className="post__header-views">{post.readTime} min read • {post.views} <FontAwesomeIcon icon={faEye} /></div>
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