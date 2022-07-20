import React, {useState, useEffect } from "react";
import { useAppContext } from "../../libs/Contextlibs";
import { useNavigate, useParams } from "react-router-dom";
import './BlogDetails.css';

export default function BlogDetails(){

    const navigate = useNavigate();

    const [blogDetail, setBlogDetail] = useState(null);

    const { id } = useParams();

    const {
        blogs,
        setBlogs
    } = useAppContext();

    const deleteBlog = () => {
        const newBlogs = blogs.filter(function( obj ) {
            return obj.id !== id;
        });
        setBlogs(newBlogs);
        navigate('/');
    }

    const isBlog = (blog) => {
        return blog.id===id;
    }

    useEffect(() => {
        setBlogDetail(blogs.find(isBlog));
    },[]);

    // const blogobj = blogs.find(isBlog);

    console.log(blogDetail);
    
    if(blogDetail===null){
        return <div>Loading...</div>
    }

    return(
        <div>
            {/* <button className="btn" onClick={() => navigate('/')}>Back to Blogs</button> */}
            <br/>
            <br/>
            <div className="blogdetail-container">
                <div className="card">

                    <div>
                        <img src={blogDetail.imageurl} className="card-image"></img>
                    </div>

                    <div className="card-header">
                        <div>
                            <div className="card-title">
                                {blogDetail.title}
                            </div>
                        </div>
                    </div>

                    <br/>
                    <div className="card-text">
                        {blogDetail.description}
                    </div>
                    <br/>
                    
                    <div className="card-footer">
                        <button className="btn" onClick={() => navigate('/blog/edit/'+id)}>Edit</button> &nbsp;
                        <button className="btn delete" onClick={deleteBlog}>Delete</button>
                    </div>

                </div>
            </div>
        </div>

    );

}