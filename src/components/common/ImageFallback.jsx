const ImageFallback = ({ className = "" }) => (
  <div
    className={`w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 ${className}`}
  >
    <i className="ri-image-2-line text-3xl"></i>
    <span className="text-xs font-medium">No image</span>
  </div>
);

export default ImageFallback;
