import React from 'react'
import ComponentCard from "@/components/common/ComponentCard";
import Informatique from "@/components/tables/informatique";

function informatiquetable() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="liste des employe en congés">
          <Informatique />
        </ComponentCard>
      </div>
    </div>
  )
}

export default informatiquetable