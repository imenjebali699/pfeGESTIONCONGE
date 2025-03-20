"use client"; // Ajoute cette ligne pour forcer le mode Client Component

import React from "react";

interface SelectInputProps {
  label: string;
  options: string[];
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select className="mt-1 p-2 w-full border rounded">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
