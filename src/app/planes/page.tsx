import CardsPlan from "@/views/cardsPlan";
import {QAView} from "@/views/qaGeneral";
import {QAViewP} from "@/views/qaPayments";
const Planes = () => {
  return (
    <section className="bg-white h-auto">
   <CardsPlan/>   
    <QAView/>
    <QAViewP/>
    </section>
  );
};

export default Planes;
