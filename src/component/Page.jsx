import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {setBlog} from '../redux/Blog/blogSlice.js'
import axios from "axios";

function Page() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const post = useSelector((state) => state.blog.blog);
  const dispatch = useDispatch();
  const url=import.meta.env.VITE_BASE_URL;

  const fetchPost = async () => {
    try {
      const res = await axios.post(`${url}blogs/getblog`, {
        id: postId,
      });
      console.log(res.data);
      dispatch(setBlog(res.data));
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const isAuthor = post && user ? post.userId === user : false;


  const handleDelete = async ()=>{
     try {
      const res = await axios.post(`${url}blog/deleteblog`,{id:postId,token});
      alert(res.data.message);
      dispatch(deleteBlog(postId));
     }catch(e){
       console.log(e);
     }
     navigate('/');
  }

  const date = post.date
    ? new Date(post.date).toDateString()
    : new Date().toDateString();

  const time = post.date
    ? new Date(post.date).toLocaleTimeString()
    : new Date().toLocaleTimeString();

  return (
    <div>
      <div className="flex justify-center items-center h-full p-2 w-full">
        <div className="bg-gray-300 p-5 md:w-11/12 w-full flex flex-col rounded-2xl gap-5">
          <h1 className="text-2xl font-bold mt-5">{post.title}</h1>
          <div className="flex gap-5 flex-col items-center">
            <img
              src={post.image}
              alt=""
              className=" w-9/12 max-h-96 rounded-lg m-0 p-0"
            />
            <div className="w-full">
              <p className="text-gray-400 text-sm font-thin">{date}</p>
              <p className="text-gray-400 text-sm font-thin">created At-{time}</p>
            {post.author &&<p className="text-gray-400 text-sm font-thin">By {post.author}</p>}
              </div>
            <p className="text-gray-500 mt-5">{post.content}</p>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="w-full flex justify-end">
              <Link to="/blogs">
                <button className="btn">Go Back</button>
              </Link>
            </div>
            {isAuthor && (
              <div className="flex gap-5">
                <Link to='/editBlog'>
                  <button className="btn">Edit</button>
                </Link>
                  <button className="btn" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
