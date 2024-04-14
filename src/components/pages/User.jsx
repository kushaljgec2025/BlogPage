import React from "react";
import authService from "../../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
function User() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* <img src="" alt="" /> */}
      <AiOutlineUser className="text-[10vw] border-2 bg-gray rounded-full" />
      <div className="bg-gray p-4">
        <h1>{userData.name}</h1>
        <h2>{userData.email}</h2>

        <Link to="/edit-profile">Edit Profile</Link>
      </div>
    </div>
  );
}

export default User;
