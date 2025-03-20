import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Demandeconge from "@/components/form/form-elements/Demandeconge";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import FileInputExample from "@/components/form/form-elements/FileInputExample";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Demande conge" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Demandeconge />
        </div>
        <div className="space-y-6">
          <FileInputExample />
        </div>
      </div>
      {/* Centrer DropzoneComponent */}
      <div className="flex justify-center items-center mt-6">
        <DropzoneComponent />
      </div>
    </div>
  );
}