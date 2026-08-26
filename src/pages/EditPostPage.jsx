import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import { postsService } from "../api/appwrite";

const EditPostPage = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    postsService
      .getPost(slug)
      .then((result) => {
        if (result) setPost(result);
      })
      .catch((err) => console.log("EditPostPage: failed to load post", err));
  }, [slug, navigate]);

  if (!post) return null;

  return (
    <Container className="max-w-5xl">
      <Link to={`/post/${post.$id}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-3">
        <i className="ri-arrow-left-line"></i> Back
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Edit post</h1>
      <PostForm post={post} />
    </Container>
  );
};

export default EditPostPage;
