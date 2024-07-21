import React,{useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../redux/Auth/authSlice'

function Register() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const url=import.meta.env.VITE_BASE_URL;

    const handleSubmit = (e)=>{
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value.toLowerCase()
        const password = e.target.password.value

        axios.post(`${url}user/register`,{name,email,password})
        .then(res=>{
           dispatch(register({user: res.data.user, token: res.data.token}));
           alert(res.data.message);
           setInterval(()=>{
              navigate('/')
           },2000)
        })
        .catch(err=>{
            console.log(err)
             e.target.reset()
        })
    }
  return (
    <div className='h-screen flex justify-center items-center p-5'>
      <form action="submit" onSubmit={handleSubmit} className='flex justify-center w-full'>
        <div className='flex md:w-1/2 w-full flex-col justify-center items-center p-14 bg-gray-300 rounded-xl'>
        <div className="form-control w-full p-2 flex flex-row gap-3">
          <label htmlFor="name">Name</label>
          <input className=' outline-none border-b-2 border-gray-400  flex-1 bg-transparent w-full' type="text" id="name" name="name" required />
        </div>
        <div className="form-control w-full p-2 flex flex-row gap-3">
          <label htmlFor="email">Email</label>
          <input className=' outline-none border-b-2 border-gray-400  flex-1 bg-transparent w-full' type="email" id="email" name="email" required />
        </div>
        <div className="form-control w-full p-2 flex flex-row gap-3">
          <label htmlFor="password">Password</label>
          <input className=' outline-none border-b-2 border-gray-400  flex-1 bg-transparent w-full' type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="btn w-1/2 mt-5">Register</button>
        <a href="/login" className='text-blue-500 mt-5'>Already have an account? Login</a>
        </div>
      </form>
    </div>
  )
}

export default Register
