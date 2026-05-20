import { useCallback, useEffect, useState } from "react";
import { Vacante } from "@/interfaces";
import { fetchVacantes } from "@/services/vacantesService";

export function useVacantes() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const result = await fetchVacantes();
        if (!cancelled) {
          setVacantes(result.vacantes);
          setAreas(result.areas);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "No se pudieron cargar las vacantes");
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const filteredVacantes =
    selectedArea && selectedArea !== "Todas"
      ? vacantes.filter((v) => v.area === selectedArea)
      : vacantes;

  return {
    vacantes: filteredVacantes,
    areas,
    loading,
    error,
    selectedArea,
    setSelectedArea,
    refresh,
  };
}
