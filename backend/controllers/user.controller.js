const User = require("../models/user.model");
const Showtime = require("../models/showtime.model");
const Movie = require("../models/movie.model");
const Theater = require("../models/theater.model");
const Screen = require("../models/screen.model");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    // Get all showtimes where the user has booked seats
    const showtimes = await Showtime.find({
      bookedSeats: { $elemMatch: { userId: req.userId } }
    }).populate("movieId theaterId screenId");

    // Format the bookings data
    const bookings = showtimes.map(showtime => {
      const userSeats = showtime.bookedSeats.filter(seat => seat.userId === req.userId);
      return {
        id: showtime._id,
        movie: showtime.movieId.title,
        poster: showtime.movieId.poster,
        cinema: showtime.theaterId.name,
        date: showtime.date,
        time: showtime.startTime,
        seats: userSeats.map(seat => seat.seatNumber),
        total: userSeats.length * showtime.price,
        status: new Date(showtime.date) < new Date() ? "Completed" : "Confirmed",
        screen: showtime.screenId.name
      };
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUserProfile,
  getUserBookings
}; 