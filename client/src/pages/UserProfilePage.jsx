import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../config";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.storage.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileResponse = await axios.get(
          `${config.serverUrl}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUser(profileResponse.data);

        const bookingsResponse = await axios.get(
          `${config.serverUrl}/user/bookings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setBookings(bookingsResponse.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your profile</h2>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter(booking => booking.status === "Confirmed");
  const pastBookings = bookings.filter(booking => booking.status === "Completed");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-[70px]">
        {/* User Profile Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
              {user.firstName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Active Bookings Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Active Bookings
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {activeBookings.map((booking) => (
              <div key={booking.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.movie}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} • {booking.time}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.screen} • Seats: {booking.seats.join(", ")}
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <img
                        src={booking.poster}
                        alt={`QR Code for ${booking.id}`}
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-900">
                      Booking ID: {booking.id}
                    </span>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm font-medium">
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking History Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Booking History
          </h2>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Movie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seats
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pastBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.movie}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} • {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{booking.seats.join(", ")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{booking.status}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
