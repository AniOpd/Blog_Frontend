import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Page from "./component/Page";
import AllBlogs from "./component/AllBlogs.jsx";
import CreateBlog from "./component/CreateBlog.jsx";
import MyBlogs from "./component/MyBlogs.jsx";
import Profile from "./component/Profile.jsx";
import Home from "./component/Homs.jsx";
import ForgotPass from "./component/ForgotPass.jsx";
import ResetPass from "./component/ResetPass.jsx";
import EditBlog from "./component/EditBlog.jsx";

import store from './redux/store.js'
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/page/:postId" element={<Page />} />
      <Route path="/blogs" element={<AllBlogs />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/my-blogs" element={<MyBlogs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/editBlog" element={<EditBlog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
