import React, {useState, useEffect} from "react";
import {deleteBlog, getAll} from "./api/blogApi.jsx";

const GetAll = () => {
    const [blogs, setBlogs] = useState([]); //stores fetched blog posts, initailly empty array
    const [loading, setLoading] = useState(true); //indicates wheter data loading
    const [error, setError] = useState(null); //stores error message

    const fetchBlogs = async () => {
        try {
            const data = await getAll();
            console.log("Fetched blogs:", data);
            setBlogs(data);
            // eslint-disable-next-line no-unused-vars
        } catch (err){
            setError("could not fetch blogs from database :P");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            // Option 1: re-fetch everything
            await fetchBlogs();

            // Option 2: manually remove from state
            // setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            setError("Failed to delete blog.");
        }
    };

    return (
      <div>
          <h1>All Blog Posts</h1>
          {loading && <p>Loading blogs...</p>}
          {error && <p style={{color:"red"}}>{error}</p>}
          {blogs.length === 0 && !loading && <p>No blogs found.</p>}

          {blogs.map((blog) =>(
              <div key={blog.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                <h2 className={"blog-title"}>{blog.title}</h2>
                <p className={"blog-content"} >{blog.content}</p>
                <p className={"blog-author"}>{blog.author}</p>
                  <button onClick={() => handleDelete(blog.id)} style={{ backgroundColor: "blueviolet", color: "white" }}>
                      Delete
                  </button>
              </div>
          ))}
      </div>
    );
};

export default GetAll;