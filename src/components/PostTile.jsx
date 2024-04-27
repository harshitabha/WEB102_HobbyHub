import { useEffect, useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
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
            <div className="row tile-txt min-content">
                <p>Posted by: </p>
                <p className="var-txt">{author}</p>
            </div>
            <div className="row">
                <div className="row min-content">
                    <ThumbUpOffAltIcon className="icon" />
                    <p className="var-txt">
                        {upvotes}
                    </p>
                </div>
                <div className="row min-content">
                    <ThumbDownOffAltIcon className="icon" />
                    <p className="var-txt">
                        {downvotes}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostTile;