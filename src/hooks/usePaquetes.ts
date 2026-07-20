import { Paquete } from "@/interfaces";
import { fetchPaquetes } from "@/services/paquetes.service";
import { useAsyncData } from "./useAsyncData";

export function usePaquetes() {
  const { data, loading, error, refresh } = useAsyncData<Paquete[]>(fetchPaquetes);
  return { paquetes: data ?? [], loading, error, refresh };
}
