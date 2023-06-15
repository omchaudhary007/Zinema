import React from "react";
import ReactDOM from "react-dom";

const AdminModalRemove = ({ isOpen, isCancel, handleRemove }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/75 z-50"
      onClick={isCancel}>
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="text-gray-600 mt-2">
          Do you really want to remove this? This action cannot be undone.
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={isCancel}
            className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            No
          </button>
          <button
            onClick={handleRemove}
            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Yes, Remove
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AdminModalRemove;
