import React, { useState } from "react";
import NowShowingCard from "../components/Homepage/NowShowingCard";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

const MoviesPage = () => {
  const movies = useSelector((state) => state.movie.movies);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("releaseDate");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique genres from all movies
  const genres = ["All", ...new Set(movies.flatMap(movie => movie.genre))];
  
  // Get unique ratings from all movies
  const ratings = ["All", ...new Set(movies.map(movie => movie.rating))];

  // Filter movies based on genre and rating
  const filteredMovies = movies
    .filter((movie) => {
      if (selectedGenre === "All") return true;
      return movie.genre.includes(selectedGenre);
    })
    .filter((movie) => {
      if (selectedRating === "All") return true;
      return movie.rating === selectedRating;
    })
    .filter((movie) => new Date(movie.releaseDate) <= new Date())
    .sort((a, b) => {
      if (sortBy === "releaseDate") {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      } else if (sortBy === "duration") {
        return b.duration - a.duration;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl uppercase font-bold text-gray-900">
            Now Showing
          </h1>

          {/* Filters Container */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Genre Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
                        selectedGenre === genre
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      } border`}>
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex flex-wrap gap-2">
                  {ratings.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => {
                        setSelectedRating(rating);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
                        selectedRating === rating
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      } border`}>
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sort by</label>
                <select 
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="releaseDate">Release Date</option>
                  <option value="duration">Duration</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <NowShowingCard key={item._id} item={item} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No movies found matching your criteria.</p>
          </div>
        )}

        <div className="mt-12">
          <Pagination 
            totalItems={filteredMovies.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
