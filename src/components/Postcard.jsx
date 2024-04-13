import React from "react";
import service from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineUser,
  AiOutlineEye,
} from "react-icons/ai";
function Postcard({ $id, title, content, feature_img }) {
  const navigate = useNavigate();
  const parsedContent = parse(content);
  console.log(parsedContent);
  let firstPTagText = "";
  if (Array.isArray(parsedContent)) {
    for (let i = 0; i < parsedContent.length; i += 2) {
      if (parsedContent[i].type === "p") {
        firstPTagText = parsedContent[i].props.children;
        break;
      }
    }
  }

  return (
    <div className="bg-white rounded-xl w-full  flex justify-start items-start md:flex-row flex-col gap-6 p-4">
      <Link to={`/post/${$id}`} className=" grow md:max-w-sm">
        <div className="w-full group">
          <img
            src={
              feature_img
                ? service.getFile(feature_img)
                : "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={title}
            className="md:max-w-sm  w-full group aspect-square object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className="  flex flex-col justify-between">
        <div className="flex flex-col   text-start">
          <h2 className="text-xl font-bold text-blue">{title}</h2>
          {/* Display the text content of the first <p> tag */}
          <div className="text-md text-gray text-wrap ">
            {firstPTagText.substring(0, 200) ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi temporibus ipsam illo optio alias incidunt doloribus quia quae vero hic fugiat nesciunt, sunt illum, facilis aliquid maxime nam quibusdam magnam?"}
            ...
            <span
              className="text-blue cursor-pointer"
              onClick={() => {
                navigate(`/post/${$id}`);
              }}
            >
              read more
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div>
            <h1 className="text-blue text-left">Author</h1>
            <button className="flex flex-col  gap-2 bg-slate-300 p-2 rounded-md shadow-lg">
              <div className="flex">
                <AiOutlineUser />

                <p>User</p>
              </div>
            </button>
          </div>
          <div className="flex gap-2 justify-around md:justify-normal">
            <button className="btn text-xl bg-slate-300 p-2 rounded-md text-blue shadow-lg">
              <AiOutlineLike />
            </button>
            <button className="btn text-xl bg-slate-300 p-2 rounded-md text-blue shadow-lg">
              <AiOutlineComment />
            </button>
            <button className="btn text-xl bg-slate-300 p-2 rounded-md text-blue shadow-lg">
              <AiOutlineEye />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postcard;
