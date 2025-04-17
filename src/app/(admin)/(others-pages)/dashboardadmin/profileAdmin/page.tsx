import UserInfoCard from "@/components/user-profile/UserInfoCard";
//import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";
import RoleGuard from "@/components/RoleGuard"
export const metadata: Metadata = {
  
};

export default function ProfileAdmin() {
  return (
    <RoleGuard rolesAllowed={['ADMIN']}>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          
          <div className="space-y-6">
          
            <UserInfoCard />
           
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
