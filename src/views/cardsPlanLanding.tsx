import PlanCard from "@/components/PlanCard/PlanCard";
import { PLANS_DATA } from "@/utils/plans";

const CardsPlanLanding = () => {
  const nonCustomPlans = PLANS_DATA.filter((plan) => !plan.isCustom);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nonCustomPlans.map((plan) => (
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

export default CardsPlanLanding;
