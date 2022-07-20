import React, {useState,useEffect} from "react";
import { useAppContext } from "../../libs/Contextlibs";
import { useNavigate, useParams } from "react-router-dom";
// import './CreateBlog.css';

export default function BlogForm(){

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const {
        blogs,
        setBlogs
    } = useAppContext();

    const [formdata, setFormData] = useState({
        title: "",
        imageurl: "",
        description: ""
    })

    const [error, setError] = useState({
        title: "",
        imageurl: "",
        description: ""
    });

    const isBlog = (blog) => {
        return blog.id===id;
    }

    useEffect(() => {
        if(id){
            let blog = blogs.find(isBlog);
            // setBlogDetail(blog);
            setFormData({
                title: blog.title,
                imageurl: blog.imageurl,
                description: blog.description
            });
        }
    },[]);

    const handleChange = (e) => {
        let newFormData = {...formdata};
        switch(e.target.name){
        case 'title':
            newFormData['title'] = e.target.value;
            break;
        case 'imageurl':
            newFormData['imageurl'] = e.target.value;
            break;
        case 'description':
            newFormData['description'] = e.target.value;
            break;
        default:
            console.log('error');

        }
        setFormData(newFormData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let newError = {...error};
        let isFormValid = true;


        if(formdata.title===""){
            newError['title'] = "Cannot be empty";
            isFormValid = false;
        }
        else if(formdata.title.length<3||formdata.title.length>10){
            newError['title'] = "Character length should be between 3 and 10";
            isFormValid = false;
        }
        else{
            newError['title'] = "";
        }

        if(formdata.imageurl===""){
            newError['imageurl'] = "Cannot be empty";
            isFormValid = false;
        }
        else{
            newError['imageurl'] = "";
        }

        if(formdata.description===""){
            newError['description'] = "Cannot be empty";
            isFormValid = false;
        }
        else if(formdata.description.length<10||formdata.description.length>100){
            newError['description'] = "Character length should be between 10 and 100";
            isFormValid = false;
        }
        else{
            newError['description'] = "";
        }

        setError(newError);

        if(isFormValid){
            if(id){
                let newBlogs = [...blogs];
                let itemIndex = newBlogs.findIndex(x => x.id == id);
                newBlogs[itemIndex] = {id: id, title: formdata.title, imageurl: formdata.imageurl, description: formdata.description}
                setBlogs(newBlogs);
                navigate('/');
            }
            else{
                var dt = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (dt + Math.random()*16)%16 | 0;
                    dt = Math.floor(dt/16);
                    return (c==='x' ? r :(r&0x3|0x8)).toString(16);
                });
                let newBlogs = [...blogs];
                newBlogs.push({id: uuid, title: formdata.title, imageurl: formdata.imageurl, description: formdata.description});
                setBlogs(newBlogs);
                navigate('/');
            }

        }
    }

    return(
        <div>
            <br/>
            <div className="loginform">
                <div className="form-container">
                    <div className="formtitle">
                        {id ? ("Update Blog"):("Create a new Blog")}
                    </div>
                    <br/>
                    <br/>
                    <form onSubmit={handleSubmit}>
                    <div className="inputfieldcontainer">
                        <input type="text" placeholder="Enter Title" className="inputfield" name="title" value={formdata['title']} onChange={handleChange} />
                        {error.title!=="" && <span className="error">{error.title}</span>}
                    </div>
                    <br/>
                    <br/>
                    <div className="inputfieldcontainer">
                        <input type="text" placeholder="Enter Image URL" className="inputfield" name="imageurl" value={formdata['imageurl']} onChange={handleChange} />
                        {error.imageurl!=="" && <span className="error">{error.imageurl}</span>}
                    </div>                
                    <br/>
                    <br/>
                    <div className="inputfieldcontainer">
                        <textarea placeholder="Enter Description" className="inputfield" style={{'height': '70px'}} name="description" value={formdata['description']} onChange={handleChange}/>
                        {error.description!=="" && <span className="error">{error.description}</span>}
                    </div>                
                    <br/>
                    <br/>
                    <div className="btn-container">
                        <button type="submit" className="btn">{id ? ("Update Blog"):("Create Blog")}</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}