import React, { useEffect, useState } from "react";
import { features } from "../../constants/features";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toAddScreen, toEditScreen } from "../../store/screenSlice";

const AdminScreenData = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const screens = useSelector((state) => state.screen.screens);
  const [formData, setFormData] = useState({
    name: "",
    seatingCapacity: "",
    screenType: "",
  });
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    if (isEdit && id) {
      const screenToEdit = screens.find((screen) => screen._id === id);
      setFormData({
        name: screenToEdit?.name || "",
        seatingCapacity: screenToEdit?.seatingCapacity || "",
        screenType: screenToEdit?.screenType || "",
      });
      setSelectedFeatures(screenToEdit?.features);
    } else {
      setFormData({
        name: "",
        seatingCapacity: "",
        screenType: "",
      });
      setSelectedFeatures([]);
    }
  }, [isEdit, id, screens]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const screenData = {
      ...formData,
      features: selectedFeatures,
    };

    try {
      let response;
      if (isEdit && id) {
        response = await axios.put(
          `http://localhost:8080/api/screen/${id}`,
          screenData
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/api/screen`,
          screenData
        );
      }

      if (isEdit && id) {
        dispatch(
          toEditScreen({
            screenId: id,
            updatedData: response.data.updatedScreen,
          })
        );
      } else {
        dispatch(toAddScreen(response.data.newScreen));
      }

      toast.success(response.data.message);
      navigate("/admin/list-screens");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Screen" : "Create New Screen"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            {/* Screen Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Screen Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Screen 1, IMAX Auditorium"
              />
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seating Capacity*
              </label>
              <input
                type="number"
                min="1"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 150"
              />
            </div>

            {/* Screen Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Screen Type*
              </label>
              <select
                name="screenType"
                value={formData.screenType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled={true}>
                  -- Select screen type --
                </option>
                <option value="standard">Standard</option>
                <option value="imax">IMAX</option>
                <option value="4dx">4DX</option>
                <option value="dolby">Dolby Cinema</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screen Features*
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <label key={feature} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={feature}
                    checked={selectedFeatures.includes(feature)}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setSelectedFeatures((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((item) => item !== value)
                      );
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isEdit ? "Update Screen" : "Create Screen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminScreenData;
