import { create } from "zustand";
import {
  createConsulta,
  ConsultaRequest,
  createBusqueda,
  BusquedaRequest,
  editarClave,
  EditPasswordRequest,
} from "@/services/userService";

interface ConsultaResponse {
  id: number;
}

interface BusquedaResponse {
  id: number;
}

interface UserState {
  loading: boolean;
  error: string | null;
  postConsulta: (body: ConsultaRequest) => Promise<ConsultaResponse>;
  postBusqueda: (body: BusquedaRequest) => Promise<BusquedaResponse>;
  cambiarClave: (body: EditPasswordRequest) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  loading: false,
  error: null,

  postConsulta: async (body) => {
    set({ loading: true, error: null });
    try {
      const response: ConsultaResponse = await createConsulta(body);
      set({ loading: false });
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  postBusqueda: async (body) => {
    set({ loading: true, error: null });
    try {
      const response: BusquedaResponse = await createBusqueda(body);
      set({ loading: false });
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  cambiarClave: async (body) => {
    set({ loading: true, error: null });
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (!authStorage) throw new Error("No se encontró el usuario");
      const authData = JSON.parse(authStorage);
      const id = authData.state?.user?.id;
      if (!id) throw new Error("No se encontró el ID del usuario");

      await editarClave(id, body);
      set({ loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
