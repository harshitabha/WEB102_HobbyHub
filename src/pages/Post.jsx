import './Post.css';
import Navbar_Login from '../components/Navbar_login';
import IconButton from '../components/IconButton';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// icons
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const Post = ({supabase, navigate}) => {
    const postInfo = useLocation().state;

    const [comments, setComments] = useState(null);
    const [author, setAuthor] = useState("");

    const [votes, setVotes] = useState({
        upvotes: postInfo.upvotes,
        downvotes: postInfo.downvotes,
    });

    const handleVote = (voteType) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [voteType]: prevVotes[voteType] + 1,
        }));
    }

    useEffect(() => {
        updateVotesDB();
    }, [votes]);

    const updateVotesDB = async (voteType) => {
        const { data, error } = await supabase
            .from('Posts')
            .update({
                upvotes: votes['upvotes'],
                downvotes: votes['downvotes'],
            })
            .eq('id', postInfo.post_id)
            .eq('user_id', postInfo.user_id);
        if (error) {
            console.error(error);
            alert("Error updating votes");
        }
    }

    // Pull the relavent comments for from the db
    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('id', postInfo.post_id)
                .eq('user_id', postInfo.user_id);
            if (error) {
                console.error(error);
                alert("Error fetching comments");
                return;
            }

            setComments([...data]);
        }

        const fetchAuthor = async () => {
            const { data, error } = await supabase
                .from('Users')
                .select('username')
                .eq('id', postInfo.user_id);
            if (error) {
                console.error(error);
                return;
            }
            setAuthor(data[0].username);
        }
        fetchComments();
        fetchAuthor();

    }, []);

    return (
        <div className='pg'>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase} />
            <div className="pg-content">
                <div className="post-content row">
                    <div className="post-ops col">
                        <IconButton 
                            icon={<ThumbUpOffAltIcon />}
                            content={votes.upvotes}
                            handleClick={() => handleVote('upvotes')} />
                        <IconButton 
                            icon={<ThumbDownOffAltIcon />}
                            content={votes.downvotes}
                            handleClick={() => handleVote('downvotes')} />
                        <IconButton 
                            icon={<EditOutlinedIcon />} />
                        <IconButton 
                            icon={<DeleteIcon />} />
                    </div>

                    <div className="post-container">
                        <p className='post-info'>
                            <b>{author}</b> Posted {postInfo.timeCreated !== "" ? postInfo.timeCreated + " ago" : "Right Now"}
                        </p>
                        <h1 className="post-title">{postInfo.post_title}</h1>
                        
                        <img 
                            src={postInfo.post_img} 
                            alt="Post Image" 
                            className="post_img" />
                        
                        <p className="post_txt">
                            {postInfo.post_content}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Post;