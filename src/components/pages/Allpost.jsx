import React, { useState, useEffect } from "react";
import service from "../../appwrite/config";
import { Postcard, Container } from "../index";

function Allpost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service
      .getPosts()
      .then((response) => {
        setPosts(response.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="">
      <div className="flex sm:flex-row flex-col sm:flex-wrap ">
        {posts.map((post) => (
          <div key={post.$id} className="sm:w-[20vw]">
            <Postcard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Allpost;
