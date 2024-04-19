import React, { useState } from "react";
import service from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
function Postcard({
  $id,
  title,
  content,
  status,
  like,
  feature_img,
  userId,
  username,
}) {
  const navigate = useNavigate();
  const parsedContent = parse(content);
  const [islike, setLike] = useState(true);
  const usedata = useSelector((state) => state.auth.userData);
  let firstPTagText = "";
  if (Array.isArray(parsedContent)) {
    for (let i = 0; i < parsedContent.length; i += 2) {
      if (parsedContent[i].type === "p") {
        firstPTagText = parsedContent[i].props.children;
        break;
      }
    }
  }
  const handellike = () => {
    setLike((islike) => !islike);

    // service
    //   .updatePost($id, {
    //     like: like + 1,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return status === "active" || userId === usedata.$id ? (
    <>
      <div
        className={`${
          status === "active" ? "bg-white" : "bg-slate-300"
        } rounded-xl w-full  text-center   flex justify-start items-start md:flex-row flex-col gap-6 p-4`}
      >
        {status === "inactive" && (
          <h1 className="text-gray font-bold absolute bg-slate-300 rounded-br-lg p-2 font-mono border-b-2 shadow-xl">
            Inactive post
          </h1>
        )}
        <Link to={`/post/${$id}`} className="md:max-w-[20vw] w-full">
          <div className="w-full group">
            <img
              src={
                feature_img
                  ? service.getFile(feature_img)
                  : "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt={title}
              className="  w-full group aspect-square object-cover rounded-xl"
            />
          </div>
        </Link>
        <div className=" md:h-[20vw] flex flex-col justify-between">
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
          <div className="flex sm:flex-row flex-col  gap-4 justify-between ">
            <div>
              <button className="flex flex-col  gap-2 bg-slate-300 p-2 rounded-md shadow-lg ">
                <div className="flex justify-center items-center gap-2 ">
                  <AiOutlineUser className="border-2 border-blue text-blue rounded-full text-xl" />

                  <p className="text-blue text-xs">
                    {username.substring(0, 10) + "..." || "Anonymus"}
                  </p>
                </div>
              </button>
            </div>
            <div className="basis-1/3  flex gap-2 justify-evenly  ">
              <button className="btn text-xl bg-slate-300 p-2 rounded-md text-red-500 shadow-lg h-10 w-15 flex  items-center ">
                <div
                  className="hover:scale-110 duration-300"
                  onClick={handellike}
                >
                  <FaHeart
                    className={` ${islike ? "text-white" : "text-red-500"} `}
                  />
                </div>
                <p className="text-xs ml-2  text-gray"> {0 + !islike}</p>
              </button>
              <button className="btn text-xl bg-slate-300 p-2 rounded-md text-blue shadow-lg h-10 w-15 flex  items-center ">
                <div className="hover:bg-blue hover:rounded-full p-1 hover:text-white hover:text-xl duration-500">
                  <AiOutlineComment />
                </div>
                <p className="text-xs ml-2 text-gray"> {0}</p>
              </button>
              <button className="btn text-xl bg-slate-300 p-2 rounded-md text-slate-700 shadow-lg h-10 w-15 flex  items-center ">
                <div>
                  <AiOutlineEye />
                </div>
                <p className="text-xs ml-2 text-gray"> {0}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default Postcard;
