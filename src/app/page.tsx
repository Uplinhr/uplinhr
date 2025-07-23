import Button from "@/components/Button/Button";
import Solutions from "@/views/Solutions";
import Presentation from "@/views/Presentation";
import CardsPlanLanding from "@/views/cardsPlanLanding";

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-700 ">
      <Presentation/>
      <Solutions/>
      <CardsPlanLanding/>
      <div className="my-8 flex justify-center">
        <Button 
          link="/planes" 
          tag="Contáctame" 
          mode={2} 
          height={50} 
          width={180} 
        />
      </div>
    </div>
  );
}