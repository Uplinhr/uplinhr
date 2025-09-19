interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

const StepCard = ({ stepNumber, title, description }: StepCardProps) => {
  return (
    
    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm mb-6 border border-[#502B7D] w-full max-w-2xl">
      
      <div className="flex-shrink-0 w-10 h-10 bg-[#502B7D] text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
        {stepNumber}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#8F68AC]">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;