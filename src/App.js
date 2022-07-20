import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React,{useState, useEffect} from 'react';
import { AppContext } from "./libs/Contextlibs";
import Blogs from './Components/Blogs/Blogs';
import BlogDetails from './Components/BlogDetails/BlogDetails';
import BlogForm from './Components/BlogForm/Blogform';

function App() {

  var initialState = [];

  const [blogs, setBlogs] = useState(() => getLocalStorage("blogs", initialState));

  function setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  
  function getLocalStorage(key, initialValue) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }

  useEffect(() => {

    setLocalStorage("blogs", blogs);

  },[blogs]);

  console.log(blogs);

  return (
    <AppContext.Provider
      value={{
        blogs,
        setBlogs
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog/edit/:id" element={<BlogForm />} />
        </Routes>  
      </Router>

    </AppContext.Provider>

  );
}

export default App;
