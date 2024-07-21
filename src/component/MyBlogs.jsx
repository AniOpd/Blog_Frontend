import React from 'react'
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

function MyBlogs() {
  const myBlogs = useSelector(state=>state.blog.myBlogs);


  if(myBlogs.length === 0){
    return <h1 className='text-3xl font-bold text-center my-5'>No Blogs Found</h1>
  }


  return (
    <div>
        <div className='flex gap-4 flex-wrap justify-center items-center'>
    {myBlogs.map((bl,index)=>(
    <Link to={`/page/${bl._id}`} className=" bg-base-100 md:w-1/3 h-96 shadow-xl w-full rounded-md hover:scale-110" key={index}>
        <div  key={index} id={index} className="card max-w-full max-h-full  p-2">
      <div className="card-body">
        <h2 className="card-title">{bl.title}</h2>
        <p>{bl.content}</p>
      </div>
      <figure>
        <img
          src={bl.image}
          alt={bl.title} />
      </figure>
    </div>
    </Link>
    ),)}
  </div>
    </div>
  )
}

export default MyBlogs
