import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Navbar_Login from "../components/Navbar_login";

const Home = ({navigate, supabase}) => {
    const userId = useLocation().state?.user_id;
    const handleLogOut = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) {
            alert("Error logging out");
            console.error(error);
            return;
        } else {
            navigate("/");
        }

    }
    
    return (
        <div>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase}
                userId= {userId}/>
            <div className="home-pg pg">
                <h1>Welcome to HobbyHub!</h1>
                <p>Explore and share your hobbies with others.</p>
            </div>

        </div>
    );
};

export default Home;