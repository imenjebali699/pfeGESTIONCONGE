"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RoleGuardProps {
  children: React.ReactNode;
  rolesAllowed: string[];
}

export default function RoleGuard({ children, rolesAllowed }: RoleGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      const normalizedRole = user.role.toUpperCase().replace(/^ROLE_/, "");
      if (!rolesAllowed.includes(normalizedRole)) {
        router.replace("/unauthorized");
      }
    }
  }, [user, rolesAllowed, router]);

  if (!user) return null;
  const normalizedRole = user.role.toUpperCase().replace(/^ROLE_/, "");
  if (!rolesAllowed.includes(normalizedRole)) return null;

  return <>{children}</>;
}
