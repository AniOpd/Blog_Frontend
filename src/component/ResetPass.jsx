import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ResetPass() {
  const location = useLocation();
  const Email = location.state;
  const navigate = useNavigate();
  const url=import.meta.env.VITE_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(`${url}user/resetpassword`, { otp, password, email: Email });
      if (res.request.status === 200) {
        alert('Password reset successfully');
        navigate('/login');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  }


  return (
    <div className='flex flex-col justify-center items-center p-10 w-full h-full '>
      <h1 className='text-4xl text-black font-semibold my-6'>Reset Password</h1>
      <form action="submit" onSubmit={submitHandler} className='flex flex-col justify-center items-center md:w-1/2 w-full p-3 bg-gray-200 rounded-xl'>
        <div className='flex gap-3 text-2xl my-3 w-full'>
          <label htmlFor="otp">OTP</label>
          <input className='flex-1 bg-transparent border-b-2 border-gray-500 outline-none w-full' type='text' name="otp" id="otp" required />
        </div>
        <div className='flex gap-3 text-2xl my-3 w-full'>
          <label htmlFor="password">Password</label>
          <input className='flex-1 bg-transparent border-b-2 border-gray-500 outline-none w-full' type="password" name="password" id="password" required />
        </div>
        <button className='btn' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ResetPass
