import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {login} from '../redux/Auth/authSlice.js'
import { useDispatch} from 'react-redux'
import axios from 'axios'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url=import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value.toLowerCase()
        const password = e.target.password.value
        try{
            const res = await axios.post(`${url}user/login`,{email,password})
                dispatch(login({user:res.data.user,token:res.data.token}));
                alert(res.data.message);
                e.target.reset();
                navigate('/');
        }catch(err){
            alert(err.response.data.message);
        }
    }


  return (
    <div className='h-full flex justify-center items-center w-full my-40 mx-2'>
      <form action="submit" onSubmit={handleSubmit} className='flex flex-col justify-center items-center md:p-14 md:w-1/2 w-full bg-gray-300 rounded-2xl p-2'>
        <div className='flex flex-row gap-3 text-2xl w-full p-2'>
            <label htmlFor="email">Email</label>
            <input className='flex-1 border-b-2 border-gray-500 outline-none bg-transparent w-full ' type="email" id="email" name="email" required />
        </div>
        <div className='flex flex-row gap-3 text-2xl w-full p-2'>
            <label htmlFor="password">Password</label>
            <input className='flex-1 border-b-2 border-gray-500 outline-none bg-transparent w-full' type="password" id="password" name="password" required />
        </div>
        <button type="submit" className='btn w-1/2 mt-4'>Login</button>
        <Link to='/forgot-password' className='text-sm mt-5 text-blue-600' >Forgot Password</Link>

      </form>
    </div>
  )
}

export default Login
