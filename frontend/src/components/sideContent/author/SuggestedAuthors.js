import { useEffect, useRef, useState } from "react"
import { useGetPostsQuery } from "../../../features/posts/postsApiSlice"
import { useGetUsersQuery } from "../../../features/users/usersApiSlice"
import { shuffleArray } from "../../../utils/utils"
import AuthorItem from "./AuthorItem"

const SuggestedAuthors = () => {
    const [firstThree, setFirstThree] = useState([])
    const [firstRender, setFirstRender] = useState(true)

    const {
        data: posts,
        isSuccess,
        isError,
    } = useGetPostsQuery('postsList')

    const {
        data: users,
        isSuccess: isUsersSuccess,
        isError: isUsersError,
    } = useGetUsersQuery('usersList')

    let content

    if (isError) content = <div></div>

    if (isSuccess && isUsersSuccess) {
        const { ids, entities } = posts
        const { entities: usersEntities } = users

        const idArr = []

        if (firstRender) {
            ids?.length && ids.forEach(id => {
                const userId = entities[id].user
                if (!idArr.includes(userId)) idArr.push(userId)
            })
            
            setFirstThree(shuffleArray(idArr).slice(0, 3))
            setFirstRender(false)
        }
        
        const authorsList = firstThree.map(id => <AuthorItem key={id} author={usersEntities[id]} />)

        return (
            <div className='side-section'>
                <h3 className='side-title'>Who to follow</h3>
                <div className='side-post-items'>
                    {authorsList}
                </div>
                <div><button className='side-full-list-button'>See more suggestions</button></div>
            </div>
        )
    } return undefined
}

export default SuggestedAuthors