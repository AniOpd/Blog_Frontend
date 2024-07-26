import React,{useState,useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../redux/Auth/authSlice";
import JoditEditor from 'jodit-react';

function CreateBlog() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(null);
  const editor = useRef(null);
	const [content, setContent] = useState('');
  
  const url=import.meta.env.VITE_BASE_URL;




  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cac0ebhc");
    data.append("cloud_name", "dw9evtmee");
    const imguri= await fetch("https://api.cloudinary.com/v1_1/dw9evtmee/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
       return data.url;
      })
      .catch((err) => {
        return null;
      });


    try {
      const res = await axios.post(`${url}blog/createblog`, {
        title,
        content,
        image: imguri,
        token,
        userId: user,
      });
      if (res.status === 201) {
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
    <div className="flex flex-col justify-center items-center w-full gap-4 ">
      <h1 className="text-5xl font-bold my-5">Create Blog</h1>
      
      <div className="md:w-4/5 w-full flex justify-center items-center p-5 flex-col bg-gray-300 h-full rounded-2xl">
      {image && (
        <img
          className="w-2/3 h-96"
          src={URL.createObjectURL(image)}
          alt="preview"
          style={{ height: "200px" }}
        />
      )}
        <form onSubmit={handleSubmit} className=" w-full flex flex-col justify-center items-center gap-3">
          <div className="form-group w-full ">
            <label htmlFor="title">Title</label>
            <input  type="text" className="form-control md:w-1/2 w-full" id="title" required />
          </div>
          <div className="form-group w-full">
            <label htmlFor="content">Content</label>
            <JoditEditor
			ref={editor}
			value={content}
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {setContent(newContent)}}
		/>
          </div>
          <div className="form-group w-full">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control w-full"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
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

export default CreateBlog;
