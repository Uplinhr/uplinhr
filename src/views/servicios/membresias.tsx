import CardBeneficiosMembresia from "@/components/CardServices/CardBeneficiosMembresia";
import CardsPlan from '@/views/cardsPlan';
import { Banner } from "@/components/banner/banner";

export default function Membresias() {
  return (
    <div>
      <section>
        <h1 className="font-poppins text-[28px] font-semibold text-center p-5">
          <span className="text-[#000000]">Potenciá tu gestion de talento</span>
          <br />
          <span className="text-[#000000]">con nuestras</span>{" "}
          <span className="text-[#502B7D]">membresias empresariales</span>
        </h1>
        <p className="text-lg text-center lg:text-base leading-relaxed">
          Suscribite a nuestras membresías empresariales
          <br />y accede a todo lo que tu organización necesita para gestionar
          tu talento
        </p>
      </section>

      <section>
        <h2 className="font-poppins text-[28px] font-semibold text-center mt-8 p-3">
          <span className="text-[#502B7D]">Beneficios</span>{" "}
          <span className="text-[#70C157]">+</span>
        </h2>
        <CardBeneficiosMembresia />
      </section>

      <section>
        <h1 className="font-poppins text-[28px] font-semibold text-center mt-12 p-5">
          Todo en un plan mensual que evoluciona con tu empresa 
        </h1>
        <CardsPlan />
      </section>
      <section>
        <Banner />
      </section>
    </div>
  );
}
