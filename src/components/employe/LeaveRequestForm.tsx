"use client";
import { useState } from "react";

export default function LeaveRequestForm() {
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Leave request submitted: ${reason}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Request Leave</h2>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Enter reason..."
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Request
      </button>
    </form>
  );
}
