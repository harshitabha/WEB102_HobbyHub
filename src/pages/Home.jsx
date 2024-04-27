import { useLocation } from "react-router-dom";
import Navbar_Login from "../components/Navbar_login";
import PostTile from "../components/PostTile";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

import "./Home.css";
const Home = ({navigate, supabase}) => {
    const userId = useLocation().state?.user_id;
    
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*');
            if (error) {
                console.error(error);
                return;
            }
            setPosts(sortByTime(data));
        }
        fetchPosts();
    }, []);

    const sortByTime = (data) => {
        let sorted = [...data];
        sorted.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return sorted;
    }

    const sortByUpvotes = () => {
        let sorted = [...posts];
        sorted.sort((a, b) => {
            return b.upvotes - a.upvotes;
        });
        setPosts(sorted);
    }

    return (
        <div>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase}
                userId= {userId}/>
            <div className="home-pg ">
                <div className="row sorting-btns ">
                    <h2>Sort By:</h2>
                    <Button 
                        handleClick={() => sortByTime}
                        content={"Sort by Time"}
                        classes={"sort-btn"} />
                    <Button 
                        handleClick={() => sortByTime}
                        content={"Sort by Time"}
                        classes={"sort-btn"} />

                    <div className="searchContainer">
                        <input 
                            type="text" 
                            className="search" 
                            placeholder="Search..."
                            value={search} 
                            name="search"
                            onChange={ (e) => setSearch((e.target.value).trim().toLowerCase()) }/>
                            <SearchIcon className='icon'/>
                    </div> 
                </div>

                <div className="posts-container">
                    {posts.map((post) => (
                        <>
                            <PostTile 
                                key={post.id}
                                title={post.title}
                                image={post.image}
                                author_id={post.user_id}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                supabase={supabase}
                                userId={userId}
                            />
                        </>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;