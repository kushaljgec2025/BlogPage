import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input } from "../components/index";
import { useForm } from "react-hook-form";
import { Bg } from "../components/index";
import { Company_tag } from "../components/index";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const handleSignup = async (data) => {
    setError(null);
    try {
      const user_data = await authService.createAccount(data);
      if (user_data) {
        const userdata = await authService.getCurrentUser();
        if (userdata) {
          dispatch(login({ userData: userdata }));
          navigate("/login"); // Navigate to the login page after successful signup
        } else {
          setError("User data not found");
        }
      }
      toast("Suncessfully created account", { type: "success" });
    } catch (error) {
      toast(error.message, { type: "error" });
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-row flex-wrap-reverse ">
      {" "}
      <ToastContainer autoClose={4000} />
      {/* <div className="relative top-0 right-0">
        <Bg />
      </div> */}
      <Company_tag className="hidden md:block" />
      <div className=" m-auto  ring-1 ring-slate-300 bg-white text-gray p-6  rounded-lg  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:w-[30vw]  inset-0 ">
        <div>
          <h2 className="font-bold text-3xl">Create Account</h2>
        </div>
        <p className="text-sm">
          Already have one ?{" "}
          <Link to="/login" className="text-cyan-600">
            {" "}
            Login{" "}
          </Link>
        </p>

        <form onSubmit={handleSubmit(handleSignup)}>
          <div>
            <Input
              label="Name"
              type="text"
              placeholder="Enter your Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit">Sign up</Button>
            <div
              className="bg-slate-300 flex justify-center items-center gap-4 px-2 py-1 rounded-full mx-2 cursor-pointer"
              onClick={() => {
                authService.googleauth();
              }}
            >
              <FcGoogle size={32} />
              <p>Create account with Google</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
