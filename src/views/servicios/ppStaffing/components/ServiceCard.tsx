
import Image from 'next/image';

interface ServiceCardProps {
  iconSrc: string; 
  title: string;
  description: string;
  altText: string;
}

const ServiceCard = ({ iconSrc, title, description, altText }: ServiceCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
      <div className="mb-4">
        <Image src={iconSrc} alt={altText} width={64} height={64} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;