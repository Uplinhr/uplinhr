import {
  User,
  Creditos,
  Consultorias,
  Busqueda,
  Plan,
  Empresa,
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

export const getConsultorias = async (): Promise<Consultorias[]> => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/consultorias/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener consultorías");

    const data: { success: boolean; message: string; data: Consultorias[] } =
      await res.json();
    return data.data;
  } catch (error) {
    console.error("Error en getConsultorias:", error);
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

export const editEmpresa = async (
  id: number,
  body: {
    nombre: string;
    email: string;
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