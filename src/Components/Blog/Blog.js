import React from "react";
import { useNavigate } from 'react-router-dom';
import './Blog.css';

export default function Blog({blog}){

    const navigate = useNavigate();

    return(
        <div className="card">

            <div>
                <img src={blog.imageurl} className="card-image"></img>
            </div>

            <div className="card-header">
                <div>
                    <div className="card-title">
                        {blog.title}
                    </div>
                </div>
            </div>

            <br/>
            <div className="card-text">
                {blog.description}
            </div>
            <br/>
            
            <div className="card-footer">
                <button className="btn" onClick={() => navigate('/blog/'+blog.id)}>MORE DETAILS</button>
            </div>

        </div>
    );
}