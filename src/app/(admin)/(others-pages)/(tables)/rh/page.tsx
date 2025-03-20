import React from 'react'
import ComponentCard from "@/components/common/ComponentCard";
import RH from "@/components/tables/RH";

function RHtable() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="liste des employe en congés">
          <RH/>
        </ComponentCard>
      </div>
    </div>
  )
}

export default RHtable