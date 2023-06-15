import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <div className="bg-white shadow-sm p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Sales</p>
              <p className="text-2xl font-bold mt-1">$2,450</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              +12%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Tickets Sold
              </p>
              <p className="text-2xl font-bold mt-1">1,234</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              +5%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Movies</p>
              <p className="text-2xl font-bold mt-1">18</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
              -2
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Occupancy Rate
              </p>
              <p className="text-2xl font-bold mt-1">68%</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              +3%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg mx-6 p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
              <svg
                className="h-5 w-5 text-blue-600"
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
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                New movie added:{" "}
                <span className="text-blue-600">Dune: Part Two</span>
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Showtime updated for{" "}
                <span className="text-blue-600">The Marvels</span>
              </p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
