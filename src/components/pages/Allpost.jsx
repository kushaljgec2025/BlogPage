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
    <div>
      <Container className="justyfy-around">
        <div className="w-full flex flex-row justify-between items-center">
          {posts.map((post) => (
            <div key={post.$id} className="block">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allpost;
