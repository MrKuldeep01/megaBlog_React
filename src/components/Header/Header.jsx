import React from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
const Header = () => {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();
  console.log("status is : "+ authStatus);

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
    <header className="p-4 shadow bg-gray-500">
      <div className="container">
        <nav className="flex">
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto items-center ">
            {navItems.map((navItem) =>
              navItem.isActive ? (
                <Link key={navItem.name} to={navItem.url} className="px-2 py-1">
                  <button
                    className="px-4 py-2 bg-black/80 text-white duration-200 hover:bg-black rounded-lg"
                  >
                    {navItem.name}
                  </button>
                </Link>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
