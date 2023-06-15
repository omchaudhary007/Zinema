import React from "react";
import { useSelector } from "react-redux";
import AdminScreenItem from "../components/AdminScreenItem";

const AdminListScreens = () => {
  const screens = useSelector((state) => state.screen.screens);

  return (
    <div className="p-6 rounded-lg overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-indigo-700 text-white">
            <th className="border border-gray-300 p-2">Sceen Name</th>
            <th className="border border-gray-300 p-2">Seating Capacity</th>
            <th className="border border-gray-300 p-2">Screen Type</th>
            <th className="border border-gray-300 p-2">Features</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        {screens &&
          screens.map((screen) => (
            <AdminScreenItem key={screen._id} screen={screen} />
          ))}
      </table>
    </div>
  );
};

export default AdminListScreens;
