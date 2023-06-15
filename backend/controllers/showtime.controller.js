const Showtime = require("../models/showtime.model");

const postShowtime = async (req, res) => {
  try {
    const {
      screenId,
      movieId,
      theaterId,
      hall,
      date,
      availableSeats,
      price,
      times,
    } = req.body;

    const showtimeResults = [];

    for (let time of times) {
      const { startTime, endTime } = time;

      // const showtimeExist = await Showtime.findOne({
      //   movieId,
      //   screenId,
      //   theaterId,
      //   startTime,
      //   hall,
      // });

      // if (showtimeExist) {
      //   return res.status(400).json({ message: "Showtime already exist" });
      // }

      const showtime = new Showtime({
        screenId,
        movieId,
        theaterId,
        date,
        hall,
        price: parseInt(price),
        availableSeats: parseInt(availableSeats),
        startTime,
        endTime,
      });

      const newShowtime = await showtime.save();

      showtimeResults.push(newShowtime);
    }

    res.status(200).json({
      message: "Showtimes created successfully",
      newShowtimes: showtimeResults,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getShowtimes = async (req, res) => {
  try {
    const movieId = req.query.movieId;

    // Build query based on filters
    const query = {};
    if (movieId) {
      query.movieId = movieId;
    }

    const showtimes = await Showtime.find(query)
      .sort({ date: 1, startTime: 1 });

    if (!showtimes) {
      return res.status(404).json({ message: "No showtimes found" });
    }

    res.status(200).json({
      showtimes,
      totalShowtimes: showtimes.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookedSeats = async (req, res) => {
  try {
    const { showtimeId } = req.params;
    const { seats } = req.body;

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Check if seats are already booked
    const isSeatBooked = seats.some(seat => showtime.bookedSeats.includes(seat));
    if (isSeatBooked) {
      return res.status(400).json({ message: "One or more seats are already booked" });
    }

    // Add new booked seats
    showtime.bookedSeats = [...showtime.bookedSeats, ...seats];
    await showtime.save();

    res.status(200).json({
      message: "Seats booked successfully",
      showtime
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking seats", error: error.message });
  }
};

module.exports = { postShowtime, getShowtimes, updateBookedSeats };
