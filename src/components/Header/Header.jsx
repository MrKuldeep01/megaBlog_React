import React from "react";
import { Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.status);
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
    <header className="px-4 py-2 my-0 shadow bg-gray-500">
        <nav className="w-full flex items-center justify-between">
          <div className="logo">
            <Link to="/">
              <Logo  className=" rounded-xl"/>
            </Link>
          </div>
          <ul className="flex ml-auto items-center ">
            {navItems.map((navItem) =>
              navItem.isActive ? (
                <NavLink key={navItem.name} to={navItem.url} className={(isActive)=>(  "px-2 py-1")}>
                  <button
                    className="px-4 py-2 bg-black/80 text-white duration-200 hover:bg-black rounded-lg"
                  >
                    {navItem.name}
                  </button>
                </NavLink>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
    </header>
  );
};

export default Header;
