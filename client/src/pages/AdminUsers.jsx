import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.serverUrl}/admin/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${config.serverUrl}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default AdminUsers; 