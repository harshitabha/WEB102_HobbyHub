
const PostTile = ({
    postId,
    title,
    upvotes,
    downvotes,
    author,
    navigate
}) => {
    return (
        <div 
            className="post-tile"
            onClick={() => navigate(`/post/${postId}`)}>
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <div className="row">
                <p>Upvotes: {upvotes}</p>
                <p>Downvotes: {downvotes}</p>
            </div>
        </div>
    );
};

export default PostTile;