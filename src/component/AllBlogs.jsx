import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setBlogs, setMyBlogs } from '../redux/Blog/blogSlice';

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs } = useSelector(state => state.blog);
  const user = useSelector(state => state.auth.user);
  const blog = [];
  const [search, setSearch] = useState('');
  const url = import.meta.env.VITE_BASE_URL;
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 2; // Number of blogs to display per page

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${url}blogs/getblogs`);
      setAllBlogs(res.data);
      dispatch(setBlogs(res.data));
      if (user) {
        res.data.blogs.forEach((bl) => {
          if (bl.userId === user) {
            blog.push(bl);
          }
        });
      }
      dispatch(setMyBlogs(blog));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
    setSearch('');
  }, [blogs]);

  if (blogs.length === 0) {
    return (
      <div>
        <h1>No Blogs are Available</h1>
      </div>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value === '') return setAllBlogs(blogs);
    else {
      setAllBlogs(
        blogs.filter(
          (bl) =>
            bl.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            stripHtmlTags(bl.content).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // Reset to first page on search
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Get current blogs for the page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.length > 0 || search !== '' ? allBlogs.slice(indexOfFirstBlog, indexOfLastBlog) : blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allBlogs.length > 0 || search !== '' ? allBlogs.length / blogsPerPage : blogs.length / blogsPerPage);

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Search'
          className='w-1/2 p-2 m-5'
          onChange={handleSearch}
        />
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-5 m-5'>
        {currentBlogs.map((bl, index) => (
          <Link to={`/page/${bl._id}`} className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden" key={index}>
            <div className="flex flex-col h-full">
              <figure className='h-56 overflow-hidden'>
                <img
                  className='w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110'
                  src={bl.image}
                  alt={bl.title}
                />
              </figure>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="font-bold text-lg mb-2 text-gray-800">{bl.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{stripHtmlTags(bl.content).substring(0, 150)}...</p>
                <div className="mt-auto">
                  <p className="text-sm text-gray-500 mb-2">Posted by {bl.authorName || "Unknown"}</p>
                  <p className="text-sm text-gray-500">{new Date(bl.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='flex justify-center mt-5'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllBlogs;
