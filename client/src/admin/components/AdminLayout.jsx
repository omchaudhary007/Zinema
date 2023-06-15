import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <header>
        <AdminSidebar />
      </header>
      <div className="flex-1 overflow-auto min-h-screen">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
