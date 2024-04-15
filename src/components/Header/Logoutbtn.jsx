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
    <div
      className="   bg-red-400 hover:bg-red-500 duration-300 px-6 py-2 rounded-md my-2 font-bold cursor-pointer   "
      onClick={handleLogout}
    >
      <Link className=" flex justify-center items-center gap-4">
        Logout
        <FiLogOut className="text-xl  " />
      </Link>
    </div>
  );
}

export default LogoutBtn;
