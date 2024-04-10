import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
function Postcard({ $id, title, feature_img }) {
  console.log(feature_img);
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="w-[18vw] relative group  hover:scale-105 duration-500 ">
          <img
            src={
              feature_img
                ? service.getFile(feature_img)
                : "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={title}
            className="w-[20vw] group aspect-square object-cover rounded-xl  "
          />
          <h2 className="text-xl group-hover:scale-105 group-hover:ring-1 group-hover:shadow-xl duration-500 font-bold absolute inset-10 flex justify-center items-center bg-black bg-opacity-30   backdrop-blur-md rounded-lg shadow-2xl ">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default Postcard;
