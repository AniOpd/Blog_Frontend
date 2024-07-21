import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import { setBlogs,setMyBlogs} from '../redux/Blog/blogSlice.js'
import axios from 'axios'

function Homs() {
  const dispatch = useDispatch();
  const {blogs} = useSelector(state=>state.blog);
  const user = useSelector(state=>state.auth.user);
  const blog = [];
  const url=import.meta.env.VITE_BASE_URL;


  const fetchBlogs = async()=>{
    try{
      const res = await axios.get(`${url}blogs/getblogs`);
      dispatch(setBlogs(res.data.blogs));
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
    <div className='flex gap-4 flex-wrap justify-center items-center my-10 w-screen p-3'>
      {blogs.map((bl,index)=>(index<6 &&
          <div  key={index} id={index} className="card p-2 bg-base-100 md:w-1/3 h-96 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">{bl.title}</h2>
          <p>{bl.content.slice(0,20)}{bl.content.length>20?"...":""}</p>
        </div>
        <figure>
          <img
          className='w-full h-full'
            src={bl.image}
            alt={bl.title} />
        </figure>
      </div>
      ),)}
    </div>
  )
}

export default Homs
