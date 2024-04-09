import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { TbEditCircle } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imghref, setImghref] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);
  console.log(post);
  const deletePost = () => {
    service.deletepost(post.$id).then((status) => {
      console.log(status);
      if (status) {
        service.deleteFile(post.feature_img);
        navigate("/");
      }
    });
  };
  const getfile = async () => {
    console.log("hi");
    try {
      const file = await service.getFileOriginal(post.feature_img);
      console.log(file);
      setImghref(file.href);
    } catch (err) {
      console.log(err);
    }
  };
  getfile();
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border bg-white backdrop-blur-md bg-opacity-20 rounded-xl p-2">
          <img
            src={imghref}
            alt={post.title}
            className="rounded-3xl aspect-[8/4] object-cover w-full h-full"
          />

          {/* <h1>{service.getFileOriginal(post.feature_img)}</h1> */}
          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-4 ">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="bg-gray w-20  flex items-center justify-evenly  py-2 rounded-lg">
                  Edit <TbEditCircle />
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="bg-red-400 flex w-20 items-center justify-evenly  py-2 rounded-lg"
              >
                Delete
                <MdDeleteOutline />
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
