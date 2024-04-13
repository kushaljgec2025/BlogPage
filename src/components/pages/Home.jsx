import React, { useEffect, useState } from "react";
import service from "../../appwrite/config";
import { Postcard, Container, Company_tag } from "../index";
import { useSelector } from "react-redux";

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
  if (loading && Authstatus) return <div>Loading...</div>;
  if (posts.length === 0) {
    if (Authstatus) return <div>No Post Yet</div>;
    return (
      <div>
        <Company_tag />
      </div>
    );
  }
  return (
    <div className="container ">
      <div className="flex flex-col justify-center items-center gap-10">
        {posts?.map((post) => (
          <Postcard key={post.$id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
