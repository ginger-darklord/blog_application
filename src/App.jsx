import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateBlog from "./CreateBlog.jsx";
import "./App.css";
import GetAll from "./GetAll.jsx";
import CreateUser from "./CreateUser.jsx";
import LogIn from "./LogIn.jsx";  // Import a CSS file

function Home() {
    return <h2 className="home-text">Welcome to the Blog App 🎉</h2>;
}

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [author, setAuthor] = useState(null);

    //check localStorage for logged-in user on initial load
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setLoggedIn(true);
            setAuthor((JSON.parse(user)));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setLoggedIn(false);
        setAuthor(null);
    };

    return (
        <Router>
            <div className="container">
                <h1 className="title">My Beautiful Blog App ✨</h1>

                <nav className="navbar">
                    <Link to="/" className="nav-link">🏠 Home</Link>
                    {
                        loggedIn && <Link to="/createBlog" className="nav-link">📝 Create Blog</Link>
                    }
                    <Link to="/allBlogs" className="nav-link">📝 Blogs</Link>
                    {!loggedIn ? (
                        <>
                            <Link to="/createUser" className="nav-link">Sign Up</Link>
                            <Link to="/logIn" className="nav-link">Log In</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="nav-link">Log Out</button>
                    )}
                </nav>

                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/createBlog" element={<CreateBlog loggedInUser={author}/>} />
                        <Route path="/allBlogs" element={<GetAll loggedInUser={author}/>} />
                        <Route path="/createUser" element={<CreateUser />} />
                        <Route path="/logIn" element={<LogIn setLoggedIn={setLoggedIn} setAuthor={setAuthor}/>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
