import Button from "@/components/Button/Button";
import Solutions from "@/views/Solutions";
import Presentation from "@/views/Presentation";
import CardsPlanLanding from "@/views/cardsPlanLanding";
import ComparativeCard from "@/views/comparativeCard";
import AditionalServices from "@/views/AditionalServices";

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-white ">
      <Presentation/>
      <div className="relative w-full bg-gradient-to-r from-[#6C4099] to-[#502B7D]">
        <svg className="w-full" viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M0,80 C480,160 960,0 1440,80 L1440,150 L0,150 Z" />
        </svg>
      </div>
      <Solutions/>
      <CardsPlanLanding/>
      <AditionalServices/>
      <ComparativeCard/>
    </div>
  );
}