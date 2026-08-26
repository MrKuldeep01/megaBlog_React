
const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
