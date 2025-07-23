import CardsPlan from "@/views/cardsPlan";
import CardsPlanLanding from "@/views/cardsPlanLanding";
import {QAView} from "@/views/qaGeneral";
import {QAViewP} from "@/views/qaPayments";
const Planes = () => {
  return (
    <section className="bg-white h-auto">
   <CardsPlan/>   
   <CardsPlanLanding/>
    <QAView/>
    <QAViewP/>
    </section>
  );
};

export default Planes;
