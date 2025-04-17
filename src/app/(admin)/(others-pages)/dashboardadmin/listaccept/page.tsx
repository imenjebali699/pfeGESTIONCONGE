import EmployesAcceptes from "@/components/admin/listeaccepte";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import RoleGuard from "@/components/RoleGuard"
export const metadata: Metadata = {
 
  // other metadata
};
export default function page() {
  return (  
 <RoleGuard rolesAllowed={['ADMIN']}>
    <div>
      <PageBreadcrumb pageTitle="" />
      <EmployesAcceptes />
    </div>
 </RoleGuard>
          
       
  );
}
