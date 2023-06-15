import React from "react";
import { useSelector } from "react-redux";
import AdminTheaterItem from "../components/AdminTheaterItem";

const AdminListTheaters = () => {
  const theaters = useSelector((state) => state.theater.theaters);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Theaters Management</h1>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {theaters && theaters.map((theater) => (
          <div key={theater._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <img
                src={theater.cinemaImg}
                alt={theater.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{theater.name}</h3>
                <p className="text-sm text-gray-600">{theater.location.address}</p>
                <p className="text-sm text-gray-600">{theater.location.city}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {theater.amenities.map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-700 text-white">
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Amenities</th>
              <th className="border border-gray-300 p-2">Contact</th>
              <th className="border border-gray-300 p-2">Hours</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {theaters && theaters.map((theater) => (
              <AdminTheaterItem key={theater._id} theater={theater} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminListTheaters;
