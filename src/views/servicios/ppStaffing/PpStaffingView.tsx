
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import HowItWorks from "./components/HowItWorks";
import BenefitsSection from "./components/BenefitsSection";
import { Banner } from "@/components/banner/banner";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";



export default function PpStaffingView() {
  return (
    <>
    
      <main>
        <HeroSection />
        <ServiceCards />
        <HowItWorks />
        <BenefitsSection />
        <div className="flex justify-center py-10">
          <BotonPrimario text="Conoce las opiniones de nuestros clientes" href="/#testimonios" />
        </div>
        <Banner />
        
      </main>
      
    </>
  );
}
