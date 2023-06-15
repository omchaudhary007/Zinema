import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NowShowingCard from "../components/NowShowingCard";

const TheaterDetail = () => {
  const { id } = useParams();
  const theaters = useSelector((state) => state.theater.theaters);
  const showtimes = useSelector((state) => state.showtime.showtimes);
  const movies = useSelector((state) => state.movie?.movies);
  const screens = useSelector((state) => state.screen.screens);

  const theater = theaters.find((theater) => theater?._id === id);
  const theaterShowtime = showtimes.filter(
    (showtime) => showtime.theaterId === id
  );

  const groupShowtimes = (showtimes) => {
    const grouped = {};

    showtimes.forEach((show) => {
      const key = `${show.movieId}_${show.theaterId}  `;
      const movie = movies.find((movie) => movie._id === show.movieId);
      const screen = screens.find((screen) => screen._id === show.screenId);

      if (!grouped[key]) {
        grouped[key] = {
          _id: key,
          rating: movie?.rating,
          poster: movie?.poster,
          movieTitle: movie?.title,
          duration: movie?.duration,
          screenType: screen?.screenType,
          showtimes: {},
        };
      }

      const dateStr = new Date(show.date).toISOString().split("T")[0];

      if (!grouped[key].showtimes[dateStr]) {
        grouped[key].showtimes[dateStr] = [];
      }

      grouped[key].showtimes[dateStr].push({
        showtimeId: show._id,
        time: show.startTime,
        screenType: screen?.screenType,
      });
    });

    return Object.values(grouped).map((group) => ({
      ...group,
      showtimes: Object.entries(group.showtimes).map(([date, time]) => ({
        date,
        time,
      })),
    }));
  };

  const grouped = groupShowtimes(theaterShowtime);

  if (!theaters) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[70px] overflow-hidden">
      {/* Theater Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-red-900/70 to-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/30 to-red-600/0"></div>
        </div>
        <div className="flex transition-transform duration-500 ease-in-out h-full">
          <div className="w-full h-full flex-shrink-0 relative flex flex-col justify-center items-center">
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {theater?.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-4 drop-shadow-md">
                {theater?.location.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Theater Info */}
          <div className="lg:w-2/3">
            {/* About Theater */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Theater</h2>
              <p className="text-gray-700 mb-4">{theater?.location.address}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="text-gray-600">{theater?.contact.phone}</p>
                  <p className="text-gray-600">{theater?.contact.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {theater?.amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Now Showing */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Now Showing</h2>

              <div className="space-y-6">
                {grouped.map((item) => (
                  <NowShowingCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-18">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={theater?.location.mapUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Theater Location Map"></iframe>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                Get Directions
              </button>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Public Transport</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                      M
                    </span>
                    Kurla Metro Station (500m)
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                      L
                    </span>
                    Kurla Railway Station (800m)
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-2">
                      B
                    </span>
                    Bus Stop (200m)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterDetail;
