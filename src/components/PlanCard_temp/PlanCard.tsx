import { IPlanCardProps } from "@/interfaces";

const PlanCard = ({
  plan,
  description,
  price,
  includes,
  excludes,
  showTaxes = true,
  isCustom = false,
  className = "",
  onClick,
}: IPlanCardProps) => {
  const isGrowth = plan.toLowerCase() === "growth";

  return (
    <div
      className={`relative bg-white flex flex-col h-full ${
        isGrowth
          ? "border-[3px] border-[#502B7D] rounded-b-[15px]"
          : "border border-[#D5D5D5] rounded-[15px]"
      } ${className}`}
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
      }}
      onClick={onClick}
    >
      {isGrowth && (
        <div
          className="
            absolute -top-10 left-0 right-0
            w-[calc(100%+6px)] -mx-[3px]
            bg-[#4B2F8B] text-white font-bold text-base uppercase
            rounded-t-[15px]
            flex items-center justify-center
            select-none
            z-10
            h-10
            shadow-md
          "
        >
          🔥 MÁS POPULAR
        </div>
      )}

      <div className="p-6 flex flex-col h-full font-poppins">
        <div className="min-h-[180px] mb-2">
          <h3 className="text-2xl font-bold text-black">{plan}</h3>
          <p className="mt-3 w-64 h-28 justify-center text-black/80 text-base font-normal leading-normal">{description}</p>
        </div>

        <div className="min-h-[130px] mb-4 flex flex-col justify-between flex-shrink-0">
          <div>
            <p className="text-2xl font-bold text-black">{price}</p>
            {showTaxes && (
              <p className="ml-2 text-[14px] font-normal leading-[150%] tracking-[-0.154px] text-[rgba(0,0,0,0.80)] font-poppins">
                (+ impuestos)
              </p>
            )}
          </div>
          <div className="mt-auto">
            <button
              className={`w-full mt-4 hover:cursor-pointer rounded-[6px] border border-[#502B7D] text-center font-[400] text-[16px] leading-[48px] transform transition-transform duration-200 hover:scale-[1.03]
    ${isGrowth ? "bg-[#502B7D] text-white" : "bg-transparent text-[#502B7D]"}`}
            >
              {isCustom ? "Contactar" : `Adquirir ${plan}`}
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-start">
          <div className="grid gap-4">
            <div>
              <h4 className="font-semibold text-[rgba(0, 0, 0, 0.80);] mb-2">
                Incluye:
              </h4>
              <ul className="space-y-2">
                {includes.map((item, i) => (
                  <li key={`inc-${i}`} className="flex items-baseline">
                    <span className="text-[#6C4099] mr-2">✓</span>
                    <span className="text-[rgba(0, 0, 0, 0.80);]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {excludes.length > 0 && (
              <div>
                <h4 className="font-semibold text-[rgba(0, 0, 0, 0.80);] mb-2">
                  No incluye:
                </h4>
                <ul className="space-y-2">
                  {excludes.map((item, i) => (
                    <li key={`exc-${i}`} className="flex items-baseline">
                      <span className="text-gray-400 mr-2">-</span>
                      <span className="text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
