import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  login as loginService,
  forgotPassword,
  validateToken,
  resetPassword,
} from "@/services/authService";
import { AuthState, LoginRequest, LoginResponse } from "@/interfaces";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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
            set({ user, token, isAuthenticated: true, isLoading: false, error: null });
          } else {
            set({ isLoading: false, error: response.message || "Error al iniciar sesión" });
            throw new Error(response.message || "Error al iniciar sesión");
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Error desconocido al iniciar sesión",
          });
          throw error;
        }
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false, error: null }),
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
        recargarUsuario: async () => {
        const token = get().token;
        if (!token) return;
        set({ isLoading: true, error: null });
        try {
          const response = await validateToken(token); 
          if (response.success) {
            set({ user: response.data.user, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : "Error desconocido" });
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
