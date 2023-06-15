import React, { useEffect, useState } from "react";
import MovieShowtimeCard from "../components/MovieShowtimeCard";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toFetchShowtimes, setLoading, setError } from "../store/showtimeSlice";
import { toast } from "react-toastify";

const MovieShowtimesPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const { showtimes, loading } = useSelector((state) => state.showtime);
  const theaters = useSelector((state) => state.theater.theaters);
  const screens = useSelector((state) => state.screen.screens);

  const movie = movies.find((movie) => movie._id === id);

  const fetchShowtimes = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        `http://localhost:8080/api/showtime?movieId=${id}`
      );
      dispatch(toFetchShowtimes(response.data));
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch showtimes when component mounts or movie ID changes
  useEffect(() => {
    if (id) {
      fetchShowtimes();
    }
  }, [id]);

  const groupShowtimes = (showtimes) => {
    const grouped = {};
    const today = new Date().toISOString().split('T')[0];

    showtimes.forEach((show) => {
      // Only include future showtimes
      if (new Date(show.date).toISOString().split('T')[0] < today) {
        return;
      }

      const key = `${show.movieId}_${show.theaterId}`;
      const screen = screens.find((screen) => screen._id === show.screenId);
      const theater = theaters.find(
        (theater) => theater._id === show.theaterId
      );

      if (!grouped[key]) {
        grouped[key] = {
          _id: key,
          theaterName: theater?.name || 'Unknown Theater',
          location: {
            address: theater?.location?.address || 'Address not available',
            city: theater?.location?.city || 'City not available'
          },
          showtimes: {},
        };
      }

      const dateStr = new Date(show.date).toISOString().split("T")[0];

      if (!grouped[key].showtimes[dateStr]) {
        grouped[key].showtimes[dateStr] = [];
      }

      grouped[key].showtimes[dateStr].push({
        showtimeId: show._id,
        screenType: screen?.screenType || 'Standard',
        time: show.startTime,
        price: show.price,
        availableSeats: show.availableSeats
      });
    });

    return Object.values(grouped).map((group) => ({
      ...group,
      showtimes: Object.entries(group.showtimes)
        .map(([date, time]) => ({
          date,
          time,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort dates
    }));
  };

  const grouped = groupShowtimes(showtimes);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="pt-[74px]">
      {" "}
      <div className="max-w-6xl mx-auto min-h-screen bg-white my-12">
        {/* Movie Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
          <div className="w-48 h-72 md:w-56 md:h-84 rounded-xl overflow-hidden shadow-lg transform rotate-2">
            <img
              src={movie?.poster}
              alt="Movie Poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {movie?.title}
                </h1>
                <div className="flex gap-3 mt-2 text-indigo-600">
                  {movie?.genre?.map((item) => (
                    <span
                      key={item}
                      className="bg-indigo-100 px-2 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="ml-1 font-bold text-gray-800">
                  {movie?.reviews?.length ? (movie.reviews.length / 10).toFixed(1) : 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-gray-600">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {Math.floor(movie?.duration / 60)}h {movie?.duration % 60}m
              </span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                {movie?.rating}
              </span>
            </div>

            <p className="text-gray-700 max-w-2xl">{movie?.overview}</p>
            <div className="pt-2">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Theater Showtimes */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              /> 
            </svg>
            {`${movie?.title.toUpperCase()} MOVIE SHOWTIMES`}
          </h2>
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading showtimes...</p>
            </div>
          ) : grouped.length > 0 ? (
            grouped.map((item) => (
              <MovieShowtimeCard key={item._id} item={item} />
            ))
          ) : (
            <div className="text-center py-10 px-4 bg-gray-50 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                No Showtimes Available
              </h1>
              <p className="text-gray-500">
                There are no showtimes available for this movie at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimesPage;
