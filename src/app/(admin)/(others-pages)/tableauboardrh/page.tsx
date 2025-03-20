import type { Metadata } from "next";
import  { NombrEmploye } from "@/components/ecommerce/Lesnombreemployees";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StaticChart from "@/components/ecommerce/static";
import SuiviConges from "@/components/ecommerce/suiviconge";

export const metadata: Metadata = {
  title:
    "Next.js ",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <NombrEmploye />
        <StaticChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
       <SuiviConges />
      </div>

     

      
    </div>
  );
}