import React, { useState } from "react";
import { groupByScreenType } from "./MovieShowtimeCard";
import { formatTimeWithIntl } from "../constants/formatIntDate";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../constants/formatDate";

const NowShowingCard = ({ item }) => {
  const navigate = useNavigate();
  const [showAllShowtime, setShowAllShowtime] = useState(false);

  const visibleShowtimes = showAllShowtime
    ? item.showtimes
    : item.showtimes.slice(0, 1);

  const getRatingColor = (rating) => {
    switch (rating) {
      case "G":
        return "bg-green-500";
      case "PG":
        return "bg-blue-500";
      case "PG-13":
        return "bg-yellow-500";
      case "R":
        return "bg-red-600";
      case "NC-17":
        return "bg-purple-700";
      default:
        return "";
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <img
            className="object-cover h-50 rounded-lg w-40"
            src={item.poster}
          />
        </div>
        <div className="md:w-3/4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p
                className={`px-0.5 py-1 text-white text-sm ${getRatingColor(
                  item.rating
                )}`}>
                {item.rating}
              </p>
              <h3 className="text-xl font-semibold">{item.movieTitle}</h3>
            </div>
            {item.showtimes.length > 1 && (
              <button
                onClick={() => setShowAllShowtime(!showAllShowtime)}
                className={`px-6 py-2 ${
                  showAllShowtime
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                } text-white font-medium rounded-lg  focus:outline-none focus:ring-2 transition-all`}>
                {showAllShowtime ? "Hide" : "Show"} Future Dates
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
            <span>
              {Math.floor(item.duration / 60)}h {item.duration % 60}m
            </span>
          </div>

          <div className="mt-4">
            {visibleShowtimes
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((item) => (
                <div key={item.date}>
                  <h4 className="mb-2 mt-4 text-[#79858E]">
                    {formatDate(item.date)}
                  </h4>
                  <div className="flex flex-col flex-wrap gap-y-4">
                    {Object.entries(groupByScreenType(item?.time)).map(
                      ([screenType, shows]) => (
                        <div key={screenType}>
                          <h4 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <span className="text-gray-500">◆</span>
                            {screenType.toUpperCase()}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {shows
                              .filter(({ time }) => {
                                const [hour, minute] = time.split(":");
                                const showTime = new Date(item.date);
                                showTime.setHours(hour, minute, 0, 0);

                                const today = new Date();
                                const isToday =
                                  new Date(item.date).toDateString() ===
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowShowingCard;
