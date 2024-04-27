import { useEffect, useState } from "react";
import "./PostTile.css";

const PostTile = ({
    postId,
    title,
    upvotes,
    downvotes,
    author_id,
    navigate,
    supabase
}) => {
    const [author, setAuthor] = useState("");
    useEffect(() => {
        const getAuthor = async (id) => {
            const { data, error } = await supabase
                .from('Users')
                .select('username')
                .eq('id', id);
            if (error) {
                console.error(error);
                return;
            }
            setAuthor(data[0].username);
        }

        getAuthor(author_id);
    }, []);
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