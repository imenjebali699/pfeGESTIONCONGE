
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-6 bg-white dark:bg-gray-900 sm:p-0"
      style={{ backgroundImage: "url('/images/loginarabsoft.png')" }}
    >
          {children}
        </div>
       
    
  );
}
