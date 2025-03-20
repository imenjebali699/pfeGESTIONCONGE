"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { TimeIcon, ChevronDownIcon } from "../../../icons";
import TextArea from "../input/TextArea";
import Select from "../Select";

export default function InputGroup() {
  const types = [
    { value: "Congé Annuel", label: "Congé Annuel" },
    { value: "Congé Exceptionnel", label: "Congé Exceptionnel" },
    { value: "Congé Récupération", label: "Congé Récupération" },
    { value: "Congé Maladie", label: "Congé Maladie" },
  ];

  const motifs: { [key: string]: { value: string; label: string }[] } = {
    "Congé Annuel": [
      { value: "Vacances", label: "Vacances" },
      { value: "Repos", label: "Repos" },
    ],
    "Congé Exceptionnel": [
      { value: "Mariage", label: "Mariage" },
      { value: "Décès d'un proche", label: "Décès d'un proche" },
    ],
    "Congé Récupération": [
      { value: "Heures supplémentaires", label: "Heures supplémentaires" },
      { value: "Travail le week-end", label: "Travail le week-end" },
    ],
    "Congé Maladie": [
      { value: "Maladie courte", label: "Maladie courte" },
      { value: "Maladie longue", label: "Maladie longue" },
    ],
  };

  const [selectedType, setSelectedType] = useState<string | "">("");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");

  return (
    <ComponentCard title="Input Group">
      <div className="space-y-6">
        <div>
          <Label>Nombre de jours</Label>
          <Input type="number" placeholder="Nombre total" />
        </div>

        <div>
          <Label>Type de congé</Label>
          <div className="relative">
            <Select
              options={types}
              placeholder="Sélectionnez un type"
              onChange={(value) => setSelectedType(value)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {selectedType && motifs[selectedType] && (
          <div>
            <Label>Motif</Label>
            <div className="relative">
              <Select
                options={motifs[selectedType]}
                placeholder="Sélectionnez un motif"
                onChange={(value) => console.log(value)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
        )}

        <div>
          <Label>Description</Label>
          <TextArea value={message} onChange={(value) => setMessage(value)} rows={6} />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1">
            <Label>Date de début</Label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          <div className="flex-1">
            <Label>Heure de début</Label>
            <div className="relative">
              <input
                type="time"
                onChange={(e) => console.log(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1">
            <Label>Date de fin</Label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          <div className="flex-1">
            <Label>Heure de fin</Label>
            <div className="relative">
              <input
                type="time"
                onChange={(e) => console.log(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
