import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth_service";
import { logout, login } from "../store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // http://localhost:5173

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return !loading ? (
    <div className="min-h-screen w-[100vw] bg-slate-800/50 text-white flex flex-wrap items-center justify-start py-0">
      <div className="w-full block py-0">
        <Header />
        <main className="my-0 py-8 px-4 w-full h-auto min-h-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-[100vw] bg-slate-900 text-4xl flex  items-center justify-center">
      <div className="w-72 h-72 flex  items-center justify-center rounded-full border-dotted p-4 border-white border-8 bg-transparent font-semibold text-red-600 overflow-hidden animate-bounce ease-in-out delay-200 duration-1000">
        <span className="animate-pulse ease-in-out delay-0 duration-800  ">
          Loading ...
        </span>
      </div>
    </div>
  );
}

export default App;
