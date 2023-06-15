import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import AdminCastItem from "../components/AdminCastItem";
import { genres } from "../../constants/genres";
import { ratings } from "../../constants/ratings";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toAddMovie, toEditMovie } from "../../store/movieSlice";
import ClipLoader from "react-spinners/ClipLoader";

const cloudName = "derc2steu";
const uploadPreset = "movie_preset";

const AdminMovieData = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    trailer: "",
    rating: "",
    releaseDate: "",
    duration: "",
    director: "",
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [formCastData, setFormCastData] = useState({
    cast: [{ artist: "", name: "" }],
  });
  const [images, setImages] = useState({
    poster: { file: null, preview: null },
    background: { file: null, preview: null },
  });

  useEffect(() => {
    if (isEdit && id) {
      const movieToEdit = movies.find((item) => item._id === id);
      setFormData({
        title: movieToEdit?.title || "",
        overview: movieToEdit?.overview || "",
        trailer: movieToEdit?.trailer || "",
        rating: movieToEdit?.rating || "",
        releaseDate: movieToEdit?.releaseDate.slice(0, 10) || "",
        duration: movieToEdit?.duration || "",
        director: movieToEdit?.director || "",
      });
      setSelectedGenres(movieToEdit?.genre || []);
      setFormCastData({ cast: movieToEdit?.cast || [] });
      setImages({
        poster: { file: "poster", preview: movieToEdit?.poster || "" },
        background: {
          file: "background",
          preview: movieToEdit?.background || "",
        },
      });
    } else {
      setFormData({
        title: "",
        overview: "",
        trailer: "",
        rating: "",
        releaseDate: "",
        duration: "",
        director: "",
      });
      setSelectedGenres([]);
      setFormCastData({
        cast: [{ artist: "", name: "" }],
      });
      setImages({
        poster: { file: null, preview: null },
        background: { file: null, preview: null },
      });
    }
  }, [isEdit, id, movies]);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setImages((prev) => ({
      ...prev,
      [type]: { file, preview },
    }));
  };

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selectedOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCastFormChange = (index, field, value) => {
    setFormCastData((prev) => ({
      ...prev,
      cast: formCastData.cast.map((cast, i) =>
        i === index ? { ...cast, [field]: value } : cast
      ),
    }));
  };

  const addCastForm = () => {
    setFormCastData((prev) => ({
      ...prev,
      cast: [...prev.cast, { artist: "", name: "" }],
    }));
  };

  const removeCastForm = (index) => {
    setFormCastData((prev) => ({
      ...prev,
      cast:
        prev.cast.length > 1
          ? prev.cast.filter((_, i) => i !== index)
          : prev.cast,
    }));
  };

  const uploadImages = async () => {
    const uploadedUrls = [];

    for (const key in images) {
      const file = images[key].file;
      if (!file) return;

      if (typeof file === "string") {
        uploadedUrls.push({
          type: key,
          url: images[key].preview,
        });
        continue;
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

        uploadedUrls.push({
          type: key,
          url: response.data.secure_url,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }

    return uploadedUrls;
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    let imageUrls = [];

    const hasAnyFile = Object.values(images).every(
      (image) => image.file !== null
    );

    if (!hasAnyFile) {
      toast.error("Please upload image.");
      return;
    }

    imageUrls = await uploadImages();

    const formatedUrls = Object.fromEntries(
      imageUrls.map((i) => [i.type, i.url])
    );

    const parsedData = {
      ...formData,
      ...formCastData,
      ...formatedUrls,
      genre: selectedGenres,
      duration: parseInt(formData.duration),
      releaseDate: new Date(formData.releaseDate).toISOString(),
    };

    try {
      let response;
      if (isEdit && id) {
        response = await axios.put(
          `http://localhost:8080/api/movie/${id}`,
          parsedData
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/movie",
          parsedData
        );
      }

      if (isEdit) {
        dispatch(
          toEditMovie({ movieId: id, updatedData: response.data.updatedMovie })
        );
      } else {
        dispatch(toAddMovie(response.data.newMovie));
      }

      navigate("/admin/list-movies");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-700 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Movie" : "Add New Movie"}
          </h2>
          <p className="text-indigo-200">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmitData} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-film text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={handleChange}
                    value={formData.title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Movie title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  rows="5"
                  required
                  onChange={handleChange}
                  value={formData.overview}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter movie synopsis..."></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Genres <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedGenres &&
                    selectedGenres.map((genre) => (
                      <span
                        key={genre}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                        {genre}
                      </span>
                    ))}
                </div>
                <select
                  id="genre"
                  name="genre"
                  multiple
                  required
                  onChange={handleGenreChange}
                  value={selectedGenres}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>

                <p className="mt-1 text-sm text-gray-500">
                  Hold Ctrl to select multiple genres
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Cast <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3" id="cast-container">
                  {formCastData &&
                    formCastData?.cast?.map((item, index) => (
                      <AdminCastItem
                        key={index}
                        item={item}
                        index={index}
                        removeCastForm={removeCastForm}
                        handleCastFormChange={handleCastFormChange}
                      />
                    ))}
                </div>
                <button
                  type="button"
                  onClick={addCastForm}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  <i className="fas fa-plus mr-1"></i> Add Cast Member
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                  Media Links
                </h3>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Poster <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg  hover:border-blue-400 transition duration-200 bg-gray-50 w-[150px] h-[200px]">
                    <input
                      type="file"
                      name="featuredImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "poster")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {!images.poster.preview ? (
                      <div className="flex flex-col items-center justify-center text-gray-500 pointer-events-none p-6">
                        <MdOutlineFileUpload className="text-3xl" />
                        <p className="text-sm text-center">
                          Click or drag image to upload
                        </p>
                      </div>
                    ) : (
                      <div className="w-full h-full">
                        <img
                          src={images.poster.preview}
                          alt="Preview"
                          className="w-[150px] h-full object-cover rounded-md shadow"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Background Image <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg  hover:border-blue-400 transition duration-200 bg-gray-50 h-45">
                    <input
                      type="file"
                      name="featuredImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "background")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {!images.background.preview ? (
                      <div className="flex flex-col items-center justify-center text-gray-500 pointer-events-none p-6">
                        <MdOutlineFileUpload className="text-3xl" />
                        <p className="text-sm">Click or drag image to upload</p>
                      </div>
                    ) : (
                      <div className="w-full h-full">
                        <img
                          src={images.background.preview}
                          alt="Preview"
                          className="h-full w-full object-cover rounded-md shadow"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Trailer URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fab fa-youtube text-gray-400"></i>
                    </div>
                    <input
                      type="url"
                      id="trailer"
                      name="trailer"
                      required
                      onChange={handleChange}
                      value={formData.trailer}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                  Details
                </h3>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-certificate text-gray-400"></i>
                    </div>
                    <select
                      id="rating"
                      name="rating"
                      required
                      onChange={handleChange}
                      value={formData.rating}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="" disabled>
                        Select rating
                      </option>
                      {ratings.map((rating) => (
                        <option key={rating} value={rating}>
                          {rating}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Release Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-calendar-alt text-gray-400"></i>
                    </div>
                    <input
                      type="date"
                      id="releaseDate"
                      name="releaseDate"
                      required
                      onChange={handleChange}
                      value={formData.releaseDate}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-clock text-gray-400"></i>
                    </div>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      min="1"
                      required
                      onChange={handleChange}
                      value={formData.duration}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="120"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Director <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user-tie text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="director"
                      name="director"
                      required
                      onChange={handleChange}
                      value={formData.director}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Director name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`px-6 py-2 ${
                isUploading
                  ? "bg-indigo-400 hover:bg-indigo-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <ClipLoader
                    color="white"
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span>Loading</span>
                </div>
              ) : isEdit ? (
                "Update Movie"
              ) : (
                "Add Movie"
              )}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 text-right">
            Fields marked with <span className="text-red-500">*</span> are
            required
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminMovieData;
