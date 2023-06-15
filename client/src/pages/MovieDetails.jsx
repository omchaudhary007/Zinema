import { Link, useParams, useNavigate } from "react-router-dom";
import NowShowingCard from "../components/Homepage/NowShowingCard";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const [showTrailer, setShowTrailer] = useState(false);
  const [notifyMe, setNotifyMe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const movie = movies.find((item) => item._id === id);

  useEffect(() => {
    if (!movie) {
      setError("Movie not found");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [movie]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <p className="mb-4">The movie you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const isShowing = new Date(movie.releaseDate) >= new Date();

  const handleNotifyMe = () => {
    try {
      setNotifyMe(true);
      // Here you can add API call to save user's notification preference
      // Example: await api.notifyMe(movie._id);
      alert("You will be notified when the movie releases!");
    } catch (error) {
      setNotifyMe(false);
      alert("Failed to set notification. Please try again.");
    }
  };

  const handleWatchTrailer = () => {
    if (!movie.trailer) {
      alert("Trailer is not available for this movie.");
      return;
    }
    setShowTrailer(true);
  };

  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative min-h-screen text-white pb-12 pt-[72px]">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500 transition-colors">
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={movie.trailer}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: `url(${movie.background})`,
        }}
      />

      <div className="fixed inset-0 bg-black/70 -z-10" />

      <div className="container mx-auto px-4 pt-16 flex flex-col md:flex-row gap-8">
        {/* Movie Poster with z-index */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 relative z-10">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-lg shadow-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
            }}
          />
        </div>

        {/* Movie Details */}
        <div className="relative z-10 flex-1">
          {isShowing && (
            <div className="px-4 py-2 bg-black text-white w-fit mb-2 rounded-sm">
              <h1 className="font-semibold">Coming on {formatReleaseDate(movie.releaseDate)}</h1>
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2">
            {movie.title}
            <span className="text-2xl font-normal text-gray-300 ml-2">
              ({movie.releaseDate.slice(0, 4)})
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
            <span className="flex items-center">
              ⭐ {movie.reviews?.length ? movie.reviews.length.toFixed(1) : 'N/A'}/10
            </span>
            <span>
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </span>
            <span>{movie.genre?.join(", ") || 'Genre not specified'}</span>
          </div>

          {!isShowing ? (
            <div className="flex gap-4 mb-4">
              <Link
                to={`/movie/select/${id}`}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 transform hover:scale-105">
                Book Now
              </Link>
              <a
                href={movie?.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white border-2 border-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full text-sm md:text-base shadow-md transition duration-300 transform hover:scale-105 hover:bg-white hover:text-black">
                Watch Trailer
              </a>
            </div>
          ) : (
            <div className="flex gap-4 mb-4">
              <button 
                onClick={handleNotifyMe}
                disabled={notifyMe}
                className={`${
                  notifyMe 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                } text-white font-semibold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 transform hover:scale-105`}>
                {notifyMe ? 'Notified' : 'Notify Me'}
              </button>
              <a
                href={movie?.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white border-2 border-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full text-sm md:text-base shadow-md transition duration-300 transform hover:scale-105 hover:bg-white hover:text-black">
                Watch Trailer
              </a>
            </div>
          )}

          <h3 className="text-2xl font-semibold mb-2">Overview</h3>
          <p className="text-lg mb-6">{movie.overview || 'No overview available.'}</p>

          <h3 className="text-2xl font-semibold mb-2">Director</h3>
          <p className="text-lg mb-6">{movie.director || 'Director not specified'}</p>

          <h3 className="text-2xl font-semibold mb-2">Cast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movie.cast && movie.cast.length > 0 ? (
              movie.cast
                .map((actor) => (
                  <div
                    key={actor.id}
                    className="bg-gray-800 bg-opacity-60 p-3 rounded-lg">
                    <div className="font-bold">{actor.artist}</div>
                    <div className="text-gray-300 text-sm">{actor.name}</div>
                  </div>
                ))
                .slice(0, 5)
            ) : (
              <p className="text-gray-400">Cast information not available</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">You May Also Like</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-black">
          {movies
            .filter((movie) => new Date(movie.releaseDate) <= new Date())
            .filter((movie) => movie._id !== id) // Exclude current movie
            .map((item) => <NowShowingCard key={item._id} item={item} />)
            .slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
