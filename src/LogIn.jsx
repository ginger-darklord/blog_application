import React, {useEffect, useState} from "react";
import {logIn} from "./api/userApi.jsx";
import {useNavigate} from "react-router-dom";

const LogIn = ({setAuthor, setLoggedIn}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // react router hook for redirect

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUserData(parsedUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logIn({name, password});
            const user = {name};
            localStorage.setItem("user", JSON.stringify({name})); //saves user in local storage
            setAuthor(user);
            setLoggedIn(true);

            alert(`Welcome back, ${name}!`);
            navigate("/");
        } catch (err) {
            console.error("Login failed", err);
        }
    }

    return (
        <div className={"form-container"}>
            {userData ? (
                <h2>Welcome back, {userData.name}!</h2>
            ) : (
                <>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type={"text"}
                            placeholder={"Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type={"password"}
                            placeholder={"Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type={"submit"}>Log in</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default LogIn;