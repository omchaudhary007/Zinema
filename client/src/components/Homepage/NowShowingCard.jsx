import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NowShowingCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-none w-auto bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
      <Link to={`/movie/details/${item._id}`}>
        <div className="relative h-82">
          <img src={item.poster} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-1 text-sm">
            ⭐ {item.reviews.length > 1 ? item.reviews : 0}/10
          </div>
        </div>
      </Link>
      <h3 className="p-3 text-sm font-semibold truncate text-black">
        {item.title}
      </h3>
      <button 
        onClick={() => navigate(`/movie/details/${item._id}`)}
        className="w-full py-2 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
        Book
      </button>
    </div>
  );
};

export default NowShowingCard;
