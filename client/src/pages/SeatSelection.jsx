import React, { useState } from "react";
import { PiArmchairFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { formatTimeWithIntl } from "../constants/formatIntDate";
import { formatDate } from "../constants/formatDate";
import { getDay } from "../constants/getDay";
import { toast } from "react-toastify";
import { setId, setSeats } from "../store/bookingSlice";

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const showtimes = useSelector((state) => state.showtime.showtimes);
  const movies = useSelector((state) => state.movie.movies);

  const showtime = showtimes.find((showtime) => showtime._id === id);
  const movie = movies.find((movie) => movie._id === showtime?.movieId);

  const allSeatIds = [];

  // Set initial selected date when component mounts
  React.useEffect(() => {
    if (showtime?.date) {
      setSelectedDate(showtime.date);
    }
  }, [showtime]);

  const handleSubmit = () => {
    if (selectedSeats.length < 1) {
      return toast.error("Select Seats");
    }

    dispatch(setSeats(selectedSeats));
    dispatch(setId(id));
    navigate("/booking/add-on");
  };

  const generateRows = (totalSeats, seatsPerRow = 20) => {
    const rowCount = Math.ceil(totalSeats / seatsPerRow);
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      let rowLetter = "";
      let n = i;
      while (n >= 0) {
        rowLetter = String.fromCharCode(65 + (n % 26)) + rowLetter;
        n = Math.floor(n / 26) - 1;
      }
      rows.push(rowLetter);
    }

    return rows;
  };

  const rows = generateRows(showtime?.availableSeats);

  rows.forEach((row) => {
    for (let i = 1; i <= 20; i++) {
      allSeatIds.push(`${row}${i}`);
    }
  });

  const availableSeatIds = allSeatIds.slice(0, showtime?.availableSeats);

  if (!showtime) {
    return <Loading />;
  }

  const getDates = (type, count = 3) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    return Array.from({ length: count }, (_, i) => {
      const date = new Date(showtime?.date);
      const offset = type === "past" ? -(count - i) : i + 1;
      date.setDate(date.getDate() + offset);

      return {
        month: months[date.getMonth()],
        day: date.getDate(),
        weekday: days[date.getDay()],
        fullDate: date.toISOString().split('T')[0]
      };
    });
  };

  const handleDateClick = (date) => {
    // Find showtime for the selected date
    const newShowtime = showtimes.find(
      (st) => st.movieId === movie._id && st.date === date
    );
    if (newShowtime) {
      setSelectedDate(date);
      // Navigate after state update
      setTimeout(() => {
        navigate(`/booking/seats/${newShowtime._id}`);
      }, 0);
    }
  };

  const renderDateCard = (date, index, isPast = false) => {
    const isFuture = new Date(date.fullDate) > new Date();
    const isActive = false; // Make all dates inactive
    const isSelected = date.fullDate === showtime?.date;
    
    return (
      <button
        key={date.day}
        disabled={true}
        className={`flex flex-col w-26 items-center justify-center h-full p-4 rounded-lg transition-all
          ${isSelected 
            ? 'bg-black text-white opacity-100' 
            : 'opacity-50 cursor-not-allowed'}`}>
        <h1>{date.month}</h1>
        <p className="font-bold text-3xl">{date.day}</p>
        <p>{date.weekday}</p>
      </button>
    );
  };

  const formattedDate = selectedDate ? formatDate(selectedDate).split(" ") : [];

  return (
    <div className="pt-[70px]">
      {/* Movie Banner Section */}
      <div className="relative px-4 md:px-18 py-10 md:py-20 flex flex-col md:flex-row w-full bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">
          <img
            src={movie?.poster}
            alt={movie?.poster + "poster"}
            className="rounded-lg shadow-2xl h-48 md:h-72 w-auto"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white">
              {movie?.title}
              <span className="text-xl md:text-2xl font-normal text-gray-300 ml-2">
                ({movie?.releaseDate.slice(0, 4)})
              </span>
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-300 mb-6">
              <span className="flex items-center">⭐ 8.8/10</span>
              {movie?.genre
                .map((genre) => <span key={genre}>{genre}</span>)
                .slice(0, 2)}
            </div>

            <p className="text-gray-300 mb-6 max-w-xl text-sm md:text-base">{movie.overview}</p>

            <a
              href={movie?.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white border-2 border-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full text-sm md:text-base shadow-md transition duration-300 transform hover:scale-105 hover:bg-white hover:text-black">
              Watch Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Date and Time Section */}
      <div className="w-full bg-gray-900 min-h-[16vh] flex text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center p-4">
          <div className="flex items-center h-full flex-1 mb-4 md:mb-0">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold mr-4 md:mr-10">Date</h1>
            </div>
            <div className="flex flex-1 h-full mx-2 md:mx-4 max-w-2xl overflow-x-auto">
              {getDates("past", 3).map((date, index) =>
                renderDateCard(date, index, true)
              )}

              <div className="flex flex-col w-26 items-center justify-center bg-black h-full opacity-100 blur-none p-4 rounded-lg">
                <h1>{formattedDate[0]}</h1>
                <p className="font-bold text-3xl">
                  {formattedDate[1]?.replace(",", "")}
                </p>
                <p>{selectedDate ? getDay(selectedDate).slice(0, 3) : ""}</p>
              </div>

              {getDates("future", 3).map((date, index) =>
                renderDateCard(date, index)
              )}
            </div>
          </div>
          <div className="flex items-center h-full space-x-4 md:space-x-6 bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="h-full flex items-center">
              <div className="mr-4">
                <h1 className="text-lg font-semibold text-gray-300 mb-2">
                  Time
                </h1>
                <div className="w-24 md:w-28 bg-red-600 text-white py-2 px-4 rounded-lg text-center font-medium">
                  <p>{formatTimeWithIntl(showtime?.startTime)}</p>
                </div>
              </div>
            </div>

            <div className="h-full flex items-center">
              <div className="bg-gray-600 w-px h-10 opacity-50"></div>
            </div>

            <div className="h-full flex items-center">
              <div className="mr-4">
                <h1 className="text-lg font-semibold text-gray-300 mb-2">
                  Theater
                </h1>
                <div className="w-24 md:w-28 bg-red-600 text-white py-2 px-4 rounded-lg text-center font-medium">
                  <p>{showtime.hall}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection Section */}
      <div className="bg-[#213448] text-white">
        <div className="container mx-auto flex flex-col md:flex-row w-full py-10 md:py-20 gap-8 md:gap-16 px-4">
          {/* Selected Seats Summary */}
          <div className="flex flex-col gap-4 w-full md:w-[20%]">
            <h1 className="text-xl font-semibold">Your Selected Seats</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {selectedSeats?.map((seat) => (
                  <div
                    className="p-1.5 bg-gray-600 text-white rounded-md"
                    key={seat}>
                    <p className="font-semibold">{seat}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <p className="font-medium">Tickets</p>
                  <p className="text-center">{selectedSeats?.length}x</p>
                  <p className="text-right">
                    $<span className="font-medium">{showtime?.price}</span>
                  </p>
                  <hr className="w-full h-[1px] bg-gray-600 border-none col-span-3" />
                  <p className="font-medium">Total</p>
                  <p className="text-center"></p>
                  <p className="text-right">
                    $
                    <span className="font-medium">
                      {selectedSeats?.length * showtime?.price}
                    </span>
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 mt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-semibold py-2.5 rounded-lg">
                  Purchase
                </button>

                <button 
                  onClick={() => navigate(-1)}
                  className="w-full text-white border-2 border-white hover:bg-white hover:text-black transition-colors duration-200 font-semibold py-2.5 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <p>Booked seats: {showtime?.bookedSeats.length}</p>
                <p>
                  Available seats:{" "}
                  {showtime?.availableSeats - showtime?.bookedSeats.length}
                </p>
                <p>Total seats: {showtime?.availableSeats}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <p className="flex items-center">
                  <span className="mr-1">
                    <PiArmchairFill className="text-2xl" />
                  </span>
                  Available
                </p>
                <p className="flex items-center">
                  <span className="mr-1">
                    <PiArmchairFill className="text-2xl text-red-600" />
                  </span>
                  Booked
                </p>
                <p className="flex items-center">
                  <span className="mr-1">
                    <PiArmchairFill className="text-2xl text-green-600" />
                  </span>
                  Selected
                </p>
              </div>
            </div>

            <div className="flex flex-col my-6">
              <span className="font-bold text-center">SCREEN</span>
            </div>

            <div className="grid grid-cols-1 gap-4 self-center overflow-x-auto w-full">
              {rows.map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-start gap-2">
                  <div className="font-bold w-6">{row}</div>

                  {/* Seats 1–6 */}
                  <div className="flex gap-2">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((seat) => {
                      const seatId = `${row}${seat}`;
                      if (!availableSeatIds.includes(seatId)) return null;

                      return (
                        <button
                          key={seatId}
                          disabled={showtime?.bookedSeats?.includes(seatId)}
                          onClick={() =>
                            setSelectedSeats((prev) =>
                              prev.includes(seatId)
                                ? prev.filter((id) => id !== seatId)
                                : [...prev, seatId]
                            )
                          }>
                          <PiArmchairFill
                            className={`text-2xl md:text-3xl 
                            ${
                              selectedSeats.includes(seatId)
                                ? "text-green-500"
                                : showtime?.bookedSeats?.includes(seatId)
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-4 md:w-8"></div>

                  {/* Seats 7–14 */}
                  <div className="flex gap-2">
                    {Array.from({ length: 8 }, (_, i) => i + 7).map((seat) => {
                      const seatId = `${row}${seat}`;
                      if (!availableSeatIds.includes(seatId)) return null;

                      return (
                        <button
                          key={seatId}
                          disabled={showtime?.bookedSeats?.includes(seatId)}
                          onClick={() =>
                            setSelectedSeats((prev) =>
                              prev.includes(seatId)
                                ? prev.filter((id) => id !== seatId)
                                : [...prev, seatId]
                            )
                          }>
                          <PiArmchairFill
                            className={`text-2xl md:text-3xl 
                            ${
                              selectedSeats.includes(seatId)
                                ? "text-green-500"
                                : showtime?.bookedSeats?.includes(seatId)
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-4 md:w-8"></div>

                  {/* Seats 15–20 */}
                  <div className="flex gap-2">
                    {Array.from({ length: 6 }, (_, i) => i + 15).map((seat) => {
                      const seatId = `${row}${seat}`;
                      if (!availableSeatIds.includes(seatId)) return null;

                      return (
                        <button
                          key={seatId}
                          disabled={showtime?.bookedSeats?.includes(seatId)}
                          onClick={() =>
                            setSelectedSeats((prev) =>
                              prev.includes(seatId)
                                ? prev.filter((id) => id !== seatId)
                                : [...prev, seatId]
                            )
                          }>
                          <PiArmchairFill
                            className={`text-2xl md:text-3xl 
                            ${
                              selectedSeats.includes(seatId)
                                ? "text-green-500"
                                : showtime?.bookedSeats?.includes(seatId)
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
