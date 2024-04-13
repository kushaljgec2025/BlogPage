import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Authlayout, Login } from "./components/index.js";
import Createaccount from "./components/pages/Createaccount.jsx";
import Addpost from "./components/pages/Addpost.jsx";
import Editpost from "./components/pages/Editpost.jsx";
import Home from "./components/pages/Home.jsx";
import Loginaccount from "./components/pages/Loginaccount.jsx";
import Post from "./components/pages/Post.jsx";
import AllPost from "./components/pages/Allpost.jsx";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Createaccount />
          </Authlayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Authlayout authentication>
            {" "}
            <AllPost />
          </Authlayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Authlayout authentication>
            {" "}
            <Addpost />
          </Authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Authlayout authentication>
            {" "}
            <Editpost />
          </Authlayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Authlayout authentication>
            {" "}
            <Post />
          </Authlayout>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
