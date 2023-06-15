import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${config.serverUrl}/admin/bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setBookings(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`${config.serverUrl}/admin/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {/* Render your bookings component here */}
    </div>
  );
};

export default AdminBookings; 