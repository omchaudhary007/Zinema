import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config";

const AdminMovies = () => {
  // ... other code ...

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${config.serverUrl}/admin/movies`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setMovies(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("language", language);
      formData.append("releaseDate", releaseDate);
      formData.append("genre", genre);
      formData.append("director", director);
      formData.append("cast", cast);
      formData.append("poster", poster);

      const response = await axios.post(
        `${config.serverUrl}/admin/movies`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMovies([...movies, response.data]);
      toast.success("Movie added successfully");
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`${config.serverUrl}/admin/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setMovies(movies.filter((movie) => movie._id !== movieId));
      toast.success("Movie deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ... rest of the code ...
}; 