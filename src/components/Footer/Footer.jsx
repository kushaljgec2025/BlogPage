import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  FaXTwitter,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaCodeBranch,
} from "react-icons/fa6";
function Footer() {
  const Authstatus = useSelector((state) => state.auth.status);
  {
    if (!Authstatus) return null;
  }
  return (
    <div className="footer w-full  mt-10 bg-gray bg-opacity-25 flex justify-around items-center p-4  backdrop-blur-md transparent rounded-t-lg">
      <p>
        <span>&#169;</span> Copyright 2024 kg_codex All rights reserved
      </p>
      <div className="flex gap-4 bg-white p-2 rounded-lg text-gray">
        <Link to="https://github.com/kushaljgec2025" className=" text-xl">
          <FaGithub />
        </Link>
        <Link to="https://twitter.com/kg_codex2" className=" text-xl">
          <FaXTwitter />
        </Link>
        <Link to="https://www.facebook.com/kggibesup" className=" text-xl">
          <FaFacebook />
        </Link>
        <Link
          to="https://www.instagram.com/stories/kishueal/"
          className=" text-xl"
        >
          <FaInstagram />
        </Link>
      </div>
      <div>
        <Link
          to="https://github.com/kushaljgec2025/BlogPage"
          className="flex justify-center items-center gap-2 bg-white text-gray p-2 rounded-lg hover:bg-slate-500 hover:text-white duration-300"
        >
          Show your love here
          <span>
            <FaStar className="text-yellow-400" />
          </span>
          <span>
            <FaCodeBranch />
          </span>
        </Link>
        <div></div>
      </div>
    </div>
  );
}

export default Footer;
// import React from "react";

// function Footer() {
//   return <div>Footer</div>;
// }

// export default Footer;
