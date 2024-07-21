import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const {user} = useSelector(state=>state.auth);
  const {token} = useSelector(state=>state.auth);
 const url=import.meta.env.VITE_BASE_URL;
 const [profile,setProfile] = useState("");

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await axios.post(`${url}user/getuser`,{user,token});
        setProfile(res.data.user);
      }catch(error){
        console.log(error);
      }
    }
    fetchUser();
  },[])

  return (
    <div className='w-full '>
      <div className='card'>
        <div className='card-body flex justify-center items-center md:w-1/3'>
          <h2 className='card-title'>Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
