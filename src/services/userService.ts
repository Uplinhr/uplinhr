const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ConsultaRequest {
  cantidad_horas: number;
  comentarios: string;
  id_consultoria: number;
}

export interface BusquedaRequest {
  info_busqueda: string;
  id_cred: number;
}

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

export const createConsulta = async (body: ConsultaRequest) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/consultas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en la solicitud de consulta");
    }

    return data;
  } catch (error) {
    console.error("Error en createConsulta:", error);
    throw error;
  }
};

export const createBusqueda = async (body: BusquedaRequest) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/busquedas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en la solicitud de búsqueda");
    }

    return data;
  } catch (error) {
    console.error("Error en createBusqueda:", error);
    throw error;
  }
};

export interface EditPasswordRequest {
  contrasenia: string;
}

export const editarClave = async (id: number, body: EditPasswordRequest) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/auth/editPassword/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al cambiar la contraseña");
    }

    return data;
  } catch (error) {
    console.error("Error en editarClave:", error);
    throw error;
  }
};
