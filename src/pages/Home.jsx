import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/DB_service";
import authSlice from "../../store/authSlice";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth_service";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [errorIs, setError] = useState("");

  const status = useSelector((state) => state.status);

  useEffect(() => {
    status ? setIsLogin(status) : null;

    appwriteService
      .listPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((err) => setError(err));
  }, []);
  
// ===========/////////danger///////////=========

  // posts.map((post) => {
  //  try {
  //  appwriteService.deleteFile(post.slug);
  //  appwriteService.deletePost(post.$id);
  //  console.log("done everything clear now!")
  //  } catch (error) {
  //  console.error(error, " in deleting all files");
  //  }})
  
  
  return (
    <div className="w-full p-4 relative">
      <Container>
        <div className="flex items-center justify-center flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                className="p-2 w-[90vw] sm:w-1/2 md:w-1/3 lg:w-1/4 "
                key={post.$id}
              >
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <h2 className="text-4xl text-center w-full font-sans font-bold px-4 py-2 rounded">
              Nothing to see,{" "}
              {isLogin ? "Create post now 😇👑 " : "Login please 😇👑"}
            </h2>
          )}
          {errorIs ? (
            <p className="px-4 py-2 text-red-600 font-semibold text-xl bg-white/30 rounded-lg fixed bottom-4 left-1/2">
              {errorIs}
              {setTimeout(() => {
                setError("");
              }, 1200)}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default Home;
