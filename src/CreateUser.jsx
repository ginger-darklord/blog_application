import React, {useState} from "react";
import {createUser} from "./api/userApi.jsx";

const CreateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            console.log("All fields are required.");
            return;
        }

        //setLoading(true);

        try {
            await createUser({name, email, password});
            alert("user created successfully, congartulations")
        } catch (err) {
            console.error("error creating user: ", err);
        }
    };

    return (
        <div className={"form-container"}>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    placeholder={"Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type={"email"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={"password"}
                    placeholder={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;