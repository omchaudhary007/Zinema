import React, { useState } from "react";
import { formatTimeWithIntl } from "../constants/formatIntDate";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../constants/formatDate";

export const groupByScreenType = (showtimes) => {
  if (!showtimes || !Array.isArray(showtimes)) return {};
  
  const screenGroups = {};

  showtimes.forEach((showtime) => {
    if (!showtime || !showtime.screenType) return;
    
    const type = showtime.screenType.toLowerCase();
    if (!screenGroups[type]) {
      screenGroups[type] = [];
    }
    screenGroups[type].push({
      time: showtime.time,
      showtimeId: showtime.showtimeId,
    });
  });

  return screenGroups;
};

const MovieShowtimeCard = ({ item }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  if (!item || !item.showtimes || !Array.isArray(item.showtimes)) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500">No showtimes available</p>
      </div>
    );
  }

  const firstShowDate = item.showtimes.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )[0]?.date;

  const isToday = firstShowDate && 
    new Date(firstShowDate).toDateString() === new Date().toDateString();

  const visibleShowtimes = showAll
    ? item.showtimes
    : isToday
    ? item.showtimes.slice(0, 1)
    : [];

  return (
    <div className="bg-white overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-800 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {item?.theaterName || 'Theater Name Not Available'}
              </h3>
              <p className="text-gray-600">
                {item?.location?.address 
                  ? `${item.location.address}, ${item.location.city || ''}`
                  : 'Location not available'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className={`mt-3 md:mt-0 px-4 py-2 transition-all duration-300 ease-in-out ${
            showAll
              ? "bg-indigo-600 border border-indigo-600 text-white hover:bg-indigo-50 hover:text-indigo-600"
              : "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          } rounded-lg font-medium flex items-center gap-1 text-sm shadow-sm`}>
          {showAll ? "Hide" : "Show"} Future Dates
        </button>
      </div>
      <div className="px-6">
        <div className="my-6 flex flex-col gap-y-6">
          {visibleShowtimes.length >= 1 ? (
            visibleShowtimes
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((showtime) => (
                <div key={showtime.date}>
                  <h4 className="text-[rgb(121,133,142)] mb-2">
                    {formatDate(showtime.date)}
                  </h4>
                  <div className="flex flex-col flex-wrap gap-4">
                    <div>
                      <div className="flex flex-col flex-wrap gap-3">
                        {Object.entries(groupByScreenType(showtime?.time || [])).map(
                          ([screenType, shows]) => (
                            <div key={screenType}>
                              <h4 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                                <span className="text-gray-500">◆</span>
                                {screenType.toUpperCase()}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {shows
                                  .filter(({ time }) => {
                                    if (!time) return false;
                                    const [hour, minute] = time.split(":");
                                    const showTime = new Date(showtime.date);
                                    showTime.setHours(parseInt(hour), parseInt(minute), 0, 0);

                                    const today = new Date();
                                    const isToday =
                                      new Date(showtime.date).toDateString() ===
                                      today.toDateString();

                                    return !isToday || showTime > today;
                                  })
                                  .sort((a, b) => a.time.localeCompare(b.time))
                                  .map((show, index) => (
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/booking/seats/${show.showtimeId}`
                                        )
                                      }
                                      key={index}
                                      className="px-5 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 text-gray-800 rounded-xl font-medium shadow-sm hover:shadow-md transition-all">
                                      {formatTimeWithIntl(show.time)}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-10 px-4 bg-gray-50 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                No Showtimes Available Today
              </h1>
              <p className="text-gray-500">
                Check back later or explore other days to see what's playing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimeCard;
