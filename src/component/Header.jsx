import React,{useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import {logout} from '../redux/Auth/authSlice.js'

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(()=>{
        if(user){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
        }
    },[user])

    const list=[
        {name: "Home", link: "/", show: true},
        {name: "Login", link: "/login",show: !isAuthenticated},
        {name: "Register", link: "/register" ,show: !isAuthenticated},
        {name: "All Blogs", link: "/blogs",show: true},
        {name: "Create Blog", link: "/create-blog",show: isAuthenticated},
        {name: "My Blogs", link: "/my-blogs",show: isAuthenticated},
        {name: "Profile", link: "/profile",show: isAuthenticated},
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/')
    }

  return (
    <>
      <div className="navbar bg-gray-300 sticky top-0 z-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
             {
                list.map((item,index)=>{
                    return item.show && <Link to={item.link} key={index}><li key={index} className="menu-title hover:bg-yellow-400 hover:text-black rounded-lg "> {item.name}</li></Link>
                })
            }
            {
              isAuthenticated && <li onClick={logoutHandler} className="menu-title hover:bg-yellow-400 hover:text-black rounded-lg cursor-pointer">Logout</li>
            }
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-end">
        <div className="navbar-center hidden lg:flex lg:mr-8">
          <ul className="menu menu-horizontal px-1">
            {
                list.map((item,index)=>{
                    return item.show && <Link to={item.link} key={index}><li key={index} className="menu-title hover:bg-yellow-400 hover:text-black rounded-lg "> {item.name}</li></Link>
                })
            }
            {
              isAuthenticated && <li onClick={logoutHandler} className="menu-title hover:bg-yellow-400 hover:text-black rounded-lg cursor-pointer">Logout</li>
            }
          </ul>
        </div>
        </div>
      </div>
    </>
  );
}

export default Header;
