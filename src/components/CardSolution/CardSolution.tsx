import {SolutionProps} from "@/interfaces";
import Image from "next/image";

const CardSolution = ({
    icon,
    title,
    description
}: SolutionProps) => {

    return(
        <div className="bg-white rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]
        flex flex-col items-center text-center pt-6"
        style={{
            width: '285px',
            height: '200px',
            margin: '5px'
        }}>
            <div className="mb-4">
                <Image
                src={icon}
                alt="Logo Uplin"
                width={57}
                height={52}
                />
            </div>
            <h5 className="font-poppins font-bold text-[18px]">
                {title}
            </h5>
            <p className="font-poppins font-normal text-[16px] text-[#737373] px-4">
                {description}
            </p>
        </div>
    )
}

export default CardSolution