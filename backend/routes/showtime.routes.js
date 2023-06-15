const express = require("express");
const {
  postShowtime,
  getShowtimes,
  updateBookedSeats,
} = require("../controllers/showtime.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/showtime", postShowtime);
router.get("/showtime", getShowtimes);
router.put("/showtime/:showtimeId/book-seats", authMiddleware, updateBookedSeats);

module.exports = router;
