"use client";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function RepartitionConges() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const departements = [
    { nom: "Ressources Humaines", conges: 15, total: 50 },
    { nom: "Informatique", conges: 8, total: 40 },
    { nom: "Marketing", conges: 5, total: 30 },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Répartition des congés
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Nombre de congés pris par département
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown} className="hover:bg-gray-100 dark:hover:bg-white/5">
              Voir plus
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="hover:bg-gray-100 dark:hover:bg-white/5">
              Supprimer
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="space-y-5 mt-6">
        {departements.map((dep, index) => {
          const pourcentage = Math.round((dep.conges / dep.total) * 100);
          return (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {dep.nom}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {dep.conges} congés pris
                </span>
              </div>

              <div className="flex w-full max-w-[140px] items-center gap-3">
                <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                  <div
                    className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                    style={{ width: `${pourcentage}%` }}
                  ></div>
                </div>
                <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {pourcentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
