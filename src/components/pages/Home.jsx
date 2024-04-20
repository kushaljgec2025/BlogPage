import React, { useEffect, useState } from "react";
import service from "../../appwrite/config";
import { Postcard, Container, Company_tag } from "../index";
import { useSelector } from "react-redux";
import Loader from "../Loader";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [Authstatus, setAuthstatus] = useState(false);
  const Authstatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    service
      .getPosts()
      .then((response) => {
        setPosts(response.documents);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(posts);
  if (!Authstatus)
    return (
      <div>
        <Company_tag />
      </div>
    );

  if (loading && Authstatus)
    return (
      <div>
        <Loader />
      </div>
    );
  if (posts.length === 0 && Authstatus) {
    return <div>No Post Yet</div>;
  } else
    return (
      <div className="container ">
        <div className="flex flex-col justify-center items-center gap-10">
          {posts?.map((post) => (
            <Postcard key={post?.$id} {...post} />
          ))}
        </div>
      </div>
    );
}

export default Home;
