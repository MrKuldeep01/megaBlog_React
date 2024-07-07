import { useEffect, useState } from "react";
import config from "../config/envconfig";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import dbService from "./appwrite/DB_service";
import server from "../store/store";
import { logout } from "../store/authSlice";
import { Outlet } from "react-router-dom";
// import {login,logout} from
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
    <div className="min-h-screen bg-slate-800/20 text-white flex flex-wrap items-center justify-start">
      <div className="w-full block ">
        <Header />
        <main>TODO:{/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : (
      <div className="min-h-screen w-full bg-slate-800/20 text-white flex flex-wrap items-center justify-center">
      <div className="w-52 block rounded-full border-12 border-black text-4xl">
      Loading ...
      </div>kjno
    </div>
  );
}

export default App;
