import Navbar from "../components/Navbar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { useEffect, useState } from "react";

import "./Signup.css";

const Signup = ({navigate, supabase}) => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        passVerify: "",
        username: "",
    });

    const handleInfoChange = (e) => {
        const {name, value} = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        // make sure the passwords match
        if (userInfo.password !== userInfo.passVerify) {
            alert("Passwords do not match");
            return;
        }

        let success = await signUpUser();
        if (success) navigate("/home");
    };
    
    const signUpUser = async () => {
        // sign the user up
        let { data, error } = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password,
        })

        if (error) {
            alert("Error signing up");
            console.error(error);
            return false;
        } 
        
        // add the user to the user's table
        let { tableData, tableErr } = await supabase.from('Users').insert([{ 
            email: userInfo.email,
            username: userInfo.username,
        }]);

        if (tableErr) {
            console.error(tableErr);
            return false;
        }

        return true;
    }

    return (
        <div>
            <Navbar navigate={navigate}/>
            <div className="background-pg">
                <div className="form-container">
                    <h2 className="form-title">Sign Up</h2>
                    <form> 
                        <TextInput 
                            placeholder={"Username"}
                            name={"username"}
                            value={userInfo.username}
                            handleChange={(e) => handleInfoChange(e)}/>
                        {/* <br /> */}
                        <TextInput 
                            placeholder={"Email"}
                            name={"email"}
                            value={userInfo.email}
                            type={"email"}
                            handleChange={(e) => handleInfoChange(e)}/>
                        {/* <br /> */}
                        <TextInput 
                            placeholder={"Password"}
                            name={"password"}
                            type={"password"}
                            value={userInfo.password}
                            handleChange={(e) => handleInfoChange(e)}/>
                        {/* <br /> */}
                        <TextInput 
                            placeholder={"Verify Password"}
                            name={"passVerify"}
                            type={"password"}
                            value={userInfo.passVerify}
                            handleChange={(e) => handleInfoChange(e)}/>
                        <br />

                        <Button 
                            content={"Sign Up"}
                            submit={true}
                            onClick={(e) => handleSignUp(e)}/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;