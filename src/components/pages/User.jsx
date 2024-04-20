import React, { useState, useEffect } from "react";
import authService from "../../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { BsFilePostFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import service from "../../appwrite/config";
import { Postcard, Container } from "../index";
import Logoutbtn from "../Header/Logoutbtn";
import Loader from "../Loader";
function User() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post_no, setPost_no] = useState(0);
  useEffect(() => {
    get_User_posts();
  }, []);
  const get_User_posts = async () => {
    try {
      const user_posts = await service.getPostswithquery({
        query: ["userId", userData.$id],
      });
      setUserPosts(user_posts.documents);
      setPost_no(user_posts.total);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    // console.log(user_posts);
  };
  // console.log(userData);
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!loading)
    return (
      <div className="w-[80vw] flex flex-col justify-center items-center">
        {/* <img src="" alt="" /> */}
        <div className="my-4">
          <AiOutlineUser className="text-[10vw] border-2 bg-gray rounded-full" />
        </div>
        <div className="bg-white text-gray w-full flex flex-col  gap-6 p-4 rounded-xl">
          <h1 className="text-4xl font-mono font-bold">{userData.name}</h1>
          <div className="flex w-full justify-around items-center ">
            <div className="flex flex-col items-center justify-center">
              <BsFilePostFill className="my-2" />
              {post_no} Posts
            </div>
            <div className="flex flex-col items-center justify-center">
              <FaUserFriends />
              Follower
            </div>
            <div className="flex flex-col items-center justify-center">
              <RiUserFollowFill />
              Following
            </div>
          </div>
          <div className="flex flex-row w-full flex-wrap gap-4 justify-around "></div>{" "}
          {userPosts?.map((post) => (
            <div
              key={post.$id}
              className=" bg-slate-200 text-gray rounded-xl grow-1 shrink-0 "
            >
              <Postcard {...post} />
            </div>
          ))}
        </div>
        {userData && (
          <li className="">
            <Logoutbtn />
          </li>
        )}
      </div>
    );
}

export default User;
