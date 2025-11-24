import { LoginRequest, LoginResponse } from "@/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to get Auth0 token if available (will be undefined if not logged in with Auth0)
export const getAuthToken = async (): Promise<string | null> => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return null;
    
    // Check for Auth0 token in localStorage (will be set by Auth0 provider)
    const auth0Token = localStorage.getItem('auth0Token');
    if (auth0Token) return auth0Token;
    
    // If no Auth0 token, check for our local JWT
    const localToken = localStorage.getItem('authToken');
    return localToken;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

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

// =====================
// Auth0 Social Login
// =====================

export async function auth0Sync(accessToken: string) {
  const response = await fetch(`${API_URL}/api/auth/auth0/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al sincronizar cuenta');
  return data;
}

export async function auth0Me(accessToken: string) {
  const response = await fetch(`${API_URL}/api/auth/auth0/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error obteniendo perfil');
  return data;
}

// =====================
// Registro clásico (formulario)
// =====================

export interface RegisterPayload {
  nombre: string;
  apellido?: string;
  email: string;
  contrasenia: string;
  num_celular?: string;
  // Campos B2B opcionales (actualmente el backend ignora la mayoría)
  companyName?: string;
  country?: string;
  website?: string;
  linkedin?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyTaxId?: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al registrarse");
  return data;
};

// =====================
// Email verification
// =====================

export async function sendVerifyEmail() {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/api/auth/verify-email/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'No se pudo enviar el correo de verificación');
  return data;
}

export async function confirmVerifyEmail(token: string) {
  const response = await fetch(`${API_URL}/api/auth/verify-email/confirm?token=${encodeURIComponent(token)}`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'No se pudo verificar el correo');
  return data;
}