import React from "react";
import { Container, Logoutbtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import Hamburger from "hamburger-react";
export default function Header() {
  const [isOpen, setOpen] = React.useState(false);
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
    {
      name: "Profile",
      slug: "/user",
      active: authstatus,
    },
  ];

  return (
    <Container
      className={`backdrop-filter backdrop-blur-md bg-opacity-10 fixed  top-0 left-0  z-10`}
    >
      <nav className="flex w-full items-center justify-between  py-4">
        <div className={` justify-between sm:flex ${!isOpen ? "" : "hidden"}`}>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <Logo />
          </Link>
        </div>
        <div className="sm:hidden block">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <div
          className={`sm:w-[50vw]  ${isOpen ? "w-full " : " hidden"} sm:block`}
        >
          <ul className="flex w-full items-center  shadow-md bg-white px-4 py-2  rounded-full justify-between">
            {navItem.map((item, index) => {
              return item.active ? (
                <NavLink
                  to={item.slug}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-slate-300 sm:w-[20%] w-[30%]  rounded-full text-gray font-bold"
                      : " text-gray sm:w-[20%] w-[30%] hover:font-semibold transition-all duration-200"
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
