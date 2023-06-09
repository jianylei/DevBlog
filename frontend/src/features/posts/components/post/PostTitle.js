const PostTitle = ({ post }) => {
    return (
        <div className="post-title__container">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-subheading">{post.subHeading}</p>
            {post.cover ? (
                <img className="post-cover" src={post.cover} alt="Cover for post" />
            ) : undefined}
        </div>
    );
};

export default PostTitle;
