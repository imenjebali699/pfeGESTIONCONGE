import { Metadata } from "next";
import React from "react";
import Head from "next/head";
import Dashboard from "@/components/admin/dashboard"; // Adjust the path as needed
import RoleGuard from "@/components/RoleGuard"; // Adjust the path as needed
export const metadata: Metadata = {
 
  // other metadata
};
export default function page() {
  return (
    <>
    <Head>
    <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta httpEquiv="Pragma" content="no-cache" />
    <meta httpEquiv="Expires" content="0" />
  </Head>
    <RoleGuard rolesAllowed={['ADMIN']}>
      <div>
        <Dashboard />
      </div>
    </RoleGuard>
    </>
  );
}
