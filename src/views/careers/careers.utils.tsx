import { CardData } from "@/components/Card/Card";
import { TrendingUp, Users, Zap } from "lucide-react";

export const CareersFeatures: CardData[] = [
    {
        icon: <Zap className="w-[22px] h-[22px]" />,
        iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
        title: "Startups y empresas tech",
        description: "Te conectamos con las mejores startups y empresas de tecnología de Latam que están construyendo el futuro..",
    },
     {
        icon: <Users className="w-[22px] h-[22px]" />,
        iconBg: "var(--color-uplin-green)",
        title: "Culturas centradas en las personas",
        description: "Culturas que ponen a las personas en el centro, donde tu bienestar y tu crecimiento importan de verdad.",
    },
     {
        icon: <TrendingUp className="w-[22px] h-[22px]" />,
        iconBg: "var(--color-uplin-orange)",
        title: "Proyectos que te impulsan",
        description: "Proyectos que inspiran y retos que impulsan tu desarrollo profesional hacia tu mejor versión.",
    }
]