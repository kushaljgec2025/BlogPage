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
    <div>
      <Link onClick={handleLogout}>
        <FiLogOut className="text-xl mr-5" />
      </Link>
    </div>
  );
}

export default LogoutBtn;
