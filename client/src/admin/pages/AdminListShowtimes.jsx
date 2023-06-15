import React from "react";
import { useSelector } from "react-redux";
import AdminShowtimeItem from "../components/AdminShowtimeItem";
import { Link } from "react-router-dom";

const AdminListShowtimes = () => {
  const showtimes = useSelector((state) => state.showtime.showtimes);
  const movies = useSelector((state) => state.movie.movies);

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Showtimes Management
        </h1>
        <Link
          to="/admin/add-showtime"
          className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow text-center"
        >
          Add New Showtime
        </Link>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {showtimes && showtimes.map((showtime) => {
          const movie = movies.find((m) => m._id === showtime.movieId);
          return (
            <div key={showtime._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={movie?.poster}
                  alt={movie?.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{movie?.title}</h3>
                  <p className="text-sm text-gray-600">Hall: {showtime.hall}</p>
                  <p className="text-sm text-gray-600">Time: {showtime.startTime}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(showtime.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Price: ₱{showtime.price}</p>
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
          );
        })}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movie
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hall
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seats
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {showtimes && showtimes.map((showtime) => (
              <AdminShowtimeItem key={showtime._id} item={showtime} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminListShowtimes;
