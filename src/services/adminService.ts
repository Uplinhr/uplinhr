import {
  User,
  Creditos,
  Consultoria,
  Consulta,
  Busqueda,
  Plan,
  Empresa,
  RenovarPlan,
  compraCreditos,
} from "@/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = (): string => {
  if (typeof window !== "undefined") {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const authData = JSON.parse(authStorage);
        return authData.state?.token || "";
      }
    } catch (error) {
      console.error("Error parsing auth-storage:", error);
      return "";
    }
  }
  return "";
};

export const getUser = async (): Promise<User[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/usuarios/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener usuarios");

    const data: { success: boolean; message: string; data: User[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getUser:", error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener usuario");

    const data: { success: boolean; message: string; data: User } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getUserById:", error);
    throw error;
  }
};

export const editUser = async (
  id: number,
  body: {
    nombre: string;
    apellido: string;
    email: string;
    active: boolean;
    rol: string;
    id_plan: number | null;
  }
): Promise<User | null> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al editar usuario");

    const data: { success: boolean; message: string; data: User } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en editUser:", error);
    throw error;
  }
};

export const getBusquedas = async (): Promise<Busqueda[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/busquedas/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener búsquedas");

    const data: { success: boolean; message: string; data: Busqueda[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getBusquedas:", error);
    throw error;
  }
};

export const getBusquedaById = async (id: number): Promise<Busqueda | null> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/busqueda/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener busqueda");

    const data: { success: boolean; message: string; data: Busqueda } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getbusquedaById:", error);
    throw error;
  }
};

export const editBusqueda = async (
  id: number,
  body: {
    info_busqueda: string;
    creditos_usados: number;
    observaciones: string;
    estado: string;
    id_cred: number;
  }
): Promise<Busqueda> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/busquedas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data: { success: boolean; message: string; data?: Busqueda } =
      await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Error al editar la búsqueda");
    }

    return data.data as Busqueda;
  } catch (error) {
    console.error("Error en editBusqueda:", error);
    throw error;
  }
};
export const deleteBusqueda = async (id: number): Promise<void> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/busquedas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al eliminar la búsqueda");

    const data: { success: boolean; message: string; data: null } =
      await res.json();
    if (!data.success) throw new Error("No se pudo eliminar la búsqueda");
  } catch (error) {
    console.error("Error en deleteBusqueda:", error);
    throw error;
  }
};
export const getCreditos = async (): Promise<Creditos[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/creditos/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener créditos");

    const data: { success: boolean; message: string; data: Creditos[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getCreditos:", error);
    throw error;
  }
};

export const getPlanes = async (): Promise<Plan[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/planes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener planes");

    const data: { success: boolean; message: string; data: Plan[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getPlanes:", error);
    throw error;
  }
};

export const registerUser = async (body: {
  nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
  num_celular?: string;
}): Promise<User> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al registrar usuario");

    const data: { success: boolean; message: string; data: User } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

export const deleteUser = async (
  id: number,
  body: {
    nombre: string;
    apellido: string;
    email: string;
    active: boolean;
    rol: string;
  }
): Promise<User> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        active: body.active ? 1 : 0,
      }),
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");

    const data: { success: boolean; message: string; data: User } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en deleteUser:", error);
    throw error;
  }
};

export const resetPassword = async (
  id: number,
  contrasenia: string
): Promise<User> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/auth/editPassword/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ contrasenia }),
    });

    if (!res.ok) throw new Error("Error al restablecer contraseña");

    const data: { success: boolean; message: string; data: User } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en resetPassword:", error);
    throw error;
  }
};

