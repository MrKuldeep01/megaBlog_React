import React, { useState } from "react";
import { Logo, LogoutBtn, Button } from "../index";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const navItems = [
    {
      name: (
        <span>
          Home <i className="ri-home-office-line"></i>
        </span>
      ),
      url: "/",
      title: "Home",
      isActive: true,
    },
    {
      name: (
        <span>
          Login <i className="ri-login-box-line"></i>{" "}
        </span>
      ),
      url: "/login",
      isActive: !authStatus,
      title: "Login",
    },
    {
      name: (
        <span>
          Signup <i className="ri-user-add-fill"></i>
        </span>
      ),
      title: "Signup",
      url: "/signup",
      isActive: !authStatus,
    },
    {
      name: (
        <span>
          All posts <i className="ri-gallery-view-2"></i>
        </span>
      ),
      title: "All Posts",
      url: "/all-posts",
      isActive: authStatus,
    },
    {
      name: (
        <span>
          Add post <i className="ri-sticky-note-add-line"></i>
        </span>
      ),
      title: "Add Post",
      url: "/add-post",
      isActive: authStatus,
    },
    {
      name: (
        <span>
          Admin <i className="ri-map-pin-user-fill"></i>
        </span>
      ),
      title: "Admin",
      url: "/admin",
      isActive: authStatus,
    },
  ];
  return (
    <header className="px-4 py-2 mt-0 shadow-xl bg-gray-600 relative">
      <nav className="w-full flex items-center justify-between px-1">
        <Link to="/">
          <Logo className=" rounded-xl" />
        </Link>

        <ul className="flex ml-auto items-center ">
          {/* ham btn =============== */}
          <Button
            className={`md:hidden ${
              display ? "hidden" : "inline-block"
            } duration-200 hover:bg-black rounded-xl`}
            children={<i className="ri-menu-3-line"></i>}
            bgColor="bg-black/90"
            textColor="text-white"
            onClick={(e) => {
              setDisplay((pre) => !pre);
            }}
          />

          <div
            className={`md:hidden w-auto h-auto gap-1 justify-center items-center flex bg-white/10 absolute right-0 top-0 ${
              display ? "flex-col" : "hidden"
            } px-4 py-2 z-40 rounded-l-lg`}
           
          >
            {/* close btn ========= */}
            <button
              className={` px-1 bg-white/40 text-black duration-200 hover:bg-white rounded-full text-xs sm:text-base absolute top-1 right-1 z-10
          `}
              onClick={(e) => {
                setDisplay((pre) => !pre);
              }}
            >
              <i className="ri-close-line"></i>
            </button>

            {/* ================== ham content */}
            {navItems.map((item, i) => {
              return item.isActive ? (
                <Link to={item.url} key={i}  onClick={() => {
                  setDisplay((pre) => !pre);
                }} >
                  <button
                    title={item.title}
                    className={` ${i===0 ? "mt-4" : "mt-1"} px-4 py-2 bg-black/80 text-white duration-200 hover:bg-black rounded-lg text-sm md:text-base`}
                  >
                    {item.name}
                  </button>
                </Link>
              ) : null;
            })}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </div>
          {/* ===============  */}
          {navItems.map((navItem, i) =>
            navItem.isActive ? (
              <Link
                key={i}
                to={navItem.url}
                title={navItem.title}
                className="hidden md:inline-block px-2 py-1"
              >
                <button className="px-4 py-2 bg-black/80 text-white duration-200 hover:bg-black rounded-lg text-sm md:text-base">
                  {navItem.name}
                </button>
              </Link>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogoutBtn className="hidden md:inline-block" />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
