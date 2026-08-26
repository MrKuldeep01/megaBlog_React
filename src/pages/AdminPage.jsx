import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { postsService } from "../api/appwrite";

const AdminPage = () => {
  const { user } = useAuthStatus();
  const [postCount, setPostCount] = useState(null);

  useEffect(() => {
    if (!user) return;
    // Empty query — listPosts() defaults to status="active" only, which
    // would undercount the user's private (inactive) posts.
    postsService.listPosts([]).then((result) => {
      if (!result) return;
      setPostCount(result.documents.filter((post) => post.userid === user.$id).length);
    });
  }, [user]);

  if (!user) return null;

  const initial = user.name?.charAt(0).toUpperCase() || "?";
  const memberSince = user.$createdAt
    ? new Date(user.$createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })
    : null;

  return (
    <Container className="max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Your profile</h1>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-semibold">
          {initial}
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">{user.name}</h2>
        <a
          href={`mailto:${user.email}`}
          className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <i className="ri-mail-line"></i> {user.email}
        </a>
        {memberSince && <p className="mt-4 text-xs text-slate-400">Member since {memberSince}</p>}

        <Link
          to="/all-posts"
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <i className="ri-file-list-3-line"></i>
          {postCount === null ? "Loading posts..." : `${postCount} post${postCount === 1 ? "" : "s"}`}
        </Link>
      </div>
    </Container>
  );
};

export default AdminPage;
