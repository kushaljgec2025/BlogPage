import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "../components/index";
import { useForm } from "react-hook-form";
import { Company_tag } from "../components/index";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError(null);
    try {
      const session = await authService.login(data);
      if (session) {
        const userdata = await authService.getCurrentUser();

        userdata
          ? dispatch(authLogin({ userData: userdata }))
          : setError("User data not found");
        // navigate("/login/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-row flex-wrap-reverse ">
      <Company_tag className="hidden md:block" />
      <div className="ring-1 ring-slate-300 p-6 bg-white text-gray rounded-lg  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:w-[30vw] m-auto ">
        <div>
          <h2 className="font-bold text-3xl">Log in</h2>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value) ||
                    "Invalid email address",
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
          </div>
          <Button className="bg-slate-300 " type="submit">
            Log in
          </Button>
          <div
            className="bg-slate-300 flex justify-center items-center gap-4 px-2 py-1 rounded-full mx-2 cursor-pointer"
            onClick={() => {
              authService.googleauth();
            }}
          >
            <FcGoogle size={32} />
            <p>Log in with Google</p>
          </div>

          <p>
            <h2>Have not any Account</h2>
            <Link to="/signup" className="text-cyan-600">
              {" "}
              Create Account ?
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
