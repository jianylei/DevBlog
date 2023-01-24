import parse from 'html-react-parser'
import { getTimeSince } from '../../../../utils/utils'

const PostContent = ({ post }) => {
    const updatedTime = getTimeSince(new Date(post.updatedAt) )

    return (
        <div className="post-content__container">
            <div className="post-content">{parse(post.content)}</div>
            <div className="post-lastEdited">Last edit: {updatedTime}</div>
        </div>
    )
}

export default PostContent