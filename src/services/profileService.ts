import { getAuthToken } from "./authService";
import { User } from "@/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadAvatar(file: File) {
  if (typeof window === "undefined") {
    throw new Error("No hay sesión para subir avatar");
  }

  const localToken = localStorage.getItem("authToken");
  const auth0Token = localStorage.getItem("auth0Token");

  // Si hay token local, priorizar flujo JWT local (/avatar)
  const token = localToken ?? auth0Token;
  if (!token) throw new Error("No hay sesión para subir avatar");

  const endpoint = localToken
    ? "/api/auth/avatar"
    : "/api/auth/auth0/avatar";

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "No se pudo subir el avatar");
  return data;
}

export async function deleteAvatar() {
  if (typeof window === "undefined") {
    throw new Error("No hay sesión para eliminar avatar");
  }

  const localToken = localStorage.getItem("authToken");
  const auth0Token = localStorage.getItem("auth0Token");

  const token = localToken ?? auth0Token;
  if (!token) throw new Error("No hay sesión para eliminar avatar");

  const endpoint = localToken
    ? "/api/auth/avatar"
    : "/api/auth/auth0/avatar";

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "No se pudo eliminar el avatar");
  return data;
}

export async function changePassword(userId: string, newPassword: string, tokenOverride?: string | null) {
  // Usa el token del store si se pasa; si no, intenta con localStorage (login clásico). Para OAuth no aplica por ahora.
  const token = tokenOverride ?? (typeof window !== 'undefined' ? localStorage.getItem('authToken') : null);
  if (!token) throw new Error('No hay sesión local para cambiar contraseña');

  const res = await fetch(`${API_URL}/api/auth/editPassword/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contrasenia: newPassword }),
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'No se pudo cambiar la contraseña');
  return data;
}

export interface ProfileData {
  nombre?: string;
  apellido?: string;
  email?: string;
  num_celular?: string;
  country?: string;
  linkedin?: string;
  companyName?: string;
  website?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyTaxId?: string;
}

export async function editProfile(userId: string, data: ProfileData): Promise<User> {
  const token = getAuthToken(); // Usa el helper que ya verifica localStorage
  // Nota: getAuthToken es async en authService.ts, pero aquí no lo importamos como tal.
  // Revisando imports: import { getAuthToken } from "./authService";
  // getAuthToken devuelve Promise<string | null>
  
  const authToken = await getAuthToken();
  if (!authToken) throw new Error('No hay sesión activa');

  const res = await fetch(`${API_URL}/api/usuarios/fullName/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const responseData = await res.json();
  if (!res.ok) throw new Error(responseData?.message || 'Error al actualizar perfil');
  return responseData.data;
}