export const activateUser = async (id: number) => {
  const token = getToken();

  const url = `${API_URL}/api/usuarios/enable/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al activar usuario");
  }
  return await response.json();
};

export const getPlanById = async (id: number): Promise<Plan | null> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/planes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener plan");

    const data: { success: boolean; message: string; data: Plan } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getPlanById:", error);
    throw error;
  }
};

export const createPlan = async (body: {
  nombre: string;
  creditos_mes: number;
  meses_cred: number;
  horas_cons: number;
  precio: string;
  custom: boolean;
}): Promise<Plan> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/planes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al crear plan");

    const data: { success: boolean; message: string; data: Plan } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en createPlan:", error);
    throw error;
  }
};

export const editPlan = async (
  id: number,
  body: {
    nombre: string;
    creditos_mes: number;
    meses_cred: number;
    horas_cons: number;
    precio: string;
    active: boolean;
    custom: boolean;
  }
): Promise<Plan> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/planes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al editar plan");

    const data: { success: boolean; message: string; data: Plan } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en editPlan:", error);
    throw error;
  }
};

export const crearEmpresa = async (body: {
  nombre: string;
  email: string;
  nombre_fantasia: string;
  cuit: string;
  condicion_iva: string;
  tipo_societario: string;
  actividad_principal: string;
  domicilio_legal_calle_numero: string;
  domicilio_legal_ciudad: string;
  domicilio_legal_pais: string;
  codigo_postal: string;
  id_usuario: number;
}): Promise<Empresa> => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/empresas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Error al crear la empresa");

  const data: { success: boolean; message: string; data: Empresa } =
    await res.json();
  return data.data;
};

export const editEmpresa = async (
  id: number,
  body: {
    nombre: string;
    email: string;
    nombre_fantasia: string;
    cuit: string;
    condicion_iva: string;
    tipo_societario: string;
    actividad_principal: string;
    domicilio_legal_calle_numero: string;
    domicilio_legal_ciudad: string;
    domicilio_legal_pais: string;
    codigo_postal: string;
    active: boolean;
    id_usuario: number;
  }
): Promise<Empresa> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/empresas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        active: body.active ? 1 : 0,
      }),
    });

    if (!res.ok) throw new Error("Error al editar empresa");

    const data: { success: boolean; message: string; data: Empresa } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en editEmpresa:", error);
    throw error;
  }
};

export const getEmpresas = async (): Promise<Empresa[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/empresas/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener empresas");

    const data: { success: boolean; message: string; data: Empresa[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getEmpresas:", error);
    throw error;
  }
};

export const getEmpresaById = async (id: number): Promise<Empresa> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/empresas/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener empresa");

    const data: { success: boolean; message: string; data: Empresa } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getEmpresaById:", error);
    throw error;
  }
};

export const getConsultas = async (): Promise<Consulta[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/consultas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener consultas");

    const data: { success: boolean; message: string; data: Consulta[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getConsultas:", error);
    throw error;
  }
};
export const getConsultaById = async (id: number): Promise<Consulta | null> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/consultas/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener la consulta");

    const data: { success: boolean; message: string; data: Consulta } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getConsultaById:", error);
    throw error;
  }
};

export const editConsulta = async (
  id: number,
  body: {
    cantidad_horas: number;
    observaciones: string;
    estado: string;
    id_consultoria: number;
  }
): Promise<Consulta> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/consultas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al editar la consulta");

    const data: { success: boolean; message: string; data: Consulta } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en editConsulta:", error);
    throw error;
  }
};
export const deleteConsulta = async (id: number): Promise<void> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/consultas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al eliminar la consulta");

    const data: { success: boolean; message: string; data: null } =
      await res.json();
    if (!data.success) throw new Error("No se pudo eliminar la consulta");
  } catch (error) {
    console.error("Error en deleteConsulta:", error);
    throw error;
  }
};

export const getConsultorias = async (): Promise<Consultoria[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/consultorias`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener consultorías");

    const data: { success: boolean; message: string; data: Consultoria[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getConsultorias:", error);
    throw error;
  }
};
export const renovarPlan = async (body: RenovarPlan) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/planes/renew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en renovar el plane");
    }

    return data;
  } catch (error) {
    console.error("Error en renovarPlan:", error);
    throw error;
  }
};

export const comprarCreditos = async (body: {
  medio_pago: string;
  costo: number;
  observaciones: string;
  cantidad: number;
  vencimiento: string;
  id_usuario: number;
}): Promise<compraCreditos> => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/compra_creditos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Error al comprar el crédito");

  const data: { success: boolean; message: string; data: compraCreditos } =
    await res.json();
  return data.data;
};

export const unlinkUserFromEmpresa = async (id: number): Promise<void> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/empresas/unlinkUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al desvincular usuario de empresa");

    const data: { success: boolean; message: string } = await res.json();
    if (!data.success) throw new Error("No se pudo desvincular usuario");
  } catch (error) {
    console.error("Error en unlinkUserFromEmpresa:", error);
    throw error;
  }
};
