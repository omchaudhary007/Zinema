import React from "react";
import { useSelector } from "react-redux";
import AdminMovieItem from "../components/AdminMovieItem";

const AdminListMovies = () => {
  const movies = useSelector((state) => state.movie.movies);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Movies Management</h1>
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {movies && movies.map((movie) => (
          <div key={movie._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.director}</p>
                <p className="text-sm text-gray-600">{movie.duration} mins</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-700 text-white">
              <th className="border border-gray-300 p-2">Poster</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Duration</th>
              <th className="border border-gray-300 p-2">Release Date</th>
              <th className="border border-gray-300 p-2">Director</th>
              <th className="border border-gray-300 p-2">Details</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies && movies.map((movie) => (
              <AdminMovieItem key={movie._id} movie={movie} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminListMovies;
