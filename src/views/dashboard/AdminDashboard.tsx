"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import Usuarios from "@/components/adminComponents/UsersComponent";
import Administradores from "@/components/adminComponents/AdminsComponent";
import Empresas from "@/components/adminComponents/EmpresaComponent";
import Planes from "@/components/adminComponents/PlansComponent";
import Solicitudes from "@/components/adminComponents/SolicitudesComponent";
import Administracion from "@/components/adminComponents/AdministracionComponent";

const AdminDashboard = () => {
  const [selected, setSelected] = useState("Usuarios");

  const renderComponent = () => {
    switch (selected) {
      case "Usuarios":
        return <Usuarios />;
      case "Administradores":
        return <Administradores />;
      case "Empresas":
        return <Empresas />;
      case "Planes":
        return <Planes />;
      case "Solicitudes":
        return <Solicitudes />;
      case "Administración":
        return <Administracion />;
      default:
        return <Usuarios />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-stretch w-[90vw] mt-4 gap-4">
        <div className="w-[65%] bg-[#6D4098] p-4 rounded-md text-xl font-semibold text-white text-center flex items-center justify-center">
          Hola Admin
        </div>
np
        <div className="w-[35%] bg-[#6D4098] p-4 rounded-md flex items-center justify-start gap-3 text-white">
          <FaUserCircle size={40} />
          <div className="flex flex-col text-sm">
            <p className="font-semibold">Administrador</p>
            <p>algunmail@mail.com</p>
          </div>
        </div>
      </div>

      <div className="w-[90vw] mt-4 shadow-2xl">
        <div className="bg-[#6D4098] text-white p-4 rounded-t-md text-lg font-semibold text-center">
          ¿Qué deseas gestionar hoy?
        </div>
        <div className="bg-white p-6 flex flex-wrap gap-4 rounded-b-md justify-center">
          {[
            "Usuarios",
            "Administradores",
            "Empresas",
            "Planes",
            "Solicitudes",
            "Administración",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`px-4 py-2 rounded-md shadow-md transition-transform duration-200 transform hover:scale-105 cursor-pointer ${
                selected === item
                  ? "bg-[#6D4098] text-white"
                  : "bg-white text-[#6D4098] border border-[#6D4098]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="w-[90vw] min-h-screen mt-6">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
