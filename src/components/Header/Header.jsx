import React from "react";
import { Container, Logoutbtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus,
    },

    {
      name: "Register",
      slug: "/signup",
      active: !authstatus,
    },
    {
      name: "Addpost ",
      slug: "/add-post",
      active: authstatus,
    },
  ];

  return (
    <Container
      className={`backdrop-filter backdrop-blur-md bg-opacity-10 fixed  top-0 left-0  z-10`}
    >
      <nav className="flex w-full items-center justify-between  py-4">
        <div className="flex justify-between ">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <Logo />
          </Link>
        </div>
        <div className="w-[50vw] ">
          <ul className="flex w-full items-center space-x-4 shadow-md bg-white backdrop backdrop-blur-md bg-opacity-50 px-4 py-2  rounded-full justify-between">
            {navItem.map((item, index) => {
              return item.active ? (
                <NavLink
                  to={item.slug}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-slate-300 px-2 w-[20%] rounded-full text-gray font-bold"
                      : "w-[20%] text-gray hover:font-semibold transition-all duration-200"
                  }
                >
                  <p className="my-2">{item.name}</p>
                </NavLink>
              ) : null;
            })}
            {authstatus && (
              <li className="">
                <Logoutbtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Container>
  );
}
