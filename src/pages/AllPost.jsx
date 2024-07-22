import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/DB_service";
import authSlice from "../../store/authSlice";
import { useSelector } from "react-redux";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector((state) => state.userData);
  useEffect(() => {
    setCurrentUser(user);
    appwriteService
      .listPosts()
      .then((posts) => posts && setPosts(posts.documents))
      .catch((err) =>
        console.log("error occured in fetching posts :: AllPost.jsx ::" + err)
      );
  }, []);
  const filteredPosts = posts.filter(post => post.userid === currentUser.$id);
  return (
    <div className="w-full p-4">
      <Container>
        <div className="flex flex-wrap gap-3 items-center justify-center">
        {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <div
            className="w-[90vw] p-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
            key={post.$id}
          >
            <PostCard {...post} />
          </div>
        ))
      ) : (
        <h2 className="text-4xl text-center w-full font-sans font-bold px-4 py-2 rounded">
          No posts available, Create post now 😇👑
        </h2>
      )}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
