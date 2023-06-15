import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import AdminModalRemove from "./AdminModalRemove";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toDeleteTheater } from "../../store/theaterSlice";

const AdminTheaterItem = ({ theater }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveTheater = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/theater/${theater._id}`
      );

      setIsModalOpen(false);
      dispatch(toDeleteTheater(theater._id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tbody>
      <tr className="bg-white border border-gray-300">
        <td className="border border-gray-300 p-2 text-center">
          <div className="flex justify-center items-center">
            <img
              src={theater.cinemaImg}
              alt="Jewelry Image"
              className="w-18 h-22 object-cover rounded"
            />
          </div>
        </td>
        <td className="border border-gray-300 p-2">{theater.name}</td>
        <td className="border border-gray-300 p-2">
          {theater.location.address}
        </td>
        <td className="border border-gray-300 p-2">
          <ul>
            {theater.amenities
              .map((item) => (
                <li key={item} className="text-sm">
                  - {item}
                </li>
              ))
              .slice(0, 3)}
          </ul>
        </td>
        <td className="border border-gray-300 p-2">
          <ul>
            {Object.entries(theater.contact).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}:{" "}
                </span>
                {value}
              </li>
            ))}
          </ul>
        </td>
        <td className="border border-gray-300 p-2">
          {" "}
          <ul>
            {Object.entries(theater.operatingHours).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}:{" "}
                </span>
                {value}
                {parseInt(value.split(":")[0]) < 12 ? "am" : "pm"}
              </li>
            ))}
          </ul>
        </td>
        <td className="text-center">
          <div className="flex items-center justify-center gap-2 p-4">
            <button className="text-3xl text-green-600">
              <FaRegEdit
                onClick={() => navigate(`/admin/edit-theater/${theater._id}`)}
                className="text-green-600"
              />
            </button>
            <button className="text-3xl text-red-600">
              <RxCross2
                onClick={() => setIsModalOpen(true)}
                className="text-red-600"
              />
            </button>
          </div>
        </td>
        <AdminModalRemove
          isOpen={isModalOpen}
          isCancel={() => setIsModalOpen(false)}
          handleRemove={handleRemoveTheater}
        />
      </tr>
    </tbody>
  );
};

export default AdminTheaterItem;
