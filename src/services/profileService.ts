import { getAuthToken } from "./authService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadAvatar(file: File) {
  const auth0Token = typeof window !== 'undefined' ? localStorage.getItem('auth0Token') : null;
  if (!auth0Token) throw new Error('No hay sesión Auth0 para subir avatar');

  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${API_URL}/api/auth/auth0/avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth0Token}`,
    },
    body: form,
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'No se pudo subir el avatar');
  return data;
}

export async function deleteAvatar() {
  const auth0Token = typeof window !== 'undefined' ? localStorage.getItem('auth0Token') : null;
  if (!auth0Token) throw new Error('No hay sesión Auth0 para eliminar avatar');

  const res = await fetch(`${API_URL}/api/auth/auth0/avatar`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${auth0Token}`,
    },
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'No se pudo eliminar el avatar');
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
