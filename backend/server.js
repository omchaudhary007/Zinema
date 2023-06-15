const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth.routes");
const refreshTokenRoutes = require("./routes/refreshToken.routes");
const movieRoutes = require("./routes/movie.routes");
const theaterRoutes = require("./routes/theater.routes");
const screenRoutes = require("./routes/screen.routes");
const showtimeRoutes = require("./routes/showtime.routes");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server running")
    });
  })
  .catch((err) => {
    console.log("something went wrong")
  });

app.use("/api/auth/", authRoutes);
app.use("/api/refreshToken/", refreshTokenRoutes);
app.use("/api/", movieRoutes);
app.use("/api/", theaterRoutes);
app.use("/api/", screenRoutes);
app.use("/api/", showtimeRoutes);
app.use("/api/user/", userRoutes);
