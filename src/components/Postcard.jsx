import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
function Postcard({ $id, title, feature_img }) {
  console.log(feature_img);
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div>
          <img
            src={service.getFile(feature_img)}
            alt={title}
            className="w-[20vw] aspect-square object-cover rounded-xl ring-2 ring-gray-600 "
          />
          <h2 className="text-xl font-bold text-gray-700 ">{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default Postcard;
