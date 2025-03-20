"use client"; // Ensure it's a client component

import { EcommerceMetrics } from "@/components/Manager/Employees";
import MonthlyTarget from "@/components/Manager/Suivi desdemandesdecongés";
import MonthlySalesChart from "@/components/Manager/Demandesdecongésparmois";
import RecentOrders from "@/components/Manager/RecentRequests";
import DemographicCard from "@/components/Manager/répartition descongésdesemployés";

export default function Ecommerce() {
  // Prevent rendering before redirect

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>
      <div className="col-span-12">
      </div>
      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>
      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}