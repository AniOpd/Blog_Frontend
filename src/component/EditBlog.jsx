import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../redux/Auth/authSlice";

function EditBlog() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(null);
  const url=import.meta.env.VITE_BASE_URL;
  const post = useSelector((state) => state.blog.blog);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cac0ebhc");
    data.append("cloud_name", "dw9evtmee");
    const imguri=image? await fetch("https://api.cloudinary.com/v1_1/dw9evtmee/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
       return data.url;
      })
      .catch((err) => {
        return null;
      }):null;


    try {
      const res = await axios.put(`${url}blog/updateblog`, {
        id: post._id,
        title,
        content,
        image: imguri?imguri:post.image,
        token,
        userId: user,
      });
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (e) {
        if(e.response.message==='Unauthorized'){
          dispatch(logout());
          navigate('/login');
        }else{
            alert("Error: Server Error");
        }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full my-5">
      <h1 className="text-5xl font-bold my-5">Create Blog</h1>
      
      <div className="md:w-1/2 w-full flex justify-center items-center p-5 flex-col bg-gray-300 h-full rounded-2xl">
      { (
        <img
          className="w-2/3 "
          src={image ? URL.createObjectURL(image) : post.image}
          alt="preview"
          style={{ height: "200px" }}
        />
      )}
        <form onSubmit={handleSubmit} className="md:w-2/3 w-full flex flex-col justify-center items-center">
          <div className="form-group w-full">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control w-full" id="title" defaultValue={post.title}/>
          </div>
          <div className="form-group w-full">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control w-full"
              id="content"
              rows="3"
               defaultValue={post.content} 
            ></textarea>
          </div>
          <div className="form-group w-full">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control w-full"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
