import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserDashboard from "@/views/dashboard/UserDashboard";

const AdminPage = () => {
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  );
};

export default AdminPage;
