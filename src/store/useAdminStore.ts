import { create } from "zustand";
import {
  User,
  Creditos,
  Busqueda,
  Plan,
  Empresa,
  Consulta,
  Consultoria,
  RenovarPlan,
  compraCreditos,
  MembershipPlan,
} from "@/interfaces";
import * as adminService from "@/services/adminService";
import {toast} from "sonner";

interface AdminState {
  users: User[];
  selectedUser: User | null;
  creditos: Creditos[];
  busquedas: Busqueda[];
  selectedBusqueda: Busqueda | null;
  planes: Plan[];
  empresas: Empresa[];
  selectedEmpresa: Empresa | null;
  consultas: Consulta[];
  compraCreditos: compraCreditos | null;
  selectedConsulta: Consulta | null;
  consultorias: Consultoria[];
  selectedPlan: Plan | null;


  membershipPlans: MembershipPlan[];
  talentSearchServices: any[];
  loading: boolean;
  error: string | null;

  fetchTalentSearchServices: () => Promise<void>;
  upsertTalentSearchService: (body: any) => Promise<void>;
  deleteTalentSearchService: (id: string) => Promise<void>;

  fetchUsers: () => Promise<void>;
  selectUser: (id: string) => Promise<void>;
  fetchCreditos: () => Promise<void>;
  fetchBusquedas: () => Promise<void>;
  selectBusqueda: (id: string) => Promise<void>;
  deleteBusqueda: (id: string) => Promise<void>;
  fetchPlanes: () => Promise<void>;
  selectPlan: (id: string) => Promise<void>;
  selectEmpresa: (id: string) => Promise<void>;
  fetchConsultas: () => Promise<void>;
  selectConsulta: (id: string) => Promise<void>;
  deleteConsulta: (id: string) => Promise<void>;
  fetchConsultorias: () => Promise<void>;
  createPlan: (body: {
    nombre: string;
    creditos_mes: number;
    meses_cred: number;
    horas_cons: number;
    precio: string;
    custom: boolean;
  }) => Promise<void>;

  editPlan: (
    id: string,
    body: {
      nombre: string;
      creditos_mes: number;
      meses_cred: number;
      horas_cons: number;
      precio: string;
      active: boolean;
      custom: boolean;
      features?: any;
    }
  ) => Promise<void>;



  fetchMembershipPlans: () => Promise<void>;
  upsertMembershipPlan: (body: Partial<MembershipPlan>) => Promise<void>;

  renovarPlan: (body: RenovarPlan) => Promise<void>;

  editBusqueda: (
    id: string,
    body: {
      info_busqueda: string;
      creditos_usados: number;
      observaciones: string;
      estado: string;
      id_cred: string;
    }
  ) => Promise<void>;

  editConsulta: (
    id: string,
    body: {
      cantidad_horas: number;
      observaciones: string;
      estado: string;
      id_consultoria: string;
    }
  ) => Promise<void>;

  fetchEmpresas: () => Promise<void>;
  createEmpresa: (body: {
    nombre: string;
    email: string;
    nombre_fantasia: string;
    cuit: string;
    condicion_iva: string;
    tipo_societario: string;
    actividad_principal: string;
    domicilio_legal_calle_numero: string;
    domicilio_legal_ciudad: string;
    domicilio_legal_pais: string;
    codigo_postal: string;
    id_usuario: string;
  }) => Promise<void>;

  editEmpresa: (
    id: string,
    body: {
      nombre: string;
      email: string;
      nombre_fantasia: string;
      cuit: string;
      condicion_iva: string;
      tipo_societario: string;
      actividad_principal: string;
      domicilio_legal_calle_numero: string;
      domicilio_legal_ciudad: string;
      domicilio_legal_pais: string;
      codigo_postal: string;
      active: boolean;
      id_usuario: string;
    }
  ) => Promise<void>;

  unlinkUserFromEmpresa: (id: string) => Promise<void>;

  registerUser: (body: {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    num_celular?: string;
  }) => Promise<void>;

