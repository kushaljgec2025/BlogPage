import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input } from "../components/index";
import { useForm } from "react-hook-form";
import { Bg } from "../components/index";
import { Company_tag } from "../components/index";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const handleSignup = async (data) => {
    setError(null);
    try {
      console.log(data);
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-row flex-wrap-reverse ">
      {" "}
      {/* <div className="relative top-0 right-0">
        <Bg />
      </div> */}
      <Company_tag />
      <div className=" m-auto ring-1 ring-slate-300 bg-white text-gray p-6  rounded-lg  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:w-[30vw]  inset-0 ">
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

        {error && <p className="text-red-500">{error}</p>}
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
            <Button type="submit">Signup</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
