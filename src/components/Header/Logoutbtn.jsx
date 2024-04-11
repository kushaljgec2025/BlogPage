import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        console.log("Logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        // Handle error if needed
      });
  };

  return (
    <div className=" rounded-full bg-slate-300 text-red-400 p-3 font-bold ring-red-500 ring-1 ">
      <Link
        onClick={handleLogout}
        className=" flex justify-center items-center"
      >
        <FiLogOut className="text-xl  " />
      </Link>
    </div>
  );
}

export default LogoutBtn;
