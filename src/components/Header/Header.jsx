import React from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/",
      isActive: true,
    },
    {
      name: "Login",
      url: "/login",
      isActive: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      isActive: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      isActive: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      isActive: authStatus,
    },
  ];
  return (
    <header className="py-2 px-4 shadow bg-gray-500">
      <div className="container">
        <nav className="flex">
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto ">
            {navItems.map((navItem) =>
              navItem.isActive ? (
                <li key={navItem.name}>
                  <button
                    onClick={() => navigate(navItem.url)}
                    className="px-6 py-2 bg-black/60 text-white duration-200 hover:bg-black rounded"
                  >
                    {navItem.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        {/* <Logo/>    */}
      </div>
    </header>
  );
};

export default Header;
