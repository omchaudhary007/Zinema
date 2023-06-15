import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import AdminModalRemove from "./AdminModalRemove";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toDeleteMovie } from "../../store/movieSlice";

const AdminMovieItem = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleRemoveMovie = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/movie/${movie._id}`
      );

      setModalOpen(false);
      dispatch(toDeleteMovie(movie._id));
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
              src={movie?.poster}
              alt="Jewelry Image"
              className="w-18 h-22 object-cover rounded"
            />
          </div>
        </td>
        <td className="border border-gray-300 p-2">{movie?.title}</td>
        <td className="border border-gray-300 p-2">
          {`${Math.floor(movie?.duration / 60)}h ${movie?.duration % 60}m`}
        </td>
        <td className="border border-gray-300 p-2">
          {movie?.releaseDate?.slice(0, 10)}
        </td>
        <td className="border border-gray-300 p-2">{movie?.director}</td>
        <td className="border border-gray-300 p-2">
          {movie?.overview?.slice(0, 5)}...
        </td>
        <td className="text-center">
          <div className="flex items-center justify-center gap-2 p-4">
            <button className="text-3xl text-green-600">
              <FaRegEdit
                onClick={() => navigate(`/admin/edit-movie/${movie?._id}`)}
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
          handleRemove={handleRemoveMovie}
        />
      </tr>
    </tbody>
  );
};

export default AdminMovieItem;
