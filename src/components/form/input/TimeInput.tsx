"use client"; // Ajoute cette ligne pour forcer le mode Client Component

import React from "react";

interface TimeInputProps {
  label: string;
  placeholder?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="time"
        className="mt-1 p-2 w-full border rounded"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TimeInput;
