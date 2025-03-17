"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// Importation dynamique de ReactApexChart pour éviter les problèmes SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LeaveRequestsOverview() {
  // Simuler des statistiques
  const totalRequests = 50;
  const approvedRequests = 30;
  const rejectedRequests = 10;
  const pendingRequests = totalRequests - (approvedRequests + rejectedRequests);
  const processedPercentage = ((approvedRequests + rejectedRequests) / totalRequests) * 100;

  // Configuration du graphique ApexCharts
  const series = [processedPercentage];
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: { background: "#E4E7EC", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val) => val.toFixed(2) + "%",
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#465FFF"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Suivi des demandes de congés
            </h3>
            <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
              Proportion des demandes traitées ce mois-ci
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem tag="a" onItemClick={closeDropdown} className="flex w-full text-left text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5">
                Voir détails
              </DropdownItem>
              <DropdownItem tag="a" onItemClick={closeDropdown} className="flex w-full text-left text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5">
                Exporter
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* Graphique ApexChart */}
        <div className="relative">
          <div className="max-h-[330px]">
            <ReactApexChart options={options} series={series} type="radialBar" height={330} />
          </div>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +{approvedRequests - rejectedRequests} validées
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          {processedPercentage.toFixed(2)}% des demandes ont été traitées ce mois-ci.
        </p>
      </div>

      {/* Statistiques des congés */}
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-sm dark:text-gray-400">Total</p>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {totalRequests}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-sm dark:text-gray-400">Acceptées</p>
          <p className="text-base font-semibold text-green-600 dark:text-green-400 sm:text-lg">
            {approvedRequests}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-sm dark:text-gray-400">Refusées</p>
          <p className="text-base font-semibold text-red-600 dark:text-red-400 sm:text-lg">
            {rejectedRequests}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-sm dark:text-gray-400">En attente</p>
          <p className="text-base font-semibold text-yellow-600 dark:text-yellow-400 sm:text-lg">
            {pendingRequests}
          </p>
        </div>
      </div>
    </div>
  );
}
