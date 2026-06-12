import { Membresia } from "@/interfaces";
import { fetchMembresias } from "@/services/membresias.service";
import { useAsyncData } from "./useAsyncData";

export function useMembresias() {
  const { data, loading, error, refresh } = useAsyncData<Membresia[]>(fetchMembresias);
  return { membresias: data ?? [], loading, error, refresh };
}
