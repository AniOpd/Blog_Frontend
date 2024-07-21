import React from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';

function ForgotPass() {
  const url=import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    try{
      const res = await axios.post(`${url}user/forgetpassword`,{email});
      if(res.request.status === 200){
        alert('Email Sent Successfully');
        navigate('/reset-password',{state:email});
      }
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className='my-14 flex flex-col justify-center items-center p-4'>
      <h1 className='text-center text-5xl font-semibold text-gray-500 my-3'>Forgot Password</h1>
      <form action="submit" onSubmit={handleSubmit} className='flex flex-col justify-center items-center p-5 h-full md:w-1/2 w-full bg-gray-300 rounded-2xl'>
        <div className='my-5 '>
          <h2 className='text-black text-3xl '>Enter Your Email to Reset Your Password</h2>
        </div>
       <div className='w-2/3 p-2 flex gap-3 my-2'>
       <label htmlFor="email">Email</label>
       <input className='bg-transparent border-b-2 border-gray-600 outline-none w-full flex-1' type="email" name="email" id="email" required />
       </div>
        <button className='btn ' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ForgotPass
