import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Signup from "./components/Signup";
import Bg from "./components/Bg";

import "./App.css";

import { Outlet } from "react-router-dom";
import Layout from "./components/pages/Layout";

function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
