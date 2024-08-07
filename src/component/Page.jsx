import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { setBlog, deleteBlog } from "../redux/Blog/blogSlice.js";
import axios from "axios";

function Page() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const previousLocation = location.state?.from || "/blogs"; // Use previous location if available, otherwise default
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const post = useSelector((state) => state.blog.blog);
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.post(`${url}blogs/getblog`, { id: postId });
        dispatch(setBlog(res.data));
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    fetchPost();
  }, [dispatch, navigate, postId, url]);

  const isAuthor = post && user ? post.userId === user : false;

  const handleDelete = async () => {
    try {
      const res = await axios.post(`${url}blog/deleteblog`, { id: postId, token });
      alert(res.data.message);
      dispatch(deleteBlog(postId));
      navigate(previousLocation);
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = post.date ? new Date(post.date).toDateString() : new Date().toDateString();
  const formattedTime = post.date ? new Date(post.date).toLocaleTimeString() : new Date().toLocaleTimeString();

  return (
    <div className="flex justify-center items-center h-full p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 md:w-10/12 w-full">
        {post.image && (
          <div className="flex justify-center mb-4">
            <img src={post.image} alt={post.title} className="w-11/12 h-auto max-h-96 rounded-lg object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-4 flex justify-between">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
          {post.author && <span>By {post.author}</span>}
        </div>
        <div className="prose max-w-full mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="flex justify-between">
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
            onClick={() => navigate(previousLocation)}
          >
            Go Back
          </button>
          {isAuthor && (
            <div className="flex gap-4">
              <Link to={`/editBlog/${postId}`}>
                <button className="btn bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-200">Edit</button>
              </Link>
              <button
                className="btn bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
