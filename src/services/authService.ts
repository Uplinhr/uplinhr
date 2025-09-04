import { LoginRequest, LoginResponse } from "@/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login({ email, contrasenia }: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasenia }),
      credentials: "include",
    });

    if (!response.ok) {
      let errorMsg = "Error al iniciar sesión";
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch {
        errorMsg = response.statusText || errorMsg;
      }
      throw new Error(errorMsg);
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
      }
      throw error;
    }
    throw new Error("Error desconocido al iniciar sesión");
  }
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/api/auth/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al enviar correo");
  return data;
}

export async function validateToken(token: string) {
  const response = await fetch(`${API_URL}/api/auth/validateToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Token inválido");
  return data; 
}


export async function resetPassword(token: string, contrasenia: string) {
  const response = await fetch(`${API_URL}/api/auth/resetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, contrasenia }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al restablecer contraseña");
  return data;
}