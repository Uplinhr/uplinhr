"use client";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";

const UserDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hola User, {user?.nombre}</h1>
    </div>
  );
};

export default UserDashboard;
