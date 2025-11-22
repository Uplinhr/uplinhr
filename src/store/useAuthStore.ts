import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginService, forgotPassword, validateToken, resetPassword } from "@/services/authService";
import { AuthState, LoginRequest, LoginResponse } from "@/interfaces";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await loginService(credentials);
          if (response.success) {
            const { user, token } = response.data;
            // Persistimos también el token en localStorage para usos auxiliares (avatar, etc.)
            if (typeof window !== 'undefined' && token) {
              try {
                localStorage.setItem('authToken', token);
              } catch (e) {
                console.error('No se pudo guardar authToken en localStorage:', e);
              }
            }

            set({ user, token, isAuthenticated: true, isLoading: false, error: null });
          } else {
            set({ isLoading: false, error: response.message || "Error al iniciar sesión" });
            throw new Error(response.message || "Error al iniciar sesión");
          }
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : "Error desconocido al iniciar sesión" });
          throw error;
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('auth0Token');
          } catch (e) {
            console.error('No se pudieron limpiar los tokens de localStorage:', e);
          }
        }
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },
      clearError: () => set({ error: null }),

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await forgotPassword(email);
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : "Error desconocido" });
          throw error;
        }
      },

      validateToken: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await validateToken(token);
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : "Error desconocido" });
          throw error;
        }
      },

      resetPassword: async (token: string, contrasenia: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await resetPassword(token, contrasenia);
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : "Error desconocido" });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
