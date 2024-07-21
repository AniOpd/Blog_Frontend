import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: [],
        blog: "",
        myBlogs: []
    },
    reducers:{
        setBlogs: (state,action)=>{
            state.blogs = action.payload;
        },
        setBlog: (state,action)=>{
            state.blog = action.payload;
        },
        clearBlog: (state)=>{
            state.blog = null;
        },
        setMyBlogs: (state,action)=>{
            state.myBlogs = action.payload;
        },
        deleteBlog: (state,action)=>{
            state.blogs = state.blogs.filter((blog)=>blog._id!==action.payload);
            state.myBlogs = state.myBlogs.filter((blog)=>blog._id!==action.payload);
        }
    }
});

export const {setBlogs,setBlog,clearBlog,setMyBlogs} = blogSlice.actions;

export default blogSlice.reducer;