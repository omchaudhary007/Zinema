import React from "react";

const CreativeBookingsTable = () => {
  // Static data with movie posters
  const bookings = [
    {
      id: "BK123456",
      movie: "Dune: Part Two",
      poster: "/posters/dune2.jpg",
      cinema: "Cineplex Downtown",
      date: "2023-05-15",
      time: "18:30",
      seats: ["A12", "A13"],
      total: 24.5,
      status: "Confirmed",
      screen: "IMAX 3D",
    },
    {
      id: "BK789012",
      movie: "The Batman",
      poster: "/posters/batman.jpg",
      cinema: "Cineplex West Mall",
      date: "2023-05-18",
      time: "20:15",
      seats: ["B05", "B06", "B07"],
      total: 36.75,
      status: "Cancelled",
      screen: "Dolby Atmos",
    },
    {
      id: "BK345678",
      movie: "Spider-Man: No Way Home",
      poster: "/posters/spiderman.jpg",
      cinema: "Cineplex Eastside",
      date: "2023-05-20",
      time: "15:45",
      seats: ["C10"],
      total: 12.25,
      status: "Completed",
      screen: "Standard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full border-collapse">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Movie Bookings
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Actual HTML Table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Movie
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cinema
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seats
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screen
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors">
                  {/* Movie Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-12 rounded-md overflow-hidden shadow-sm">
                        <img
                          className="h-full w-full object-cover"
                          src={booking.poster}
                          alt={booking.movie}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.movie}
                        </div>
                        <div className="text-xs text-gray-500">
                          #{booking.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Cinema Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.cinema}
                    </div>
                  </td>

                  {/* Date & Time Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-xs text-gray-500">{booking.time}</div>
                  </td>

                  {/* Seats Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {booking.seats.map((seat) => (
                        <span
                          key={seat}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Screen Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.screen === "IMAX 3D"
                          ? "bg-purple-100 text-purple-800"
                          : booking.screen === "Dolby Atmos"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {booking.screen}
                    </span>
                  </td>

                  {/* Total Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${booking.total.toFixed(2)}
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View
                      </button>
                      <button className="text-amber-600 hover:text-amber-900">
                        Ticket
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{bookings.length}</span> of{" "}
                <span className="font-medium">{bookings.length}</span> bookings
              </p>
              <div className="flex space-x-2">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Your cinematic journey awaits • Refresh for updates
        </div>
      </div>
    </div>
  );
};

export default CreativeBookingsTable;
