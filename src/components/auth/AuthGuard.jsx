import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Spinner from "../common/Spinner";

// Route guard: authentication=true requires a logged-in user (redirects to
// /login); authentication=false requires a logged-out user (redirects home).
export default function AuthGuard({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (authentication && isAuthenticated !== authentication) {
      navigate("/login");
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [isAuthenticated, navigate, authentication]);

  return loader ? (
    <div className="w-full py-24 flex items-center justify-center">
      <Spinner label="Loading..." />
    </div>
  ) : (
    <>{children}</>
  );
}
