'use client'
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { FaSearch, FaEdit, FaFilter, FaTimes, FaBars } from "react-icons/fa";
import { Empresa } from "@/interfaces/index";

const EmpresaComponent = () => {
  const { empresas, fetchEmpresas, editEmpresa } = useAdminStore();
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [orden, setOrden] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [activeEdit, setActiveEdit] = useState(true);
  const [idUsuarioEdit, setIdUsuarioEdit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, [fetchEmpresas]);

  const formatDateString = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      if (dateString.includes("T")) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Fecha inválida";
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      if (dateString.includes("/")) {
        const [year, month, day] = dateString.split("T")[0].split("/");
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      }
      return dateString;
    } catch {
      return dateString || "N/A";
    }
  };

  const filtered = empresas
    .filter((e) => e?.nombre?.toLowerCase().includes(search.toLowerCase()))
    .filter((e) =>
      estado === "Todos" ? true : estado === "Activo" ? e?.active : !e?.active
    )
    .sort((a, b) => {
      if (a.active !== b.active) {
        return a.active ? -1 : 1;
      }
      
      const getDateValue = (dateStr: string | null | undefined) => {
        if (!dateStr) return 0;
        try {
          return new Date(dateStr).getTime();
        } catch {
          return 0;
        }
      };
      const dateA = getDateValue(a?.fecha_alta);
      const dateB = getDateValue(b?.fecha_alta);
      return orden === "asc" ? dateA - dateB : dateB - dateA;
    });

  const openEditModal = (empresa: Empresa) => {
    setIdEdit(empresa?.id ?? null);
    setNombreEdit(empresa?.nombre ?? "");
    setEmailEdit(empresa?.email ?? "");
    setActiveEdit(empresa?.active ?? true);
    setIdUsuarioEdit(empresa?.id_usuario ?? null);
    setShowModal(true);
  };

  const handleEditEmpresa = async () => {
    if (idEdit !== null && idUsuarioEdit !== null) {
      setLoading(true);
      try {
        await editEmpresa(idEdit, {
          nombre: nombreEdit,
          email: emailEdit,
          active: activeEdit,
          id_usuario: idUsuarioEdit,
        });
        await fetchEmpresas();
        setShowModal(false);
      } catch (error) {
        console.error("Error al editar empresa:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 md:p-6 font-['Poppins']">
      <h1 className="text-xl md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Lista de empresas
      </h1>

      <div className="mb-4 md:mb-6">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empresa"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:border-[#6d4098] focus:ring-1 focus:ring-[#6d4098]"
            />
          </div>

          <button 
            className="md:hidden flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaBars />
            <span>Filtros</span>
          </button>

          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-start md:items-center gap-2 md:gap-4 mt-2 md:mt-0`}>
            <div className="flex items-center gap-2 text-gray-500">
              <FaFilter />
              <span>Filtrar por:</span>
            </div>

            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg shadow focus:outline-none focus:border-[#6d4098] focus:ring-1 focus:ring-[#6d4098]"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as "asc" | "desc")}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg shadow focus:outline-none focus:border-[#6d4098] focus:ring-1 focus:ring-[#6d4098]"
            >
              <option value="asc">Fecha Ascendente</option>
              <option value="desc">Fecha Descendente</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
        <table className="w-full text-sm text-left min-w-[600px] md:min-w-full">
          <thead className="bg-[#6d4098] text-white">
            <tr>
              <th className="px-3 py-2 md:px-4 md:py-3">Nombre de la empresa</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Email</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Estado</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Fecha</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Última modificación</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr
                key={e?.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-3 py-2 md:px-4 md:py-3">{e?.nombre ?? "N/A"}</td>
                <td className="px-3 py-2 md:px-4 md:py-3">{e?.email ?? "N/A"}</td>
                <td className="px-3 py-2 md:px-4 md:py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      e?.active ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {e?.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-3 py-2 md:px-4 md:py-3">{formatDateString(e?.fecha_alta)}</td>
                <td className="px-3 py-2 md:px-4 md:py-3">{formatDateString(e?.ultima_mod)}</td>
                <td className="px-3 py-2 md:px-4 md:py-3">
                  <button
                    className="text-[#6d4098] items-center justify-center cursor-pointer hover:text-[#512e73]"
                    onClick={() => openEditModal(e)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No se encontraron empresas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => !loading && setShowModal(false)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative z-10 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <button
                onClick={() => !loading && setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                disabled={loading}
              >
                <FaTimes size={20} />
              </button>
              
              <h3 className="text-lg md:text-xl font-semibold text-[#6d4098] mb-4 md:mb-6 text-center">
                Editar Empresa
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la empresa
                  </label>
                  <input
                    type="text"
                    value={nombreEdit}
                    onChange={(e) => setNombreEdit(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6d4098] focus:ring-1 focus:ring-[#6d4098]"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={emailEdit}
                    onChange={(e) => setEmailEdit(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6d4098] focus:ring-1 focus:ring-[#6d4098]"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <div className="flex space-x-2 md:space-x-4">
                    <button
                      className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer ${
                        activeEdit 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => !loading && setActiveEdit(true)}
                      disabled={loading}
                    >
                      ACTIVO
                    </button>
                    <button
                      className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer ${
                        !activeEdit 
                          ? "bg-red-600 text-white" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => !loading && setActiveEdit(false)}
                      disabled={loading}
                    >
                      INACTIVO
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-gray-200">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer order-2 sm:order-1"
                  onClick={() => !loading && setShowModal(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 order-1 sm:order-2 mb-2 sm:mb-0"
                  onClick={handleEditEmpresa}
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpresaComponent;