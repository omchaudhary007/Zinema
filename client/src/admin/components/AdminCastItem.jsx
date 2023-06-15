import React from "react";
import { FiMinus } from "react-icons/fi";

const AdminCastItem = ({
  item,
  removeCastForm,
  index,
  handleCastFormChange,
}) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-user text-gray-400"></i>
        </div>
        <input
          type="text"
          required
          value={item.artist}
          onChange={(e) =>
            handleCastFormChange(index, "artist", e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Actor name"
        />
      </div>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-theater-masks text-gray-400"></i>
        </div>
        <input
          type="text"
          required
          value={item.name}
          onChange={(e) => handleCastFormChange(index, "name", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Character name"
        />
      </div>
      <button
        type="button"
        onClick={() => removeCastForm(index)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center">
        <FiMinus />
      </button>
    </div>
  );
};

export default AdminCastItem;
