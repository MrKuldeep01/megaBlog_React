import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/DB_service";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          }
        })
        .catch((err) =>
          console.log(
            "error occured in fetching post in :: EditPost :: getPost form appwrite DB service" +
              err
          )
        );
    } else {
      navigate("/");
    }
  }, [slug]);
console.log("edit page ");
  return post && (
    <div className="p-4">
      <Container>
          <h2 className=" text-center text-slate-900 px-4 py-2 rounded font-semibold text-4xl">
            Edit Post
          </h2>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
