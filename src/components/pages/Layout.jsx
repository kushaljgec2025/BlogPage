import React from "react";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import authService from "../../appwrite/auth";
import { login, logout } from "../../store/authSlice";
import { Signup, Bg } from "../index";

import { Outlet } from "react-router-dom";

function Layout() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userDate) => {
        if (userDate) {
          dispatch(login({ userData: userDate }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    !loading && (
      <div className="hero flex flex-col items-center w-[100vw] min-h-screen ">
        <Header />
        <div className="flex flex-col w-[80%] h-full mt-[12vh] lg:mt-[16vh] justify-normal items-center  ">
          <main className=" w-full flex justify-center items-center md:block ">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    )
  );
}

export default Layout;
