import { useSelector } from "react-redux";

// Central place that knows the auth slice's (flat) shape, so components
// depend on this hook instead of the store structure directly.
export function useAuthStatus() {
  const isAuthenticated = useSelector((state) => state.status);
  const user = useSelector((state) => state.userData);
  return { isAuthenticated, user };
}
