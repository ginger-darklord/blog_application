import React, {useEffect, useState} from "react";
import {createBlog} from "./api/blogApi.jsx";


const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents page from refreshing
        try {
            const blogData = {
                title,
                content,
                author: loggedInUser?.name || "Unknown" // Ensure it's always a string
            };

            console.log("Sending blog data:", JSON.stringify(blogData, null, 2));
            await createBlog(blogData);
            alert("Blog created succesfully")
        } catch (error) {
            console.error("Error creating blog", error);
        }
    };

    if (!loggedInUser) return <p>Loading or not logged in...</p>;

    return (
        <div className={"form-container"}>
            <h2>Create Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    placeholder={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder={"Write whatever your heart desires"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type={"submit"}>Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;
