import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../constants/formatDate";

const ComingSoonCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/movie/details/${movie._id}`} className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-82 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-2">
          Coming {formatDate(movie.releaseDate)}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{movie.language}</p>

        <div className="flex flex-col space-y-2">
          <button className="bg-red-600 text-white font-medium hover:bg-red-700 py-2 px-4 rounded text-sm transition-colors">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
