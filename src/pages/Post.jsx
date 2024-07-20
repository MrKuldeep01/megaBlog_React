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


  
  /*
 post is look like : {$collectionId
: 
"6686311b0009ccd8edfa"
$createdAt
: 
"2024-07-19T18:47:23.357+00:00"
$databaseId
: 
"66863068000c2c478e26"
$id
: 
"the-title-is"
$permissions
: 
Array(3)
0
: 
"read(\"user:669922510036cce33b48\")"
1
: 
"update(\"user:669922510036cce33b48\")"
2
: 
"delete(\"user:669922510036cce33b48\")"
length
: 
3
[[Prototype]]
: 
Array(0)
$tenant
: 
"161677"
$updatedAt
: 
"2024-07-19T19:05:20.773+00:00"
content
: 
""
featuredimage
: 
"669ab4b6003d3eb5e79d"
status
: 
"active"
title
: 
"the title is shi to"
userid
: 
"669922510036cce33b48"}


another one : 

{$collectionId
: 
"6686311b0009ccd8edfa"
$createdAt
: 
"2024-07-20T11:56:51.629+00:00"
$databaseId
: 
"66863068000c2c478e26"
$id
: 
"t-i-t-l-e"
$permissions
: 
(3) ['read("user:669921e7002831c9a59d")', 'update("user:669921e7002831c9a59d")', 'delete("user:669921e7002831c9a59d")']
$tenant
: 
"161677"
$updatedAt
: 
"2024-07-20T11:56:51.629+00:00"
content
: 
""
featuredimage
: 
"669ba5f4001e40bfd2af"
status
: 
"active"
title
: 
"t i t l e"
userid
: 
"669921e7002831c9a59d"}
*/
  


const [postImage, setPostImgae] = useState("");
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
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={postImage || ""}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuther && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
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
};

export default Post;
