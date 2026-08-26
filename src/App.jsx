import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import { authService } from "./api/appwrite";
import { login, logout } from "./store/slices/authSlice";
import { Header, Footer, Spinner } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <Spinner className="h-8 w-8" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1 w-full px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
