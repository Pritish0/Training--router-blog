import React from "react";
import { useAppContext } from "../../libs/Contextlibs";
import { useNavigate } from 'react-router-dom';
import Blog from '../Blog/Blog';
import './Blogs.css';


export default function Blogs(){

    const navigate = useNavigate();

    const {
        blogs,
        setBlogs
    } = useAppContext();

    return(
        <div>
            <br/>
            <div className="btn-container">
                <button className="btn" onClick={() => navigate('/create')}>Create Blog</button>
            </div>
            <br/>
            <br/>
            <div className="blogs-container">
                {blogs.map((blog) => {
                    return(
                        <Blog key={blog.id} blog={blog} />
                    );
                })}
            </div>
            <br/>
            <br/>

        </div>
    );
}