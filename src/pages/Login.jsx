import Navbar from "../components/Navbar";

const Login = ({navigate}) =>{
    return (
        <>
            <Navbar navigate={navigate}/>
            <div>
                <h1>Login</h1>
                {/* Add your login form here */}
            </div>
        </>
    );
}

export default Login;