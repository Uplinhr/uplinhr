import { SimulatorData } from "@/interfaces";
import { getSimulatorData } from "@/services/simulator.service";
import { useAsyncData } from "./useAsyncData";

export function useSimulator() {
  const { data: simulatorData, loading, error, refresh } =
    useAsyncData<SimulatorData>(getSimulatorData);
  return { simulatorData, loading, error, refresh };
}
