import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { amenities } from "../../constants/amenities";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toAddTheater, toEditTheater } from "../../store/theaterSlice";

const cloudName = "derc2steu";
const uploadPreset = "movie_preset";

const AdminTheaterData = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theaters = useSelector((state) => state.theater.theaters);

  const [cinemaImage, setCinemaImage] = useState({
    image: "",
    preview: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      city: "",
      mapUrl: "",
    },
    contact: {
      phone: "",
      email: "",
    },
    operatingHours: {
      open: "",
      close: "",
    },
  });

  useEffect(() => {
    const theaterToEdit = theaters.find((theater) => theater._id === id);
    if (isEdit && id) {
      setFormData({
        name: theaterToEdit.name || "",
        location: {
          address: theaterToEdit.location.address || "",
          city: theaterToEdit.location.city || "",
          mapUrl: theaterToEdit.location.mapUrl || "",
        },
        contact: {
          phone: theaterToEdit.contact.phone || "",
          email: theaterToEdit.contact.email || "",
        },
        operatingHours: {
          open: theaterToEdit.operatingHours.open || "",
          close: theaterToEdit.operatingHours.close || "",
        },
      });
      setSelectedAmenities(theaterToEdit.amenities);
      setCinemaImage({
        image: theaterToEdit.cinemaImg,
        preview: theaterToEdit.cinemaImg,
      });
    } else {
      setFormData({
        name: "",
        location: {
          address: "",
          city: "",
          mapUrl: "",
        },
        contact: {
          phone: "",
          email: "",
        },
        operatingHours: {
          open: "",
          close: "",
        },
      });
      setCinemaImage({
        image: "",
        preview: "",
      });
      setSelectedAmenities([]);
    }
  }, [isEdit, id, theaters]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setCinemaImage(() => ({
      image: file,
      preview,
    }));
  };

  const uploadImage = async () => {
    let uploadedUrl = "";

    const file = cinemaImage.image;
    if (!file) return;

    if (typeof file === "string") {
      uploadedUrl = cinemaImage.image;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "movies");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      uploadedUrl = response.data.secure_url;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    return uploadedUrl;
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const imageCinema = await uploadImage();

    const theaterData = {
      ...formData,
      amenities: selectedAmenities,
      cinemaImg: imageCinema,
    };

    try {
      let response;
      if (isEdit && id) {
        response = await axios.put(
          `http://localhost:8080/api/theater/${id}`,
          theaterData
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/api/theater`,
          theaterData
        );
      }

      if (isEdit && id) {
        dispatch(
          toEditTheater({
            theaterId: id,
            updatedData: response.data.updatedTheater,
          })
        );
      } else {
        dispatch(toAddTheater(response.data.newTheater));
      }

      navigate("/admin/list-theaters");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? "Edit Theater" : "Create New Theater"}
      </h2>

      <form onSubmit={handleSubmitData} className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theater Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Grand Cineplex"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theater Image URL*
            </label>
            <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg  hover:border-blue-400 transition duration-200 bg-gray-50 w-full h-[200px]">
              <input
                type="file"
                name="featuredImage"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {!cinemaImage.preview ? (
                <div className="flex flex-col items-center justify-center text-gray-500 pointer-events-none p-6">
                  <MdOutlineFileUpload className="text-3xl" />
                  <p className="text-sm text-center">
                    Click or drag image to upload
                  </p>
                </div>
              ) : (
                <div className="w-full h-full">
                  <img
                    src={cinemaImage.preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md shadow"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Cinema Street"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Movieville"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps URL*
            </label>
            <input
              type="text"
              name="location.mapUrl"
              value={formData.location.mapUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://maps.google.com/?q=123+Cinema+Street"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Amenities
          </h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Available Amenities*
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity) => (
                <label key={amenity} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setSelectedAmenities((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((item) => item !== value)
                      );
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@theater.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Operating Hours
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Time*
              </label>
              <input
                type="time"
                name="operatingHours.open"
                value={formData.operatingHours.open}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Time*
              </label>
              <input
                type="time"
                name="operatingHours.close"
                value={formData.operatingHours.close}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {id ? "Update Theater" : "Create Theater"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTheaterData;
