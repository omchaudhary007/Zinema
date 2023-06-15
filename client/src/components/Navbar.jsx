import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../store/storageSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, isAdmin } = useSelector((state) => state.storage);
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent scrolling when menu is open on mobile
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    dispatch(authLogout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide z-50 fixed w-full">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://www.pngall.com/wp-content/uploads/2018/06/Cinema-PNG-Image-HD.png"
            alt="logo"
            className="w-12 sm:w-16"
          />
        </Link>

        {/* Navigation Menu */}
        <div
          id="collapseMenu"
          className={`${
            menuOpen
              ? "block fixed inset-0 z-50"
              : "max-lg:hidden lg:!block"
          }`}
        >
          {/* Overlay */}
          <div
            className={`${
              menuOpen
                ? "fixed inset-0 bg-black opacity-50 z-40"
                : "hidden"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Close button (mobile) */}
          <button
            id="toggleClose"
            className={`lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border ${
              menuOpen ? "" : "hidden"
            }`}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`lg:flex items-center justify-center gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "max-lg:-translate-x-full"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="/" className="hover:text-red-700 text-red-700 block font-medium text-[15px]">
                Home
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="movies" className="hover:text-red-700 text-slate-900 block font-medium text-[15px]">
                Movies
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="coming-soon" className="hover:text-red-700 text-slate-900 block font-medium text-[15px]">
                Coming Soon
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="theaters" className="hover:text-red-700 text-slate-900 block font-medium text-[15px]">
                Theaters
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="about" className="hover:text-red-700 text-slate-900 block font-medium text-[15px]">
                About
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="contact" className="hover:text-red-700 text-slate-900 block font-medium text-[15px]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {userId ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium tracking-wide text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FiSettings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              )}
              <Link to="profile" className="text-2xl hover:text-red-700 transition-colors">
                <FaRegUserCircle />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg font-medium tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="login"
                className="px-4 py-2 text-sm rounded-lg font-medium tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="signup"
                className="px-4 py-2 text-sm rounded-lg tracking-wide border bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Hamburger Menu Button */}
          <button
            id="toggleOpen"
            className={`lg:hidden ${menuOpen ? "hidden" : ""}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
