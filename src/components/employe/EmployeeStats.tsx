"use client";
import { useState } from "react";

export default function SoldeConges() {
  const [joursRestants, setJoursRestants] = useState(12);

  return (
    <div className="rounded-2xl border p-5 bg-white shadow-md dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Solde des congés
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Jours de congé restants :{" "}
        <span className="font-semibold text-blue-600">{joursRestants}</span>
      </p>
    </div>
  );
}
