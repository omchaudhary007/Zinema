import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toDeleteScreen } from "../../store/screenSlice";
import axios from "axios";
import { toast } from "react-toastify";
import AdminModalRemove from "./AdminModalRemove";

const AdminScreenItem = ({ screen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteScreen = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/screen/${screen._id}`
      );

      setModalOpen(false);
      toast.success(response.data.message);
      dispatch(toDeleteScreen(screen._id));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tbody>
      <tr className="bg-white border border-gray-300">
        <td className="border border-gray-300 p-2">{screen?.name}</td>
        <td className="border border-gray-300 p-2">
          {screen?.seatingCapacity}
        </td>
        <td className="border border-gray-300 p-2">
          {screen?.screenType.toUpperCase()}
        </td>
        <td className="border border-gray-300 p-2">
          {screen.features
            .map((item) => <li key={item}>{item}</li>)
            .slice(0, 2)}
        </td>
        <td className="text-center">
          <div className="flex items-center justify-center gap-2 p-4">
            <button className="text-3xl text-green-600">
              <FaRegEdit
                onClick={() => navigate(`/admin/edit-screen/${screen._id}`)}
                className="text-green-600"
              />
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="text-3xl text-red-600">
              <RxCross2 className="text-red-600" />
            </button>
          </div>
        </td>
        <AdminModalRemove
          isOpen={modalOpen}
          isCancel={() => setModalOpen(false)}
          handleRemove={handleDeleteScreen}
        />
      </tr>
    </tbody>
  );
};

export default AdminScreenItem;
