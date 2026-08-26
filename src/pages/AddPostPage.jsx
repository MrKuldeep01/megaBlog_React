import { Link } from "react-router-dom";
import { Container, PostForm } from "../components";

const AddPostPage = () => (
  <Container className="max-w-5xl">
    <Link to="/all-posts" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-3">
      <i className="ri-arrow-left-line"></i> Back
    </Link>
    <h1 className="text-2xl font-semibold text-slate-900 mb-6">Add a new post</h1>
    <PostForm />
  </Container>
);

export default AddPostPage;
