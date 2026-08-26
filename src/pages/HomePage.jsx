import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { postsService } from "../api/appwrite";
import { useAuthStatus } from "../hooks/useAuthStatus";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    postsService
      .listPosts()
      .then((result) => {
        if (result) setPosts(result.documents);
      })
      .catch((err) => setError(err.message || "Failed to load posts"));
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Container>
      <div className="flex flex-wrap gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)]" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))
        ) : (
          <div className="w-full py-20 text-center text-slate-500">
            <p className="text-lg font-medium text-slate-700">Nothing here yet</p>
            <p className="mt-1 text-sm">
              {isAuthenticated ? "Create the first post." : "Log in to start publishing."}
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm shadow-sm">
          {error}
        </p>
      )}
    </Container>
  );
};

export default HomePage;
