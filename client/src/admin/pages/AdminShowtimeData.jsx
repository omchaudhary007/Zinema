import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import AdminAddShowtimeTime from "../components/AdminAddShowtimeTime";
import { halls } from "../../constants/hall";

const AdminShowtimeData = () => {
  const movies = useSelector((state) => state.movie.movies);
  const theaters = useSelector((state) => state.theater.theaters);
  const screens = useSelector((state) => state.screen.screens);

  const [formData, setFormData] = useState({
    movieId: "",
    theaterId: "",
    screenId: "",
    hall: "",
    date: "",
    price: "",
    availableSeats: "",
  });
  const [availableTime, setAvailableTime] = useState([
    { startTime: "", endTime: "" },
  ]);

  const handleAddTime = () => {
    setAvailableTime((prev) => [...prev, { startTime: "", endTime: "" }]);
  };

  const handleRemoveTime = (index) => {
    setAvailableTime((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleTimeChange = (index, field, value) => {
    setAvailableTime((prev) =>
      prev.map((time, i) => (i === index ? { ...time, [field]: value } : time))
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newShowtime = {
      ...formData,
      times: availableTime,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/showtime`,
        newShowtime
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Multiple Showtimes
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields (Same for all showtimes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Movie Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Movie
              </label>
              <select
                name="movieId"
                onChange={handleChange}
                value={formData.movieId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option disabled value="">
                  -- Select movie --
                </option>
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Theater Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theater
              </label>
              <select
                name="theaterId"
                onChange={handleChange}
                value={formData.theaterId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option disabled value="">
                  -- Select Theater --
                </option>
                {theaters.map((theater) => (
                  <option key={theater._id} value={theater._id}>
                    {theater.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Screen
              </label>
              <select
                name="screenId"
                onChange={handleChange}
                value={formData.screenId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option disabled value="">
                  -- Select Screen --
                </option>
                {screens.map((screen) => (
                  <option key={screen._id} value={screen._id}>
                    {screen.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cinema Hall
              </label>
              <select
                name="hall"
                onChange={handleChange}
                value={formData.hall}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option disabled value="">
                  -- Select Hall --
                </option>
                {halls.map((hall) => (
                  <option key={hall} value={hall}>
                    {hall}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={formData.date}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Showtime Repeater Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Showtimes
            </h3>

            <div className="space-y-4">
              <table className="w-full border border-gray-300 rounded-md shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left text-sm font-medium text-gray-700 p-2">
                      Start Time
                    </th>
                    <th className="text-left text-sm font-medium text-gray-700 p-2">
                      End Time
                    </th>
                    <th className="text-left text-sm font-medium text-gray-700 p-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {availableTime.map((time, index) => (
                    <AdminAddShowtimeTime
                      key={index}
                      time={time}
                      index={index}
                      handleTimeChange={handleTimeChange}
                      handleRemoveTime={handleRemoveTime}
                    />
                  ))}
                </tbody>
              </table>

              {/* Add Another Showtime Button */}
              <button
                type="button"
                onClick={handleAddTime}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Another Showtime
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="text-lg font-medium text-gray-800">
              Ticket Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              onChange={handleChange}
              value={formData.price}
              placeholder="12.99"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="pt-6">
              <label className="text-lg font-medium text-gray-800">
                Available Seats
              </label>
              <input
                type="number"
                min="1"
                placeholder="150"
                name="availableSeats"
                onChange={handleChange}
                value={formData.availableSeats}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Save All Showtimes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminShowtimeData;
