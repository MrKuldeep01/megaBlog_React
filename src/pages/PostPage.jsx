import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Button, Container, ImageFallback } from "../components";
import { postsService, storageService } from "../api/appwrite";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useFilePreview } from "../hooks/useFilePreview";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStatus();
  const { url: postImage, status: imageStatus } = useFilePreview(post?.featuredimage);
  const isAuthor = post && user ? post.userid === user.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    postsService
      .getPost(slug)
      .then((result) => {
        if (result) setPost(result);
        else navigate("/");
      })
      .catch((err) => console.log("PostPage: failed to load post", err));
  }, [slug, navigate]);

  useEffect(() => {
    if (!post?.featuredimage) return;
    storageService.getFileDownload(post.featuredimage).then((url) => {
      if (url) setDownloadLink(url.href);
    });
  }, [post?.featuredimage]);

  const deletePost = () => {
    postsService.deletePost(post.$id).then((deleted) => {
      if (deleted) {
        storageService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <Container className="max-w-3xl">
      <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="relative w-full aspect-video bg-slate-100">
          {imageStatus === "ready" ? (
            <a href={downloadLink || "#"} title="Click to download">
              <img src={postImage} alt={post.title} className="w-full h-full object-cover" />
            </a>
          ) : imageStatus === "loading" ? (
            <div className="w-full h-full animate-pulse bg-slate-200" />
          ) : (
            <ImageFallback />
          )}

          {isAuthor && (
            <div className="absolute right-3 top-3 flex gap-2">
              <Button variant="secondary" onClick={() => navigate(`/edit-post/${post.$id}`)}>
                <i className="ri-tools-line"></i> Edit
              </Button>
              <Button variant="danger" onClick={deletePost}>
                <i className="ri-delete-bin-7-line"></i> Delete
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{post.title}</h1>
          <div className="post-content">{parse(post.content)}</div>
        </div>
      </article>
    </Container>
  );
};

export default PostPage;
