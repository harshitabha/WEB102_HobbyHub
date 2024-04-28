import { useEffect, useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import "./PostTile.css";

const PostTile = ({
    postId,
    title,
    content,
    image,
    upvotes,
    downvotes,
    author_id,
    timeCreated,
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

    const getElapsedTime = (timeCreated) => {
        const timeInMs = new Date() - new Date(timeCreated);
        const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeInMs / (1000 * 60 * 60));
        const minutes = Math.floor(timeInMs / (1000 * 60));
        const seconds = Math.floor(timeInMs / 1000);
        
        // assemble the output string
        let outputString = "";
        if (days > 0) {
            outputString = `${days} day${days > 1 ? "s" : ""}`;
        } else if (hours > 0) {
            outputString = `${hours} hour${hours > 1 ? "s" : ""}`;
        } else if (minutes > 0) {
            outputString = `${minutes} minute${minutes > 1 ? "s" : ""}`;
        } else if (seconds > 0){
            outputString = `${seconds} second${seconds > 1 ? "s" : ""}`;
        }
        return outputString
    }

    const timeElapsedStr = getElapsedTime(timeCreated);
    return (
        <div 
            className="post-tile"
            onClick={() => navigate(`/post/${postId}`, {state: {
                user_id: author_id,
                post_id: postId,
                post_img: image,
                post_title: title,
                post_content: content,
                timeCreated: timeElapsedStr,
                upvotes: upvotes,
                downvotes: downvotes,
            }})}>
            <h3 className="tile-txt">{title}</h3>
            <img 
                src={image} 
                alt="Post Image"
                className="tile-img" />

            {timeCreated ? <p className="tile-txt created-txt">
                Created {timeElapsedStr.length > 0 ? timeElapsedStr + " ago" : "Right Now"}</p> 
                : null}

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