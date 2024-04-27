import { useEffect, useState } from "react";
import "./PostTile.css";

const PostTile = ({
    postId,
    title,
    image,
    upvotes,
    downvotes,
    author_id,
    navigate,
    supabase,
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
            <h3 className="tile-txt">{title}</h3>
            <img 
                src={image} 
                alt="Post Image"
                className="tile-img" />
            <p className="tile-txt">Author: {author}</p>
            <div className="row">
                <p style={{margin: "0 0 2vh 0"}}>Upvotes: {upvotes}</p>
                <p style={{margin: "0 0 2vh 0"}}>Downvotes: {downvotes}</p>
            </div>
        </div>
    );
};

export default PostTile;