import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { postsService } from "../api/appwrite";
import { useAuthStatus } from "../hooks/useAuthStatus";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthStatus();

  useEffect(() => {
    postsService
      .listPosts()
      .then((result) => result && setPosts(result.documents))
      .catch((err) => console.log("AllPostsPage: failed to load posts", err));
  }, []);

  const myPosts = posts.filter((post) => post.userid === user?.$id);

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Your posts</h1>
      <div className="flex flex-wrap gap-4">
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)]" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))
        ) : (
          <div className="w-full py-20 text-center text-slate-500">
            <p className="text-lg font-medium text-slate-700">No posts yet</p>
            <p className="mt-1 text-sm">Create your first post to see it here.</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllPostsPage;
