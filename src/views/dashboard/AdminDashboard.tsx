"use client";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";

const AdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hola Admin, {user?.nombre}</h1>
    </div>
  );
};

export default AdminDashboard;
