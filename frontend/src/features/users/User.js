import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { TABS } from "../../config/constants"
import NoMatch from "../../components/NoMatch"
import { useGetPostsQuery } from "../posts/postsApiSlice"

const User = () => {
    const { state } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[state?.id]
        })
    })

    const { posts } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            posts: data?.entities
        })
    })

    let userPost = []
    for (const postId in posts) {
        if (posts[postId].user === state?.id){
            userPost.push(posts[postId])
        }
    }

    if (!user) return <NoMatch tab={ TABS.Author }/>

    return (
        <div>{user?.username}<button onClick={()=>console.log(userPost)}></button></div>
    )
}

export default User