"use client";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import {
  FaSearch,
  FaEdit,
  FaFilter,
  FaTimes,
  FaBars,
  FaPlus,
  FaEye,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "sonner";
import { Empresa } from "@/interfaces/index";

const EmpresaComponent = () => {
  const {
    empresas,
    users,
    fetchEmpresas,
    fetchUsers,
    createEmpresa,
    editEmpresa,
  } = useAdminStore();

  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [orden, setOrden] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalDetalles, setShowModalDetalles] = useState(false);
  const [empresaDetalles, setEmpresaDetalles] = useState<Empresa | null>(null);

  const [idEdit, setIdEdit] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [nombreFantasia, setNombreFantasia] = useState("");
  const [cuit, setCuit] = useState("");
  const [condicionIva, setCondicionIva] = useState("Responsable inscripto");
  const [tipoSocietario, setTipoSocietario] = useState("SA");
  const [actividadPrincipal, setActividadPrincipal] = useState("");
  const [domicilioCalle, setDomicilioCalle] = useState("");
  const [domicilioCiudad, setDomicilioCiudad] = useState("");
  const [domicilioPais, setDomicilioPais] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [activeEdit, setActiveEdit] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmpresas();
    fetchUsers();
  }, [fetchEmpresas, fetchUsers]);

  useEffect(() => {
    document.body.style.overflow =
      showModalCrear || showModalEditar || showModalDetalles ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModalCrear, showModalEditar, showModalDetalles]);

  const filtered = empresas
    .filter((e) => e !== null && e !== undefined)
    .filter((e) =>
      (e.nombre ?? "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((e) =>
      estado === "Todos" ? true : estado === "Activo" ? e.active : !e.active
    )
    .sort((a, b) => {
      if (a.active !== b.active) return a.active ? -1 : 1;
      const dateA = a.fecha_alta ? new Date(a.fecha_alta).getTime() : 0;
      const dateB = b.fecha_alta ? new Date(b.fecha_alta).getTime() : 0;
      return orden === "asc" ? dateA - dateB : dateB - dateA;
    });

  const usersWithoutCompany = users.filter(
    (user) =>
      user.rol?.toLowerCase() === "cliente" &&
      !empresas.some((emp) => emp.id_usuario === user.id)
  );

  const openCreateModal = () => {
    setIdEdit(null);
    setNombre("");
    setEmail("");
    setNombreFantasia("");
    setCuit("");
    setCondicionIva("Responsable inscripto");
    setTipoSocietario("SA");
    setActividadPrincipal("");
    setDomicilioCalle("");
    setDomicilioCiudad("");
    setDomicilioPais("");
    setCodigoPostal("");
    setIdUsuario(
      usersWithoutCompany.length > 0 ? usersWithoutCompany[0].id : null
    );
    setShowModalCrear(true);
  };

  const openEditModal = (empresa: Empresa) => {
    setIdEdit(empresa?.id);
    setNombre(empresa?.nombre);
    setEmail(empresa?.email);
    setNombreFantasia(empresa?.nombre_fantasia);
    setCuit(empresa?.cuit);
    setCondicionIva(empresa?.condicion_iva);
    setTipoSocietario(empresa?.tipo_societario);
    setActividadPrincipal(empresa?.actividad_principal || "");
    setDomicilioCalle(empresa?.domicilio_legal_calle_numero);
    setDomicilioCiudad(empresa?.domicilio_legal_ciudad);
    setDomicilioPais(empresa?.domicilio_legal_pais);
    setCodigoPostal(empresa?.codigo_postal);
    setIdUsuario(empresa?.id_usuario);
    setActiveEdit(empresa?.active);
    setShowModalEditar(true);
  };

  const openDetallesModal = (empresa: Empresa) => {
    setEmpresaDetalles(empresa);
    setShowModalDetalles(true);
  };

  const handleSubmitCrear = async () => {
    if (!idUsuario) {
      toast.error("Debe seleccionar un usuario");
      return;
    }
    setLoading(true);
    try {
      await createEmpresa({
        nombre: nombre.substring(0, 50),
        email: email.substring(0, 50),
        nombre_fantasia: nombreFantasia.substring(0, 50),
        cuit: cuit.substring(0, 50),
        condicion_iva: condicionIva,
        tipo_societario: tipoSocietario,
        actividad_principal: actividadPrincipal.substring(0, 50),
        domicilio_legal_calle_numero: domicilioCalle.substring(0, 50),
        domicilio_legal_ciudad: domicilioCiudad.substring(0, 50),
        domicilio_legal_pais: domicilioPais.substring(0, 50),
        codigo_postal: codigoPostal.substring(0, 50),
        id_usuario: idUsuario,
      });
      toast.success("Empresa creada exitosamente");
      setShowModalCrear(false);
      fetchEmpresas();
    } catch (err) {
      console.error(err);
      toast.error("Error al crear la empresa");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditar = async () => {
    if (!idUsuario || idEdit === null) return;
    setLoading(true);
    try {
      await editEmpresa(idEdit, {
        nombre: nombre.substring(0, 50),
        email: email.substring(0, 50),
        nombre_fantasia: nombreFantasia.substring(0, 50),
        cuit: cuit.substring(0, 50),
        condicion_iva: condicionIva,
        tipo_societario: tipoSocietario,
        actividad_principal: actividadPrincipal.substring(0, 50),
        domicilio_legal_calle_numero: domicilioCalle.substring(0, 50),
        domicilio_legal_ciudad: domicilioCiudad.substring(0, 50),
        domicilio_legal_pais: domicilioPais.substring(0, 50),
        codigo_postal: codigoPostal.substring(0, 50),
        active: activeEdit,
        id_usuario: idUsuario,
      });
      toast.success("Empresa actualizada exitosamente");
      setShowModalEditar(false);
      fetchEmpresas();
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la empresa");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return isNaN(d.getTime())
      ? "Fecha inválida"
      : `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="p-4 md:p-6 font-['Poppins']">
      <h1 className="text-xl md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Lista de empresas
      </h1>

      <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empresa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:border-[#6d4098] focus:ring-1 focus:ring-[#6d4098] cursor-pointer"
            maxLength={50}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="md:hidden flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaBars />
            <span>Filtros</span>
          </button>

          <button
            className="md:hidden bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer ml-auto"
            onClick={openCreateModal}
          >
            <FaPlus /> Agregar
          </button>
        </div>

        <div
          className={`${
            showFilters ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mt-2 md:mt-0 w-full md:w-auto`}
        >
          <div className="flex items-center gap-2 text-gray-500">
            <FaFilter />
            Filtrar por:
          </div>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="px-3 py-2 border rounded-lg cursor-pointer"
          >
            <option value="Todos">Todos</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value as "asc" | "desc")}
            className="px-3 py-2 border rounded-lg cursor-pointer"
          >
            <option value="asc">Fecha Ascendente</option>
            <option value="desc">Fecha Descendente</option>
          </select>
        </div>

        <button
          className="hidden md:flex bg-green-500 text-white px-4 py-2 rounded-lg items-center gap-2 cursor-pointer ml-auto md:ml-0"
          onClick={openCreateModal}
        >
          <FaPlus /> Agregar Empresa
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
        <table className="w-full text-sm text-left min-w-[600px] md:min-w-full">
          <thead className="bg-[#6d4098] text-white">
            <tr>
              <th className="px-3 py-2 md:px-4 md:py-3">Nombre</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Email</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Estado</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Fecha</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Última modificación</th>
              <th className="px-3 py-2 md:px-4 md:py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .filter((e) => e !== null && e !== undefined)
              .map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2 md:px-4 md:py-3">{e.nombre}</td>
                  <td className="px-3 py-2 md:px-4 md:py-3">{e.email}</td>
                  <td className="px-3 py-2 md:px-4 md:py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        e.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3">
                    {formatDate(e.fecha_alta ?? undefined)}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3">
                    {formatDate(e.ultima_mod ?? undefined)}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 flex items-center gap-2">
                    <button
                      className="text-[#6d4098] hover:text-[#512e73] cursor-pointer"
                      onClick={() => openEditModal(e)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-[#6d4098] hover:text-[#512e73] cursor-pointer"
                      onClick={() => openDetallesModal(e)}
                    >
                      <FaEye />
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

      {showModalCrear && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => !loading && setShowModalCrear(false)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative z-10 shadow-lg max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <button
              onClick={() => !loading && setShowModalCrear(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes />
            </button>
            <h3 className="text-lg md:text-xl font-semibold text-[#6d4098] mb-4 md:mb-6 text-center">
              Crear Empresa
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Fantasía
                </label>
                <input
                  type="text"
                  value={nombreFantasia}
                  onChange={(e) => setNombreFantasia(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CUIT
                </label>
                <input
                  type="text"
                  value={cuit}
                  onChange={(e) => setCuit(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condición IVA
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    value={condicionIva}
                    onChange={(e) => setCondicionIva(e.target.value)}
                    className="w-full px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white cursor-pointer"
                    size={5}
                  >
                    <option value="Responsable inscripto">
                      Responsable inscripto
                    </option>
                    <option value="Monotributista">Monotributista</option>
                    <option value="Exento">Exento</option>
                    <option value="No_Alcanzado">No Alcanzado</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Societario
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    value={tipoSocietario}
                    onChange={(e) => setTipoSocietario(e.target.value)}
                    className="w-full px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white cursor-pointer"
                    size={5}
                  >
                    <option value="SA">SA</option>
                    <option value="SAU">SAU</option>
                    <option value="SRL">SRL</option>
                    <option value="SAS">SAS</option>
                    <option value="SCS">SCS</option>
                    <option value="SCA">SCA</option>
                    <option value="Cooperativa">Cooperativa</option>
                    <option value="Asociacion civil">Asociación civil</option>
                    <option value="Fundacion">Fundación</option>
                    <option value="Sociedad de hecho">Sociedad de hecho</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actividad Principal
                </label>
                <input
                  type="text"
                  value={actividadPrincipal}
                  onChange={(e) => setActividadPrincipal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calle y número
                </label>
                <input
                  type="text"
                  value={domicilioCalle}
                  onChange={(e) => setDomicilioCalle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  value={domicilioCiudad}
                  onChange={(e) => setDomicilioCiudad(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <input
                  type="text"
                  value={domicilioPais}
                  onChange={(e) => setDomicilioPais(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código postal
                </label>
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    value={idUsuario || ""}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                    className="w-full px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white cursor-pointer text-sm"
                    size={5}
                  >
                    {usersWithoutCompany.map((u) => (
                      <option key={u.id} value={u.id} className="text-sm">
                        {u.nombre}{" "}
                        <span className="text-xs text-gray-500">
                          ({u.email})
                        </span>
                      </option>
                    ))}
                  </select>
                </div>
                {usersWithoutCompany.length === 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    No hay usuarios disponibles sin empresa
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmitCrear}
                  disabled={loading}
                  className="bg-[#6d4098] text-white px-4 py-2 rounded-lg hover:bg-[#512e73] cursor-pointer flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Cargando...
                    </>
                  ) : (
                    "Crear Empresa"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalEditar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => !loading && setShowModalEditar(false)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative z-10 shadow-lg max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <button
              onClick={() => !loading && setShowModalEditar(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes />
            </button>
            <h3 className="text-lg md:text-xl font-semibold text-[#6d4098] mb-4 md:mb-6 text-center">
              Editar Empresa
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Fantasía
                </label>
                <input
                  type="text"
                  value={nombreFantasia}
                  onChange={(e) => setNombreFantasia(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CUIT
                </label>
                <input
                  type="text"
                  value={cuit}
                  onChange={(e) => setCuit(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condición IVA
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    value={condicionIva}
                    onChange={(e) => setCondicionIva(e.target.value)}
                    className="w-full px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white cursor-pointer"
                    size={5}
                  >
                    <option value="Responsable inscripto">
                      Responsable inscripto
                    </option>
                    <option value="Monotributista">Monotributista</option>
                    <option value="Exento">Exento</option>
                    <option value="No_Alcanzado">No Alcanzado</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Societario
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    value={tipoSocietario}
                    onChange={(e) => setTipoSocietario(e.target.value)}
                    className="w-full px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white cursor-pointer"
                    size={5}
                  >
                    <option value="SA">SA</option>
                    <option value="SAU">SAU</option>
                    <option value="SRL">SRL</option>
                    <option value="SAS">SAS</option>
                    <option value="SCS">SCS</option>
                    <option value="SCA">SCA</option>
                    <option value="Cooperativa">Cooperativa</option>
                    <option value="Asociacion civil">Asociación civil</option>
                    <option value="Fundacion">Fundación</option>
                    <option value="Sociedad de hecho">Sociedad de hecho</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actividad Principal
                </label>
                <input
                  type="text"
                  value={actividadPrincipal}
                  onChange={(e) => setActividadPrincipal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calle y número
                </label>
                <input
                  type="text"
                  value={domicilioCalle}
                  onChange={(e) => setDomicilioCalle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  value={domicilioCiudad}
                  onChange={(e) => setDomicilioCiudad(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <input
                  type="text"
                  value={domicilioPais}
                  onChange={(e) => setDomicilioPais(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código postal
                </label>
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    value={idUsuario || ""}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                    className="w-full px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white cursor-pointer"
                    size={5}
                  >
                    {users
                      .filter((u) => u.rol?.toLowerCase() === "cliente")
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.nombre} ({u.email})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <div className="flex space-x-2 md:space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer ${
                      activeEdit
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setActiveEdit(true)}
                    disabled={loading}
                  >
                    ACTIVO
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer ${
                      !activeEdit
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setActiveEdit(false)}
                    disabled={loading}
                  >
                    INACTIVO
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmitEditar}
                  disabled={loading}
                  className="bg-[#6d4098] text-white px-4 py-2 rounded-lg hover:bg-[#512e73] cursor-pointer flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Cargando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalDetalles && empresaDetalles && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowModalDetalles(false)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative z-10 shadow-lg max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <button
              onClick={() => setShowModalDetalles(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg md:text-xl font-semibold text-[#6d4098] mb-4 md:mb-6 text-center">
              Detalles Completos de la Empresa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <p className="px-3 py-2 rounded-lg bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.nombre}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="px-3 py-2 rounded-lg bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Fantasía
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.nombre_fantasia}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CUIT
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.cuit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condición IVA
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.condicion_iva}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Societario
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.tipo_societario}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actividad Principal
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.actividad_principal || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domicilio
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.domicilio_legal_calle_numero}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.domicilio_legal_ciudad}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.domicilio_legal_pais}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <p className="px-3 py-2 rounded-lg  bg-opacity-10 text-[#6d4098] font-semibold">
                  {empresaDetalles.codigo_postal}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <p
                  className={`px-3 py-2 rounded-lg text-white text-center font-semibold ${
                    empresaDetalles.active ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {empresaDetalles.active ? "ACTIVO" : "INACTIVO"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Alta
                </label>
                <p className="px-3 py-2 rounded-lg bg-opacity-10 text-[#6d4098] font-semibold">
                  {formatDate(empresaDetalles.fecha_alta ?? undefined)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Última Modificación
                </label>
                <p className="px-3 py-2 rounded-lg bg-opacity-10 text-[#6d4098] font-semibold">
                  {formatDate(empresaDetalles.ultima_mod ?? undefined)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModalDetalles(false)}
                className="bg-[#6d4098] text-white px-4 py-2 rounded-lg hover:bg-[#512e73] cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpresaComponent;
