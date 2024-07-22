import appwriteService from "../appwrite/DB_service";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const isAuther = post && (userData ? post.userid === userData.$id : false);
  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then(async (post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch((err) =>
          console.log("error in fetching post :: Post.jsx :: Pages", err)
        );
    } else {
      navigate("/");
    }
  }, [slug]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  const [postImage, setPostImgae] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  if (post) {
    appwriteService
      .getFilePreview(post.featuredimage)
      .then((url) => {
        if (url) {
          setPostImgae(url.href);
        } else {
          console.log("url nhi milra!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    appwriteService
      .getFileDownload(post.featuredimage)
      .then((url) => setDownloadLink(url.href));
  }

  return post ? (
    <div className="my-3 p-2 flex items-center justify-center">
      <Container className="sm:w-[80vw] w-[90vw] overflow-hidden ">
        <div className="w-full flex justify-center mb-4 relative border rounded-t-xl p-4 ">
          <Link to={downloadLink} className="w-full">
            <img
              src={postImage || ""}
              alt={post.title}
              className="rounded-t-xl w-full h-full object-cover"
              title="Click to download..."
            />
          </Link>

          {isAuther && (
            <div className="absolute right-1 top-1 bg-black/20 backdrop-blur-lg  rounded-xl px-4 py-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-black" className="mr-3">
                  Edit <i className="ri-tools-line"></i>
                </Button>
              </Link>
              <Button
                bgColor="bg-white"
                textColor="text-black"
                className="font-semibold"
                onClick={deletePost}
              >
                Delete <i className="ri-delete-bin-7-fill"></i>
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 p-2 rounded-b-xl backdrop-invert-0 border bg-white/10 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-xs text-gray-500 w-1/5"></p>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
