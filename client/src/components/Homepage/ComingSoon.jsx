import React, { useState } from "react";
import ComingSoonCard from "./ComingSoonCard";
import { useSelector } from "react-redux";

const ComingSoon = () => {
  const movies = useSelector((state) => state.movie.movies);

  return (
    <section className="px-8 py-12 bg-gray-100">
      <h2 className="text-3xl uppercase font-bold text-gray-800 mb-6">
        On the way
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies
          .filter((movie) => new Date(movie.releaseDate) >= new Date())
          .map((movie) => <ComingSoonCard key={movie._id} movie={movie} />)
          .slice(0, 4)}
      </div>
    </section>
  );
};

export default ComingSoon;
