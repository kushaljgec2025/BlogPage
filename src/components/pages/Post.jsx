import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { TbEditCircle } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Loder from "../Loader";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineUser,
  AiOutlineEye,
} from "react-icons/ai";

export default function Post() {
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [post, setPost] = useState(null);
  const [imghref, setImghref] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      try {
        service.getPost(slug).then((post) => {
          if (post) {
            setLoading(false);
            setPost(post);

            getfile(post?.feature_img);
          } else navigate("/");
        });
      } catch (err) {
        console.log(err);
      }
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletepost(post.$id).then((status) => {
      if (status) {
        if (post.feature_img !== null) service.deleteFile(post.feature_img);
        navigate("/");
      }
    });
  };
  const getfile = async (img_id) => {
    try {
      if (img_id) {
        const file = await service.getFileOriginal(img_id);

        setImghref(file.href);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlelike = () => {
    setLike((like) => !like);
  };
  if (loading)
    return (
      <div>
        <Loder />
      </div>
    );
  return post ? (
    <div className="mb-4 w-full ">
      <div className="flex flex-col justify-center items-center">
        <div className="md:w-full w-[90vw] flex justify-center mb-8 relative border bg-white backdrop-blur-md bg-opacity-20 rounded-xl p-2">
          <img
            src={
              imghref ||
              "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={post.title}
            className="rounded-xl aspect-[7/4] object-cover w-full h-full"
          />

          {/* <h1>{service.getFileOriginal(post.feature_img)}</h1> */}
          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-4 ">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="bg-gray hover:bg-slate-700 duration-300 w-20  flex items-center justify-evenly  py-2 rounded-lg">
                  Edit <TbEditCircle />
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="bg-red-400 hover:bg-red-500 duration-300 flex w-20 items-center justify-evenly  py-2 rounded-lg"
              >
                Delete
                <MdDeleteOutline />
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 bg-white text-gray p-10 rounded-lg">
          <h1 className="text-3xl font-bold text-blue my-4">{post.title}</h1>
          <h1 className="text-left text-blue flex justify-start items-center gap-4  ">
            Author :
            <AiOutlineUser />
            {post.username || "Anonymus"}
          </h1>
          <div className="sm:w-full text-left w-[70vw]">
            {parse(post.content)}
          </div>
          <div className="basis-1/3  flex gap-2 justify-evenly  ">
            <button
              className="btn text-xl bg-slate-300 p-2 rounded-md text-red-500 shadow-lg h-10 w-15 flex  items-center "
              onClick={handlelike}
            >
              <div className="hover:scale-110 duration-300">
                <FaHeart
                  className={` ${!like ? "text-white" : "text-red-500"} `}
                />
              </div>
              <p className="text-xs ml-2  text-gray"> {0 + like || 0}</p>
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
  ) : null;
}
