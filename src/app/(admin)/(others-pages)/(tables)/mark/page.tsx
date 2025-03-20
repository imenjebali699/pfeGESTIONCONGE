import React from 'react'
import ComponentCard from "@/components/common/ComponentCard";
import MarkComponent from "@/components/tables/mark";

function marktable() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="liste des employe en congés">
          <MarkComponent/>
        </ComponentCard>
      </div>
    </div>
  )
}

export default marktable