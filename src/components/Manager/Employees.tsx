"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, GroupIcon } from "@/icons";
import Link from "next/link";

export const EcommerceMetrics = () => {
  const [totalEmployes, setTotalEmployes] = useState(0);
  const [demandesEnAttente, setDemandesEnAttente] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8082/api/employes/count")
      .then((res) => setTotalEmployes(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:8082/api/employes/en-attente")
      .then((res) => setDemandesEnAttente(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Nombre total d'employés */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nombre total des employés
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalEmployes}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>

      {/* Demandes en attente */}
      <Link href="/basic-tables">
        <div>
          <div className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800" />
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Les demandes en attente
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {demandesEnAttente}
                </h4>
              </div>
              <Badge color="error">
                <ArrowDownIcon className="text-error-500" />
                9.05%
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
