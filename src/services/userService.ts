const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ConsultaRequest {
  cantidad_horas: number;
  comentarios: string;
  id_consultoria: number;
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

    if (!response.ok) {
      throw new Error("Error en la solicitud de consulta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createConsulta:", error);
    throw error;
  }
};

export interface EditarClaveRequest {
  contrasenia: string;
}

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

    if (!response.ok) {
      throw new Error("Error al cambiar la contraseña");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en editarClave:", error);
    throw error;
  }
};
