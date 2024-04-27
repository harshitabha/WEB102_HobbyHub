import Navbar from "../components/Navbar";

const Signup = ({navigate}) => {
    return (
        <div>
            <Navbar navigate={navigate}/>
            <h1>Signup Component</h1>
            {/* Add your signup form here */}
        </div>
    );
};

export default Signup;