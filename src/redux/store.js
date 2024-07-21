import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/authSlice.js'
import blogReducer from './Blog/blogSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
})