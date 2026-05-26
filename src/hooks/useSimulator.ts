import { useCallback, useEffect, useState } from "react";
import { SimulatorData } from "@/interfaces";
import { getSimulatorData } from "@/services/simulator.service";

export function useSimulator() {
  const [simulatorData, setSimulatorData] = useState<SimulatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        const data = await getSimulatorData();
        if (!cancelled) setSimulatorData(data);
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar los datos del simulador"
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return { simulatorData, loading, error, refresh };
}
