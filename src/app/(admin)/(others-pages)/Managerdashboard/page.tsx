"use client"; // Ensure it's a client component
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { EcommerceMetrics } from "@/components/Manager/Employees";
import MonthlyTarget from "@/components/Manager/Suivi desdemandesdecongés";
import MonthlySalesChart from "@/components/Manager/MonthlySalesChart";
import StatisticsChart from "@/components/Manager/StatisticsChart";
import RecentOrders from "@/components/Manager/RecentRequests";
import DemographicCard from "@/components/Manager/répartition descongésdesemployés";

export default function Ecommerce() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = Cookies.get("auth") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/signin"); // Redirect to login page if not authenticated
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) return <div>Loading...</div>; // Prevent rendering before redirect

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
        <StatisticsChart />
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

