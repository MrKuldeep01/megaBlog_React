import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Logo, Container } from "../common";
import LogoutBtn from "./Logout";
import { useAuthStatus } from "../../hooks/useAuthStatus";

const Header = () => {
  const { isAuthenticated } = useAuthStatus();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", url: "/", icon: "ri-home-4-line", isActive: true },
    { name: "Login", url: "/login", icon: "ri-login-box-line", isActive: !isAuthenticated },
    { name: "Signup", url: "/signup", icon: "ri-user-add-line", isActive: !isAuthenticated },
    { name: "All Posts", url: "/all-posts", icon: "ri-gallery-view-2", isActive: isAuthenticated },
    { name: "Add Post", url: "/add-post", icon: "ri-sticky-note-add-line", isActive: isAuthenticated },
    { name: "Admin", url: "/admin", icon: "ri-user-settings-line", isActive: isAuthenticated },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <Container>
        <nav className="w-full flex items-center justify-between py-2.5">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
            <span className="font-semibold text-slate-900 hidden sm:inline">Our Mini Media</span>
          </Link>

          {/* desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(
              (item) =>
                item.isActive && (
                  <li key={item.url}>
                    <NavLink to={item.url} end={item.url === "/"} className={linkClass}>
                      <i className={item.icon}></i>
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {isAuthenticated && (
              <li className="ml-1">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <i className={open ? "ri-close-line text-xl" : "ri-menu-3-line text-xl"}></i>
          </button>
        </nav>

        {/* mobile menu */}
        {open && (
          <ul className="md:hidden flex flex-col gap-1 pb-4">
            {navItems.map(
              (item) =>
                item.isActive && (
                  <li key={item.url}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={linkClass}
                      onClick={() => setOpen(false)}
                    >
                      <i className={item.icon}></i>
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {isAuthenticated && (
              <li>
                <LogoutBtn className="w-full justify-start" />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
};

export default Header;
