const express = require("express");
const { getUserProfile, getUserBookings } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.get("/bookings", authMiddleware, getUserBookings);

module.exports = router; 