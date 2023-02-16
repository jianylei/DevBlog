import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from '../../../features/users/usersApiSlice'
import { getPathStrFromStr } from '../../../utils/utils'
import { DELETED } from '../../../constants/constants'

const PostItem = ({ post }) => {
    const navigate = useNavigate()

    const { user, isLoading } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.entities[post?.user],
            isLoading
        })
    })

    if (!isLoading) {
        const url = getPathStrFromStr(post.title, post.id)
        
        const active = !(post.author === DELETED)

        const profileImg = user?.image && active
            ? `url(${user?.image})`
            : 'var(--NO-IMAGE)'

        return (
            <div className='side-post-item'>
                <div className='side-post-item-top'>
                    <div
                        className={`image side-image ${user?.image ? 'img-overlay' : ''} 
                            ${!active ? 'deleted' : ''}`}
                        style={{backgroundImage: profileImg}}
                        onClick={active ? undefined: undefined}
                    />
                    <p
                        className='side-post-item-author'
                        onClick={() => navigate(`/authors/${post.author}`)}
                    >
                        {post.author}
                    </p>
                </div>

                <h4
                    className='side-post-item-title'
                    onClick={() => navigate(`/${url}`)}
                >
                    {post.title}
                </h4>
            </div>
        )
    } else return undefined
}

export default PostItem