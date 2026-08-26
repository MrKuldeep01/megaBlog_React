import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthGuard } from "../components/auth";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AllPostsPage from "../pages/AllPostsPage";
import AddPostPage from "../pages/AddPostPage";
import EditPostPage from "../pages/EditPostPage";
import AdminPage from "../pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <AuthGuard authentication={false}>
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthGuard authentication={false}>
            <SignupPage />
          </AuthGuard>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthGuard>
            <AllPostsPage />
          </AuthGuard>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthGuard>
            <AddPostPage />
          </AuthGuard>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthGuard>
            <EditPostPage />
          </AuthGuard>
        ),
      },
      { path: "/post/:slug", element: <PostPage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);

export default router;
