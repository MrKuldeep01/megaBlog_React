import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/DB_service";
import authSlice from "../../store/authSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLogin,setIsLogin] = useState(false);
  
  useEffect(() => {

    appwriteService
      .listPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((err) =>
        console.log("error occured in fetching posts :: Home.jsx :: pages => ",err)
      );
  },[]);
  if (posts.length < 1) {
    return (
      <div className="w-full p-4 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap items-center">
            <h2 className="text-4xl text-center w-full font-sans font-bold px-4 py-2 rounded">
              Nothing to see Create a post first .
            </h2>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full p-4">
      <Container>
        <div className="flex items-center justify-center flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-[90vw] sm:w-1/2 md:w-1/3 lg:w-1/4 " key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
