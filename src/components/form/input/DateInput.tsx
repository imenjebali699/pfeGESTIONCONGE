
"use client"; // Ajoute cette ligne pour forcer le mode Client Component
import React from "react";

interface DateInputProps {
  label: string;
  placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        className="mt-1 p-2 w-full border rounded"
        placeholder={placeholder}
      />
    </div>
  );
};

export default DateInput;
