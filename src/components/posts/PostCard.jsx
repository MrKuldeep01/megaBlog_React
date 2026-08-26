import { Link } from "react-router-dom";
import { useFilePreview } from "../../hooks/useFilePreview";

const PostCard = ({ $id, title, featuredimage, status }) => {
  const { url: postImage, status: imageState } = useFilePreview(featuredimage);

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
        <div className="w-full aspect-video bg-slate-100 overflow-hidden flex items-center justify-center">
          {imageState === "ready" ? (
            <img
              src={postImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          ) : imageState === "loading" ? (
            <div className="w-full h-full animate-pulse bg-slate-200" />
          ) : (
            <i className="ri-image-line text-3xl text-slate-300"></i>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-base font-semibold text-slate-900 line-clamp-2">{title}</h2>
          {status === "inactive" && (
            <span className="inline-block mt-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
              Private
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
