import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiTheater } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { TbUserScreen } from "react-icons/tb";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-red-800 text-white flex flex-col min-h-screen max-h-screen overflow-auto scrollbar-hidden">
      <div className="p-4 border-b border-red-700 flex items-center gap-2">
        <img
          src="https://www.pngall.com/wp-content/uploads/2018/06/Cinema-PNG-Image-HD.png"
          alt="logo"
          className="w-16"
        />
        <h1 className="text-xl font-bold">CineAdmin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin"
          className="hover:bg-red-700 flex items-center p-3 rounded-lg">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="list-bookings"
          className="hover:bg-red-700 flex items-center p-3 rounded-lg">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Bookings</span>
        </NavLink>

        <details className="group">
          <summary className="flex items-center p-3 rounded-lg hover:bg-red-700 cursor-pointer">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <span>Manage Movies</span>
          </summary>
          <div className="text-white rounded-lg space-y-1 mt-2">
            <NavLink
              to="add-movie"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              Add Movie
            </NavLink>
            <NavLink
              to="list-movies"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              List Movie
            </NavLink>
          </div>
        </details>

        <details className="group">
          <summary className="flex items-center p-3 rounded-lg hover:bg-red-700 cursor-pointer">
            <div className="w-5 h-5 mr-3">
              <GiTheater />
            </div>
            <span>Manage Theaters</span>
          </summary>
          <div className="text-white rounded-lg space-y-1 mt-2">
            <NavLink
              to="add-theater"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              Add Theaters
            </NavLink>
            <NavLink
              to="list-theaters"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              List Theaters
            </NavLink>
          </div>
        </details>

        <details className="group">
          <summary className="flex items-center p-3 rounded-lg hover:bg-red-700 cursor-pointer">
            <div className="w-5 h-5 mr-3">
              <TbUserScreen />
            </div>
            <span>Manage Screens</span>
          </summary>
          <div className="text-white rounded-lg space-y-1 mt-2">
            <NavLink
              to="add-screen"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              Add Screen
            </NavLink>
            <NavLink
              to="list-screens"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              List Screen
            </NavLink>
          </div>
        </details>

        <details className="group">
          <summary className="flex items-center p-3 rounded-lg hover:bg-red-700 cursor-pointer">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Manage Showtimes</span>
          </summary>
          <div className="text-white rounded-lg space-y-1 mt-2">
            <NavLink
              to="add-showtime"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              Add Showtime
            </NavLink>
            <NavLink
              to="list-showtimes"
              className={({ isActive }) =>
                `block py-2 px-4 rounded font-extralight ${
                  isActive ? "bg-red-700" : "hover:bg-red-600"
                }`
              }>
              List Showtimes
            </NavLink>
          </div>
        </details>

        <div className="flex items-center p-3 rounded-lg hover:bg-red-700 cursor-pointer">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Reports</span>
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="p-4 border-t border-red-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mr-3">
              <span className="font-medium">A</span>
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-red-200">admin@cineplex.com</p>
            </div>
          </div>
          <button className="text-3xl">
            <IoLogOutOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
