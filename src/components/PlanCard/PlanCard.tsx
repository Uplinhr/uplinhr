

interface PlanCardProps {
  plan: {
    title: string;
    price: string;
    description: string;
    included: string[];
    excluded: string[];
    featured?: boolean;
  };
}

const PlanCard = ({plan}: PlanCardProps) => {
    const { title, price, description, included, excluded, featured } = plan;
    return(
        <div>

        </div>
    )
}