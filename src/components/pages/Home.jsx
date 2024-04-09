import React, { useEffect, useState } from "react";
import service from "../../appwrite/config";
import { Postcard, Container, Company_tag } from "../index";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  // const [Authstatus, setAuthstatus] = useState(false);
  const Authstatus = useSelector((state) => state.auth.status);
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

  if (posts.length === 0) {
    if (Authstatus) return <div>No Post Yet</div>;
    return (
      <div>
        <Company_tag />
      </div>
    );
  }
  return (
    <div className="container">
      <Container className={`new`}>
        {posts?.map((post) => (
          <Postcard key={post.$id} {...post} />
        ))}
      </Container>
    </div>
  );
}

export default Home;
