import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

// rest of the code

function Company_tag({ className }) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div
      className={`company ${className}  lg:basis-1/2 text-white bg-black flex flex-col justify-center items-center gap-4 py-4 backdrop backdrop-blur-sm bg-opacity-40 rounded-lg px-8`}
    >
      <div className="company space-y-10 ">
        <div>
          <h1 className="company text-3xl">
            Welcome to <span className="text-blue  font-bold">ZenWrit</span>
          </h1>
        </div>
        <div className="">
          <TypeAnimation
            sequence={[
              "Explore",
              1000,
              "Discover",
              1000,
              "Learn",
              1000,
              "Create",
              1000,
            ]}
            wrapper="span"
            speed={10}
            style={{ fontSize: "3em", display: "inline-block" }}
            repeat={Infinity}
          />
        </div>
        <div>
          <p className=" text-wrap text-center">
            we're passionate about sharing knowledge, sparking curiosity, and
            fostering creativity. Whether you're a seasoned enthusiast or just
            starting to delve into new interests, our blog is your gateway to
            insightful articles, inspiring stories, and practical tips.
          </p>
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="flex justify-center">
          <Link
            className="group bg-blue hover:bg-sky-400 py-2 px-4 my-6 rounded-lg flex items-center duration-500"
            to="/signup"
          >
            Get Started
            <span className="ml-2 group-hover:translate-x-2 transition duration-500 ease-in-out">
              <FaArrowRight className="" />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Company_tag;
