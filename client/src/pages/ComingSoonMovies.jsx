import React, { useState } from "react";
import Pagination from "../components/Pagination";
import ComingSoonCard from "../components/Homepage/ComingSoonCard";
import { useSelector } from "react-redux";

const ComingSoonMovies = () => {
  const movies = useSelector((state) => state.movie.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const comingSoonMovies = movies.filter(
    (movie) => new Date(movie.releaseDate) >= new Date()
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comingSoonMovies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="pt-18">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl uppercase font-bold text-gray-900">
            Coming Soon
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {currentItems.map((movie) => (
            <ComingSoonCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* No Results Message */}
        {comingSoonMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No upcoming movies found.</p>
          </div>
        )}

        <div className="mt-12">
          <Pagination 
            totalItems={comingSoonMovies.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonMovies;