  deleteUser: (
    id: string,
    body: {
      nombre: string;
      apellido: string;
      email: string;
      active: boolean;
      rol: string;
    }
  ) => Promise<void>;
  editUser: (
    id: string,
    body: {
      nombre: string;
      apellido: string;
      email: string;
      active: boolean;
      rol: string;
      id_plan: string | null;
    }
  ) => Promise<void>;
  comprarCreditos: (body: {
    medio_pago: string;
    costo: number;
    observaciones: string;
    cantidad: number;
    vencimiento: string;
    id_usuario: string;
  }) => Promise<void>;

  resetPassword: (id: string, contrasenia: string) => Promise<void>;
  activateUser: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  selectedUser: null,
  creditos: [],
  busquedas: [],
  selectedBusqueda: null,
  planes: [],
  selectedPlan: null,
  empresas: [],
  selectedEmpresa: null,
  consultas: [],
  selectedConsulta: null,
  consultorias: [],
  compraCreditos: null,

  membershipPlans: [],
  talentSearchServices: [],
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

  selectUser: async (id: string) => {
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

  selectBusqueda: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const busqueda = await adminService.getBusquedaById(id);
      set({ selectedBusqueda: busqueda, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar la busqueda", loading: false });
    }
  },

  editBusqueda: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const updatedBusqueda = await adminService.editBusqueda(id, body);
      const busquedas = get().busquedas.map((p) =>
        p.id === id && updatedBusqueda ? updatedBusqueda : p
      );
      set({ busquedas, loading: false });
    } catch (err) {
    let errorMessage = "Error al editar la búsqueda";
    if (err instanceof Error) {
      errorMessage = err.message; 
    }
    toast.error(errorMessage);
    set({ error: errorMessage, loading: false });
  }
  },

  deleteBusqueda: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await adminService.deleteBusqueda(id);
      const busquedas = get().busquedas.filter((b) => b.id !== id);
      set({ busquedas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al eliminar la búsqueda", loading: false });
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

  selectPlan: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const plan = await adminService.getPlanById(id);
      set({ selectedPlan: plan, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar plan", loading: false });
    }
  },

  createPlan: async (body) => {
    set({ loading: true, error: null });
    try {
      const newPlan = await adminService.createPlan(body);
      set({ planes: [...get().planes, newPlan], loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al crear plan", loading: false });
    }
  },

  editPlan: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const updatedPlan = await adminService.editPlan(id, body);
      const planes = get().planes.map((p) => (p.id === id && updatedPlan ? updatedPlan : p));
      set({ planes, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al editar plan", loading: false });
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
      const users = get().users.map((u) => (u.id === id && updatedUser ? updatedUser : u));
      set({ users, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al desactivar usuario", loading: false });
    }
  },

  resetPassword: async (id, contrasenia) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await adminService.resetPassword(id, contrasenia);
      const users = get().users.map((u) => (u.id === id && updatedUser ? updatedUser : u));
      set({ users, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al restablecer contraseña", loading: false });
    }
  },

  activateUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await adminService.activateUser(id);
      const users = get().users.map((u) => (u.id === id && updatedUser ? updatedUser : u));
      set({ users, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al activar usuario", loading: false });
    }
  },

  editUser: async (
    id: string,
    body: {
      nombre: string;
      apellido: string;
      email: string;
      active: boolean;
      rol: string;
      id_plan: string | null;
    }
  ) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await adminService.editUser(id, body);

      if (!updatedUser) {
        throw new Error("No se pudo actualizar el usuario");
      }

      const users = get().users.map((u) => (u.id === id ? updatedUser : u));

      set({ users, selectedUser: updatedUser, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al editar usuario", loading: false });
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

  createEmpresa: async (body) => {
    set({ loading: true, error: null });
    try {
      const newEmpresa = await adminService.crearEmpresa(body);
      set({ empresas: [...get().empresas, newEmpresa], loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al crear empresa", loading: false });
    }
  },

  selectEmpresa: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const empresa = await adminService.getEmpresaById(id);
      set({ selectedEmpresa: empresa, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar empresa", loading: false });
    }
  },

  editEmpresa: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const empresaActualizada = await adminService.editEmpresa(id, body);
      const empresas = get().empresas.map((e) =>
        e.id === id && empresaActualizada ? empresaActualizada : e
      );
      set({ empresas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al editar empresa", loading: false });
    }
  },

  unlinkUserFromEmpresa: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await adminService.unlinkUserFromEmpresa(id);
      await get().fetchEmpresas();
      set({ loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al desvincular usuario de la empresa", loading: false });
    }
  },

  fetchConsultas: async () => {
    set({ loading: true, error: null });
    try {
      const consultas = await adminService.getConsultas();
      set({ consultas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar consultas", loading: false });
    }
  },

  selectConsulta: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const consulta = await adminService.getConsultaById(id);
      set({ selectedConsulta: consulta, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar la consulta", loading: false });
    }
  },

  editConsulta: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const updatedConsulta = await adminService.editConsulta(id, body);
      const consultas = get().consultas.map((p) =>
        p.id === id && updatedConsulta ? updatedConsulta : p
      );
      set({ consultas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al editar la consulta", loading: false });
    }
  },

  deleteConsulta: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await adminService.deleteConsulta(id);
      const consultas = get().consultas.filter((b) => b.id !== id);
      set({ consultas, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al eliminar la consulta", loading: false });
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

  renovarPlan: async (body) => {
    set({ loading: true, error: null });
    try {
      const renewedPlan = await adminService.renovarPlan(body);
      set({
        planes: get().planes.map((p) =>
          p.id === renewedPlan.id ? renewedPlan : p
        ),
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ error: "Error al renovar el plan", loading: false });
    }
  },

  comprarCreditos: async (body) => {
    set({ loading: true, error: null });
    try {
      const compra = await adminService.comprarCreditos(body);
      set({ compraCreditos: compra, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al comprar créditos", loading: false });
    }
  },


  fetchMembershipPlans: async () => {
    set({ loading: true, error: null });
    try {
      const membershipPlans = await adminService.getMembershipPlans();
      set({ membershipPlans, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar planes de membresía", loading: false });
    }
  },

  upsertMembershipPlan: async (body) => {
    set({ loading: true, error: null });
    try {
      const plan = await adminService.upsertMembershipPlan(body);
      // Update list if exists, else add
      const current = get().membershipPlans;
      const index = current.findIndex(p => p.code === plan.code);
      if (index >= 0) {
        const newPlans = [...current];
        newPlans[index] = plan;
        set({ membershipPlans: newPlans, loading: false });
      } else {
        set({ membershipPlans: [...current, plan], loading: false });
      }
    } catch (err) {
      console.error(err);
      set({ error: "Error al guardar plan de membresía", loading: false });
    }
  },

  fetchTalentSearchServices: async () => {
    set({ loading: true, error: null });
    try {
      const services = await adminService.getTalentSearchServices();
      set({ talentSearchServices: services, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar servicios de búsqueda", loading: false });
    }
  },

  upsertTalentSearchService: async (body) => {
    set({ loading: true, error: null });
    try {
      let service;
      if (body.id) {
        service = await adminService.updateTalentSearchService(body.id, body);
      } else {
        service = await adminService.createTalentSearchService(body);
      }
      
      const current = get().talentSearchServices;
      const index = current.findIndex(s => s.id === service.id);
      
      if (index >= 0) {
        const newServices = [...current];
        newServices[index] = service;
        set({ talentSearchServices: newServices, loading: false });
      } else {
        set({ talentSearchServices: [...current, service], loading: false });
      }
    } catch (err) {
      console.error(err);
      set({ error: "Error al guardar servicio de búsqueda", loading: false });
    }
  },

  deleteTalentSearchService: async (id) => {
    set({ loading: true, error: null });
    try {
      await adminService.deleteTalentSearchService(id);
      const services = get().talentSearchServices.filter(s => s.id !== id);
      set({ talentSearchServices: services, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al eliminar servicio de búsqueda", loading: false });
    }
  },
}));
