import { useState } from "react";
import { fetchVacantes, FetchVacantesResult } from "@/services/vacantesService";
import { useAsyncData } from "./useAsyncData";

export function useVacantes() {
  const { data, loading, error, refresh } =
    useAsyncData<FetchVacantesResult>(fetchVacantes);
  const [selectedArea, setSelectedArea] = useState("");

  const vacantes =
    selectedArea && selectedArea !== "Todas"
      ? (data?.vacantes ?? []).filter((v) => v.area === selectedArea)
      : (data?.vacantes ?? []);

  return {
    vacantes,
    areas: data?.areas ?? [],
    loading,
    error,
    selectedArea,
    setSelectedArea,
    refresh,
  };
}
