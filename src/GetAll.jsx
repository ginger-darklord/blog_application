import React, {useState, useEffect} from "react";
import {getAll} from "./api/blogApi.jsx";

const GetAll = () => {
    const [blogs, setBlogs] = useState([]); //stores fetched blog posts, initailly empty array
    const [loading, setLoading] = useState(true); //indicates wheter data loading
    const [error, setError] = useState(null); //stores error message

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getAll();
                console.log("Fetched blogs:", data);
                setBlogs(data);
                // eslint-disable-next-line no-unused-vars
            } catch (err){
                setError("an error occurred while loading the data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return (
      <div>
          <h1>All Blog Posts</h1>
          {loading && <p>Loading blogs...</p>}
          {error && <p style={{color:"red"}}>{error}</p>}
          {blogs.length === 0 && !loading && <p>No blogs found.</p>}

          {blogs.map((blog) =>(
              <div key={blog.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                <h2 className={"blog-title"}>{blog.title}</h2>
                <p className={"blog-content"}>{blog.content}</p>
                <p className={"blog-author"}>{blog.author}</p>
              </div>
          ))}
      </div>
    );
};

export default GetAll;