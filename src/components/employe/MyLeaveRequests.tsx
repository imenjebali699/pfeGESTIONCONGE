"use client";
import React from "react";

const leaveRequests = [
  { id: 1, date: "2024-03-01", status: "Approved" },
  { id: 2, date: "2024-03-05", status: "Pending" },
  { id: 3, date: "2024-03-10", status: "Rejected" },
];

export default function MyLeaveRequests() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">My Leave Requests</h2>
      <ul>
        {leaveRequests.map((req) => (
          <li key={req.id} className="border-b py-2">
            {req.date} - <span className="font-bold">{req.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
