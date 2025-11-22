"use client";
import { useState, useEffect } from "react";
import PlanCard from "@/components/planCard/PlanCard";
import { PLANS_DATA } from "@/utils/plans";

const CardsPlanView = () => {
  const [plans, setPlans] = useState(PLANS_DATA);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/memberships-public/plans`);
        if (!res.ok) throw new Error("Failed to fetch plans");
        
        const data = await res.json();
        const membershipPlans = data.data || [];

        // Map backend data to frontend format
        const mappedPlans = membershipPlans
          .filter((p: any) => p.isActive)
          .map((p: any) => ({
            plan: p.name,
            description: `${p.creditsPerMonth} créditos por mes con rollover de ${p.rolloverMonths} meses`,
            price: `${p.currency} ${p.priceMonthly}/mes`,
            includes: Array.isArray(p.benefits) ? p.benefits : [],
            excludes: [],
            showTaxes: true,
            link: `https://u030x.share.hsforms.com/2${p.code}`, // Default link pattern
            isCustom: p.code === 'CUSTOM'
          }));

        if (mappedPlans.length > 0) {
          setPlans(mappedPlans);
        }
      } catch (error) {
        console.error("Error fetching membership plans:", error);
        // Keep using PLANS_DATA as fallback
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-16 lg:gap-8">
        {plans.map((plan) => (
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
