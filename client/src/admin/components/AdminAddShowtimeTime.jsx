import React from "react";

const AdminAddShowtimeTime = ({
  time,
  handleRemoveTime,
  index,
  handleTimeChange,
}) => {
  return (
    <tr>
      <td className="p-2">
        <input
          type="time"
          name="startTime"
          value={time.startTime}
          onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </td>
      <td className="p-2">
        <input
          type="time"
          name="endTime"
          value={time.endTime}
          onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </td>
      <td className="p-2">
        <button
          type="button"
          onClick={() => handleRemoveTime(index)}
          className="w-full px-3 py-2 bg-red-700 text-white hover:bg-red-800 text-sm font-medium rounded-md">
          Remove
        </button>
      </td>
    </tr>
  );
};

export default AdminAddShowtimeTime;
