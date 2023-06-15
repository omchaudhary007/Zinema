import React, { useState } from "react";
import NowShowingCard from "./NowShowingCard";
import { useSelector } from "react-redux";

const NowShowing = () => {
  const movies = useSelector((state) => state.movie.movies);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("releaseDate");

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

  return (
    <section className="px-4 sm:px-6 md:px-8 py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header and Filters Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl uppercase font-bold text-gray-800 mb-6">
            Currently in Theaters
          </h2>

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
                      onClick={() => setSelectedGenre(genre)}
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
                      onClick={() => setSelectedRating(rating)}
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
                  onChange={(e) => setSortBy(e.target.value)}
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

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredMovies.map((item) => (
            <NowShowingCard key={item._id} item={item} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No movies found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NowShowing;
