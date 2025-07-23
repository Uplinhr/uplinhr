import PlanCard from '@/components/planCard/PlanCard';
import { PLANS_DATA } from '@/utils/plans';

const CardsPlanView = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PLANS_DATA.map((plan) => (
          <PlanCard
            key={plan.plan}
            {...plan}
            className="hover:shadow-lg transition-all"
          />
        ))}
      </div>
    </section>
  );
};

export default CardsPlanView;