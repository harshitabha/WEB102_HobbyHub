import { useLocation } from "react-router-dom";
import Navbar_Login from "../components/Navbar_login";
import PostTile from "../components/PostTile";
import { useEffect, useState } from "react";

const Home = ({navigate, supabase}) => {
    const userId = useLocation().state?.user_id;
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*');
            if (error) {
                console.error(error);
                return;
            }
            setPosts(data);
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    
    return (
        <div>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase}
                userId= {userId}/>
            <div className="home-pg pg">
                {posts.map((post) => (
                    <PostTile 
                        key={post.id}
                        title={post.title}
                        author_id={post.user_id}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        supabase={supabase}
                        userId={userId}
                    />
                ))}
            </div>

        </div>
    );
};

export default Home;