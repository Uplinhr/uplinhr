import { QAView } from "@/views/qaView";

const page = () => {
  return (
    <div className="py-8 items-center bg-gradient-to-r from-[#502B7D] to-[#6C4099] min-h-screen">
      <h1 className="text-[#fff] mb-[14px] text-center font-semibold text-[30px] text-poppins ">
        Preguntas Frecuentes
      </h1>
      <QAView />
    </div>
  );
};

export default page;
