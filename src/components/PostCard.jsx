import React, { useState } from "react";
import appwriteService from "../appwrite/DB_service";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredimage }) => {
  console.log("Post Card ::  run");

  // -------------------------
console.log($id, title, featuredimage);
  const [postImage, setPostImgae] = useState(""); 
  if (featuredimage) {
    appwriteService
      .getFilePreview(featuredimage)
      .then((url) => {
        if (url) {
          setPostImgae(url.href);
        } else {
          console.log("url nhi milra! :: postcard 21");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ----------

  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div className="w-full bg-gray-800/60 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img src={postImage} alt={title} className="rounded-lg" />
        </div>
        <h2 className="text-2xl font-semibold ">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
