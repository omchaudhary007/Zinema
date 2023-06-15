import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authLogin } from "../store/storageSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      dispatch(
        authLogin({
          userId: response.data.userId,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          isAdmin: response.data.isAdmin,
        })
      );
      
      toast.success(response.data.message);
      
      // Redirect to admin panel if user is admin
      if (response.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="bg-white pt-[70px]">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://www.gordon-inc.com/wp-content/uploads/2020/10/629.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="w-full">
              <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                Login
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Access your account and explore our exclusive jewelry
                collection.
              </p>

              <form
                onSubmit={handleSignIn}
                className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="mt-1 w-full border-gray-200 bg-white text-sm text-gray-700 shadow-xs p-3 border"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="mt-1 w-full border-gray-200 bg-white text-sm text-gray-700 shadow-xs p-3 border"
                  />
                </div>

                <div className="col-span-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="show"
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor="show"
                      className="text-gray-700 cursor-pointer">
                      Show Password
                    </label>
                  </div>
                  <div>
                    <div className="text-gray-700 hover:text-gray-800">
                      Forgot Password?
                    </div>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden">
                    Login
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-gray-700 underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
