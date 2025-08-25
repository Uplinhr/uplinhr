import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/views/dashboard/AdminDashboard";

const AdminPage = () => {
  return (
     <ProtectedRoute>
   
       <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminPage;