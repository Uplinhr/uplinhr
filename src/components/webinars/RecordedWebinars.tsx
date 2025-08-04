import RecordedWebinarCard from "./RecordedWebinarCard";
import { recordedWebinars } from "@/utils/webinarsData";

export default function RecordedWebinars() {
  if (recordedWebinars.length === 0)
    return <p>No hay webinars grabados disponibles.</p>;

  return (
    <>
      {recordedWebinars.map((webinar) => (
        <RecordedWebinarCard key={webinar.id} data={webinar} />
      ))}
    </>
  );
}
