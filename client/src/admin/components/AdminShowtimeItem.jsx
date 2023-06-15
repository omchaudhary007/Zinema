import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../constants/formatDate";

const AdminShowtimeItem = ({ item }) => {
  const movies = useSelector((state) => state.movie.movies);

  const movie = movies.find((movie) => movie._id === item.movieId);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-md object-cover"
              src={movie?.poster}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {movie?.title}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item?.hall}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item?.startTime}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(item?.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {`${Math.floor(movie?.duration / 60)}h ${movie?.duration % 60}m`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ₱{item.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{
              width: `${
                (item.bookedSeats.length / item.availableSeats) * 100
              }%`,
            }}></div>
        </div>
        <span className="text-xs mt-1 block">
          {item.bookedSeats.length}/{item.availableSeats}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
          {/* {showtime.status.charAt(0).toUpperCase() +
                      showtime.status.slice(1)} */}{" "}
          status
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="px-4 py-2 mr-3 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition duration-200">
          Edit
        </button>
        <button className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition duration-200">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminShowtimeItem;
