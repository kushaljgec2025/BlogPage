import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import { Container } from "../index";
import Postform from "../Post/Postform";
function Editpost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(slug); //its not working
    if (slug) {
      service.getPost(slug).then((response) => {
        if (response.$id) {
          setPost(response);
        }
      });
    } else {
      console.log("no slug");
      navigate("/");
    }
  }, [slug, navigate]);

  return <div>{!post ? <h1>Loading...</h1> : <Postform post={post} />}</div>;
}

export default Editpost;
