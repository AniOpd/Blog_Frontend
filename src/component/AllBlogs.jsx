import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setBlogs,setMyBlogs} from '../redux/Blog/blogSlice.js'

function AllBlogs() {
  const dispatch = useDispatch();
  const {blogs} = useSelector(state=>state.blog);
  const user = useSelector(state=>state.auth.user);
  const blog = [];
  const url=import.meta.env.VITE_BASE_URL;
 
  
   const fetchBlogs = async()=>{
    try{
      const res = await axios.get(`${url}blogs/getblogs`);
      dispatch(setBlogs(res.data));
      if(user){
        res.data.blogs.map((bl)=>{
          if(bl.userId==user){
            blog.push(bl);
          }
        })
      }
      dispatch(setMyBlogs(blog));
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
   if(blogs.length === 0){
      fetchBlogs();
   }
  },[])

  if(blogs.length === 0){
    return (
      <div>
        <h1>No Blogs are Availabel</h1> 
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-5 m-5'>
    {blogs.map((bl,index)=>(
    <Link to={`/page/${bl._id}`} className=" bg-base-100 h-96 shadow-xl w-full rounded-md hover:scale-110" key={index}>
        <div  key={index} id={index} className="card max-w-full max-h-full  p-2">
      <div className="card-body">
        <h2 className="card-title">{bl.title.slice(0,20)}{bl.title.length>20?"...":""}</h2>
        <p>{bl.content.slice(0,20)}{bl.content.length>20?"...":""}</p>
      </div>
      <figure className='h-full'>
        <img
          className='w-full h-auto'
          src={bl.image}
          alt={bl.title} />
      </figure>
    </div>
    </Link>
    ),)}
  </div>
  )
}

export default AllBlogs
