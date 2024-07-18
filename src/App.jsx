import { useEffect, useState } from "react";
import config from "../config/envconfig";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import dbService from "./appwrite/DB_service";
import server from "../store/store";
import { logout } from "../store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen w-[100vw] bg-slate-800/50 text-white flex flex-wrap items-center justify-start">
      <div className="w-full block P-2 ">
        <Header />
        <main className="py-8 px-4">
          TODO: {/* <Outlet /> */}
          Data will shown here!

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
