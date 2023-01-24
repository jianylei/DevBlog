const PostTags = ({ post }) => {
    const tags = post?.tags?.map((tag, idx) => 
        <button className="tag-button" key={idx}>{tag}</button>)

    if (tags?.length) {
        return <div className="post-tags__container">{tags}</div>
    }
    return undefined
}

export default PostTags