import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import { setBlogs,setMyBlogs} from '../redux/Blog/blogSlice.js'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Homs() {
  const dispatch = useDispatch();
  const {blogs} = useSelector(state=>state.blog);
  const user = useSelector(state=>state.auth.user);
  const blog = [];
  const url=import.meta.env.VITE_BASE_URL;


  const fetchBlogs = async()=>{
    try{
      const res = await axios.get(`${url}blogs/getblogs`);
      console.log(res);
      dispatch(setBlogs(res.data));
      if(user){
        res.data.map((bl)=>{
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
    fetchBlogs();
  },[])

  if(blogs.length === 0){
    return (
      <div>
        <h1>No Blogs are Availabel</h1> 
      </div>
    )
  }

  return (
   <div className='flex flex-col items-center'>
    <div className='flex gap-4 overflow-scroll my-10 w-screen p-3'>
      {blogs.map((bl,index)=>(index<4 &&
    <Link to={`/page/${bl._id}`} className=" bg-base-100 md:w-1/2 h-96 shadow-xl w-full rounded-md hover:scale-110" key={index}>
        <div  key={index} id={index} className="card w-full max-h-full  p-2">
      <div className="card-body">
      <h2 className="card-title">{bl.title}</h2>
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
    <div className='my-4'>
    For More Blogs <Link to='/blogs' className='text-2xl text-blue-500 font-thin'>Click Here</Link>
  </div>
   </div>
  )
}

export default Homs
