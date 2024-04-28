import { useEffect, useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { getElapsedTime } from "../js/time";
import "./PostTile.css";

const PostTile = ({
    postId,
    title,
    image,
    upvotes,
    downvotes,
    user_id,
    timeCreated,
    navigate,
    supabase,
}) => {
    const [author, setAuthor] = useState("");
    useEffect(() => {
        const getAuthor = async (id) => {
            let { data, error } = await supabase
                .from('Posts')
                .select('user_id')
                .eq('id', id);
            if (error) {
                console.error(error);
                return;
            }

            ({data, error} = await supabase
                .from('Users')
                .select('username')
                .eq('id', data[0].user_id));
            if (error) {
                console.error(error);
                return;
            }
            setAuthor(data[0].username);
        }

        getAuthor(postId);
    }, []);

    

    const timeElapsedStr = getElapsedTime(timeCreated);
    return (
        <div 
            className="post-tile"
            onClick={() => navigate(`/post/${postId}`, {state: {
                user_id: user_id,
                post_id: postId,
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