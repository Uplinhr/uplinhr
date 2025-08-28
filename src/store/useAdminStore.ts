import { create } from "zustand";
import { User, Creditos, Consultorias, Busqueda, Plan, Empresa } from "@/interfaces";
import * as adminService from "@/services/adminService";

interface AdminState {
  users: User[];
  selectedUser: User | null;
  creditos: Creditos[];
  consultorias: Consultorias[];
  busquedas: Busqueda[];
  planes: Plan[];
  empresas: Empresa[]; 
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  selectUser: (id: number) => Promise<void>;
  fetchCreditos: () => Promise<void>;
  fetchConsultorias: () => Promise<void>;
  fetchBusquedas: () => Promise<void>;
  fetchPlanes: () => Promise<void>;
  fetchEmpresas: () => Promise<void>; 
  editEmpresa: (id: number, body: {
    nombre: string;
    email: string;
    active: boolean;
    id_usuario: number;
    }) => Promise<void>;
  registerUser: (body: {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    num_celular?: string;
    }) => Promise<void>;

  deleteUser: (id: number,body: {
        nombre: string;
        apellido: string;
        email: string;
        active: boolean;
        rol: string;
    }) => Promise<void>;
  resetPassword: (id: number, contrasenia: string) => Promise<void>;
  activateUser: (id: number) => Promise<void>;


}



export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  selectedUser: null,
  creditos: [],
  consultorias: [],
  busquedas: [],
  planes: [],
  empresas: [],   
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await adminService.getUser();
      set({ users, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar usuarios", loading: false });
    }
  },

  selectUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const user = await adminService.getUserById(id);
      set({ selectedUser: user, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar usuario", loading: false });
    }
  },

  fetchCreditos: async () => {
    set({ loading: true, error: null });
    try {
      const creditos = await adminService.getCreditos();
      set({ creditos, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar créditos", loading: false });
    }
  },

  fetchConsultorias: async () => {
    set({ loading: true, error: null });
    try {
      const consultorias = await adminService.getConsultorias();
      set({ consultorias, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar consultorías", loading: false });
    }
  },

  fetchBusquedas: async () => {
    set({ loading: true, error: null });
    try {
      const busquedas = await adminService.getBusquedas();
      set({ busquedas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar búsquedas", loading: false });
    }
  },

  fetchPlanes: async () => {
    set({ loading: true, error: null });
    try {
      const planes = await adminService.getPlanes();
      set({ planes, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar planes", loading: false });
    }
  },

  fetchEmpresas: async () => {
    set({ loading: true, error: null });
    try {
      const empresas = await adminService.getEmpresas();
      set({ empresas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar empresas", loading: false });
    }
  },

   editEmpresa: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const empresaActualizada = await adminService.editEmpresa(id, body);

      const empresas = get().empresas.map((e) =>
        e.id === id ? empresaActualizada : e
      );

      set({ empresas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al editar empresa", loading: false });
    }
  },
  registerUser: async (body) => {
    set({ loading: true, error: null });
    try {
      const newUser = await adminService.registerUser(body);

      set({ users: [...get().users, newUser], loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al registrar usuario", loading: false });
    }
  },

  deleteUser: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await adminService.deleteUser(id, body);
      const users = get().users.map((u) =>
        u.id === id ? updatedUser : u
      );
      set({ users, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al eliminar usuario", loading: false });
    }
  },

  resetPassword: async (id, contrasenia) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await adminService.resetPassword(id, contrasenia);
      const users = get().users.map((u) =>
        u.id === id ? updatedUser : u
      );
      set({ users, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al restablecer contraseña", loading: false });
    }
  },

  activateUser: async (id: number) => {
  set({ loading: true, error: null });
  try {
    const updatedUser = await adminService.activateUser(id); 
    const users = get().users.map(u => u.id === id ? updatedUser : u);
    set({ users, loading: false });
  } catch (err) {
    console.error(err);
    set({ error: "Error al activar usuario", loading: false });
  }
},
}));


