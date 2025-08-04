import UpcomingWebinarCard from "./UpcomingWebinarCard";
import { upcomingWebinars } from "@/utils/webinarsData";

export default function UpcomingWebinars() {
  if (upcomingWebinars.length === 0)
    return <p>No hay webinars en vivo disponibles.</p>;

  return (
    <>
      {upcomingWebinars.map((webinar) => (
        <UpcomingWebinarCard key={webinar.id} data={webinar} />
      ))}
    </>
  );
}
